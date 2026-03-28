/**
 * libcss/desktop — Preload script factory
 *
 * Generic preload that exposes window controls, zoom controls,
 * and app metadata to the renderer process via contextBridge.
 *
 * Works in CommonJS context (Electron preload).
 */
const { contextBridge, ipcRenderer } = require('electron');

/**
 * Call from your preload.cjs to expose a standardized API.
 * @param {object} appMeta — Extra metadata to expose (e.g. { name, version })
 */
function createPreload(appMeta = {}) {
  contextBridge.exposeInMainWorld('desktopApp', {
    /* ── App metadata ──────────────────────────────── */
    platform: process.platform,
    isElectron: true,
    arch: process.arch,
    nodeVersion: process.version,
    ...appMeta,

    /* ── Window controls ──────────────────────────── */
    minimize:    () => ipcRenderer.invoke('window:minimize'),
    maximize:    () => ipcRenderer.invoke('window:maximize'),
    close:       () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

    /* ── Zoom controls ────────────────────────────── */
    zoomIn:    () => ipcRenderer.invoke('window:zoomIn'),
    zoomOut:   () => ipcRenderer.invoke('window:zoomOut'),
    zoomReset: () => ipcRenderer.invoke('window:zoomReset'),
    getZoom:   () => ipcRenderer.invoke('window:getZoom'),

    /* ── Event listeners ──────────────────────────── */
    onMaximizedChange: (callback) => {
      const handler = (_event, isMaximized) => callback(isMaximized);
      ipcRenderer.on('window:maximized-change', handler);
      return () => ipcRenderer.removeListener('window:maximized-change', handler);
    },
  });
}

module.exports = { createPreload };
