# libcss/desktop — Desktop Application Scaffold

Generic, reusable Electron shell for wrapping any web app into a native desktop application on Linux, macOS, or Windows.

## Quick Start

```js
// electron/main.cjs
const { createMainProcess } = require('../src/lib/libcss/desktop/createMainProcess.cjs');

createMainProcess({
  name: 'My App',
  appId: 'com.example.myapp',
  server: {
    port: 3000,
    args: ['server.ts'],       // your backend entrypoint
    readySignal: 'Server running',
  },
  window: {
    width: 1280,
    height: 900,
    frame: false,              // frameless for custom chrome
    backgroundColor: '#000',
  },
});
```

```js
// electron/preload.cjs
const { createPreload } = require('../src/lib/libcss/desktop/createPreload.cjs');
createPreload({ name: 'My App', version: '1.0.0' });
```

## Features

- **Port conflict auto-resolution** — kills stale processes before starting
- **Any backend** — works with tsx, node, python, or any spawnable command
- **Frameless or framed** — your choice via `window.frame`
- **Keyboard shortcuts** — F11 fullscreen, Ctrl+Shift+I devtools (configurable)
- **Graceful shutdown** — SIGTERM with SIGKILL fallback
- **Linux .desktop installer** — `generateDesktopEntry()` for Ubuntu/Gnome/KDE

## Config Reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `name` | string | `'Desktop App'` | App display name |
| `appId` | string | `'com.libcss.desktop'` | Unique app identifier |
| `server.port` | number | `3000` | Port the backend listens on |
| `server.command` | string | auto-detected `tsx` | Server startup command |
| `server.args` | string[] | `['server.ts']` | Arguments for the command |
| `server.readySignal` | string | `'Server running'` | Stdout string = ready |
| `server.killStalePort` | boolean | `true` | Pre-kill port occupants |
| `server.startupTimeout` | number | `15000` | Max ms to wait |
| `window.width` | number | `1200` | Initial width |
| `window.height` | number | `800` | Initial height |
| `window.frame` | boolean | `false` | OS window frame |
| `window.backgroundColor` | string | `'#050505'` | BG before content loads |
| `devtools` | boolean | `true` | Ctrl+Shift+I toggle |
| `fullscreenShortcut` | boolean | `true` | F11 toggle |
