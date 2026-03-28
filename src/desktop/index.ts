/**
 * libcss/desktop — Generic Electron Desktop Application Scaffold
 *
 * Provides a fully configurable Electron shell that can wrap any
 * web application into a native Linux/macOS/Windows desktop app.
 *
 * Usage:
 *   1. Define a DesktopAppConfig (see types.ts)
 *   2. Call createMainProcess() from your electron/main.cjs
 *   3. Run `npx electron .`
 *
 * The scaffold handles:
 *   - Auto-killing stale processes on the target port
 *   - Spawning your backend server (any command)
 *   - Creating a frameless or framed BrowserWindow
 *   - Keyboard shortcuts (F11 fullscreen, Ctrl+Shift+I devtools)
 *   - Graceful cleanup on exit
 *
 * @module libcss/desktop
 */
export { createMainProcess } from './createMainProcess';
export { generateDesktopEntry } from './generateDesktopEntry';
export type { DesktopAppConfig, WindowConfig, ServerConfig } from './types';
