/**
 * libcss/desktop — createMainProcess
 *
 * Generic Electron main process factory.
 * Call this from your electron/main.cjs with a config object
 * and it handles everything: port cleanup, server spawn,
 * window creation, shortcuts, graceful shutdown.
 *
 * Works in CommonJS context (Electron main process).
 *
 * @example
 *   // electron/main.cjs
 *   const { createMainProcess } = require('../src/lib/libcss/desktop/createMainProcess.cjs');
 *   createMainProcess({
 *     name: 'My App',
 *     server: { port: 3000 },
 *     window: { backgroundColor: '#000' },
 *   });
 */

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { spawn, execSync } = require('child_process');
const net = require('net');

/* ── Linux sandbox fix ────────────────────────────── */
// On some Linux DEs (KDE Plasma, etc.), the Chromium sandbox can
// prevent the app from starting. Respect env or disable explicitly.
if (process.platform === 'linux' && process.env.ELECTRON_DISABLE_SANDBOX === '1') {
  app.commandLine.appendSwitch('no-sandbox');
}

/* ── Default values ───────────────────────────────── */
const DEFAULTS = {
  name: 'Desktop App',
  appId: 'com.libcss.desktop',
  window: {
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 400,
    frame: false,
    backgroundColor: '#050505',
    icon: null,
    startMaximized: false,
    startFullscreen: false,
  },
  server: {
    command: null,        // resolved at runtime
    args: ['server.ts'],
    cwd: null,            // resolved at runtime
    port: 3000,
    readySignal: 'Server running',
    env: {},
    startupTimeout: 15000,
    killStalePort: true,
  },
  devtools: true,
  fullscreenShortcut: true,
};

/* ── Utility: kill process on a port ──────────────── */
function killPort(port) {
  try {
    if (process.platform === 'linux') {
      // Try multiple methods — fuser may not have permission
      try { execSync(`fuser -k ${port}/tcp 2>/dev/null`, { stdio: 'ignore' }); } catch {}
      try { execSync(`lsof -ti:${port} | xargs -r kill -9 2>/dev/null`, { stdio: 'ignore' }); } catch {}
    } else if (process.platform === 'darwin') {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, { stdio: 'ignore' });
    } else {
      // Windows
      execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { stdio: 'ignore' });
    }
  } catch { /* port was free */ }
}

/* ── Utility: wait for port to be available ───────── */
function waitForPort(port, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const sock = new net.Socket();
      sock.setTimeout(500);
      sock.once('connect', () => {
        sock.destroy();
        resolve();
      });
      sock.once('timeout', () => {
        sock.destroy();
        retry();
      });
      sock.once('error', () => {
        sock.destroy();
        retry();
      });
      sock.connect(port, '127.0.0.1');
    };
    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error(`Timed out waiting for port ${port}`));
      } else {
        setTimeout(check, 300);
      }
    };
    check();
  });
}

/* ── Main factory ─────────────────────────────────── */
function createMainProcess(config = {}) {
  /* ── Single-instance lock ───────────────────────── */
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    console.log('[libcss/desktop] Another instance is already running. Focusing it.');
    app.quit();
    return;
  }

  const cfg = {
    name: config.name || DEFAULTS.name,
    appId: config.appId || DEFAULTS.appId,
    devtools: config.devtools !== undefined ? config.devtools : DEFAULTS.devtools,
    fullscreenShortcut: config.fullscreenShortcut !== undefined ? config.fullscreenShortcut : DEFAULTS.fullscreenShortcut,
    preload: config.preload || null,
    window: { ...DEFAULTS.window, ...(config.window || {}) },
    server: { ...DEFAULTS.server, ...(config.server || {}) },
  };

  // Resolve paths based on caller's __dirname (electron/ folder)
  const callerDir = config._callerDir || path.join(__dirname, '..');
  const projectRoot = config._projectRoot || path.resolve(callerDir, '..');

  if (!cfg.server.command) {
    cfg.server.command = path.join(projectRoot, 'node_modules', '.bin', 'tsx');
  }
  if (!cfg.server.cwd) {
    cfg.server.cwd = projectRoot;
  }

  const SERVER_URL = `http://localhost:${cfg.server.port}`;

  let mainWindow = null;
  let serverProcess = null;

  /* ── Start backend ──────────────────────────────── */
  async function startServer() {
    // Kill stale processes on port
    if (cfg.server.killStalePort) {
      killPort(cfg.server.port);
      // Also kill Vite HMR port if it's the default
      killPort(cfg.server.port + 21678);
      // Brief pause for OS to release
      await new Promise(r => setTimeout(r, 500));
    }

    return new Promise((resolve, reject) => {
      serverProcess = spawn(cfg.server.command, [...cfg.server.args], {
        cwd: cfg.server.cwd,
        detached: true, // Own process group so we can kill the whole tree
        env: {
          ...process.env,
          NODE_ENV: 'development',
          ELECTRON: '1',
          ...cfg.server.env,
        },
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let resolved = false;

      serverProcess.stdout.on('data', (data) => {
        const msg = data.toString();
        process.stdout.write(`[${cfg.name}] ${msg}`);
        if (!resolved && msg.includes(cfg.server.readySignal)) {
          resolved = true;
          resolve();
        }
      });

      serverProcess.stderr.on('data', (data) => {
        process.stderr.write(`[${cfg.name}:err] ${data.toString()}`);
      });

      serverProcess.on('error', (err) => {
        if (!resolved) reject(err);
      });

      serverProcess.on('exit', (code) => {
        if (code !== 0 && code !== null && !resolved) {
          reject(new Error(`Server exited with code ${code}`));
        }
      });

      // Fallback: if readySignal never fires, wait for port
      setTimeout(() => {
        if (!resolved) {
          waitForPort(cfg.server.port, 5000)
            .then(() => { resolved = true; resolve(); })
            .catch(() => { resolved = true; resolve(); }); // resolve anyway, let user see error
        }
      }, cfg.server.startupTimeout);
    });
  }

  /* ── Create window ──────────────────────────────── */
  function createWindow() {
    const winOpts = {
      width: cfg.window.width,
      height: cfg.window.height,
      minWidth: cfg.window.minWidth,
      minHeight: cfg.window.minHeight,
      frame: cfg.window.frame,
      titleBarStyle: cfg.window.frame ? 'default' : 'hidden',
      backgroundColor: cfg.window.backgroundColor,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    };

    if (cfg.window.icon) winOpts.icon = cfg.window.icon;
    if (cfg.preload) winOpts.webPreferences.preload = cfg.preload;

    // Show the window immediately — using show:false + ready-to-show
    // is unreliable with frame:false on KDE Plasma / X11.
    // The backgroundColor prevents a flash-of-white.
    winOpts.show = true;

    mainWindow = new BrowserWindow(winOpts);
    Menu.setApplicationMenu(null);

    if (cfg.window.startMaximized) mainWindow.maximize();
    if (cfg.window.startFullscreen) mainWindow.setFullScreen(true);

    // Handle load failures — retry a few times
    let retries = 0;
    const maxRetries = 5;
    const loadPage = () => {
      mainWindow.loadURL(SERVER_URL).catch((err) => {
        retries++;
        console.log(`[${cfg.name}] loadURL failed (attempt ${retries}/${maxRetries}): ${err.message}`);
        if (retries < maxRetries && mainWindow && !mainWindow.isDestroyed()) {
          setTimeout(loadPage, 1500);
        } else {
          // Show the window anyway so the user sees something
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.show();
            mainWindow.webContents.loadURL(`data:text/html,<html><body style="background:#050505;color:#f55;font-family:monospace;padding:40px;"><h2>Failed to connect to server</h2><p>Could not reach ${SERVER_URL} after ${maxRetries} attempts.</p><p>${err.message}</p><p>Make sure port ${cfg.server.port} is available.</p></body></html>`);
          }
        }
      });
    };
    loadPage();

    // Window is already visible (show: true). No force-show needed.

    /* ── IPC: Window controls ─────────────────────── */
    ipcMain.handle('window:minimize', () => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
    });
    ipcMain.handle('window:maximize', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      if (mainWindow.isMaximized()) mainWindow.unmaximize();
      else mainWindow.maximize();
    });
    ipcMain.handle('window:close', () => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
    });
    ipcMain.handle('window:isMaximized', () => {
      return mainWindow && !mainWindow.isDestroyed() ? mainWindow.isMaximized() : false;
    });

    /* ── IPC: Zoom controls ───────────────────────── */
    ipcMain.handle('window:zoomIn', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      const wc = mainWindow.webContents;
      wc.setZoomLevel(Math.min(wc.getZoomLevel() + 0.5, 5));
    });
    ipcMain.handle('window:zoomOut', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      const wc = mainWindow.webContents;
      wc.setZoomLevel(Math.max(wc.getZoomLevel() - 0.5, -3));
    });
    ipcMain.handle('window:zoomReset', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      mainWindow.webContents.setZoomLevel(0);
    });
    ipcMain.handle('window:getZoom', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return 0;
      return mainWindow.webContents.getZoomLevel();
    });

    /* ── Keyboard shortcuts ───────────────────────── */
    mainWindow.webContents.on('before-input-event', (_event, input) => {
      if (cfg.devtools && input.control && input.shift && input.key === 'I') {
        mainWindow.webContents.toggleDevTools();
      }
      if (cfg.fullscreenShortcut && input.key === 'F11') {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
      // Zoom: Ctrl+= / Ctrl+- / Ctrl+0
      if (input.control && !input.shift && !input.alt) {
        if (input.key === '=' || input.key === '+') {
          const wc = mainWindow.webContents;
          wc.setZoomLevel(Math.min(wc.getZoomLevel() + 0.5, 5));
        } else if (input.key === '-') {
          const wc = mainWindow.webContents;
          wc.setZoomLevel(Math.max(wc.getZoomLevel() - 0.5, -3));
        } else if (input.key === '0') {
          mainWindow.webContents.setZoomLevel(0);
        }
      }
    });

    /* ── Notify renderer of maximize state changes ── */
    mainWindow.on('maximize', () => {
      mainWindow.webContents.send('window:maximized-change', true);
    });
    mainWindow.on('unmaximize', () => {
      mainWindow.webContents.send('window:maximized-change', false);
    });

    mainWindow.on('closed', () => { mainWindow = null; });
  }

  /* ── Cleanup ────────────────────────────────────── */
  function cleanup() {
    if (serverProcess) {
      const proc = serverProcess;
      serverProcess = null;

      // Kill the entire process tree (tsx spawns node children)
      const pid = proc.pid;
      if (pid) {
        try {
          // Kill process group — negative PID kills the group
          process.kill(-pid, 'SIGTERM');
        } catch {
          try { proc.kill('SIGTERM'); } catch {}
        }
        // Force-kill after 2 seconds if still alive
        setTimeout(() => {
          try { process.kill(-pid, 'SIGKILL'); } catch {}
          try { proc.kill('SIGKILL'); } catch {}
        }, 2000);
      } else {
        try { proc.kill('SIGTERM'); } catch {}
      }

      // Also kill by port as a safety net
      killPort(cfg.server.port);
    }
  }

  /* ── Wire Electron lifecycle ────────────────────── */
  app.whenReady().then(async () => {
    try {
      await startServer();
    } catch (err) {
      console.error(`[${cfg.name}] Failed to start server:`, err.message);
    }
    createWindow();
  });

  app.on('window-all-closed', () => {
    cleanup();
    app.quit();
  });

  // When a second instance launches, focus the existing window
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });

  app.on('before-quit', cleanup);
}

module.exports = { createMainProcess };
