/**
 * libcss/desktop — Configuration types for desktop app scaffold.
 *
 * All fields have sensible defaults so you only need to specify
 * what's unique to your application.
 */

export interface WindowConfig {
  /** Initial window width in pixels (default: 1200) */
  readonly width?: number;
  /** Initial window height in pixels (default: 800) */
  readonly height?: number;
  /** Minimum window width (default: 600) */
  readonly minWidth?: number;
  /** Minimum window height (default: 400) */
  readonly minHeight?: number;
  /** Show native OS window frame (default: false = frameless) */
  readonly frame?: boolean;
  /** Background color shown before content loads (default: '#050505') */
  readonly backgroundColor?: string;
  /** Absolute path to an icon file (.png or .svg) */
  readonly icon?: string;
  /** Start maximized (default: false) */
  readonly startMaximized?: boolean;
  /** Start in fullscreen (default: false) */
  readonly startFullscreen?: boolean;
}

export interface ServerConfig {
  /** Command to start the server (default: 'tsx') */
  readonly command?: string;
  /** Arguments for the server command (default: ['server.ts']) */
  readonly args?: readonly string[];
  /** Working directory for the server (default: project root) */
  readonly cwd?: string;
  /** Port the server listens on (default: 3000) */
  readonly port?: number;
  /** String in stdout that signals the server is ready (default: 'Server running') */
  readonly readySignal?: string;
  /** Extra environment variables to pass to the server */
  readonly env?: Readonly<Record<string, string>>;
  /** Max time (ms) to wait for server ready signal (default: 15000) */
  readonly startupTimeout?: number;
  /** Kill stale processes on port before starting (default: true) */
  readonly killStalePort?: boolean;
}

export interface DesktopAppConfig {
  /** Application name shown in title bar / task manager */
  readonly name: string;
  /** Unique application ID (e.g. 'com.mycompany.myapp') */
  readonly appId?: string;
  /** Window configuration */
  readonly window?: WindowConfig;
  /** Backend server configuration */
  readonly server?: ServerConfig;
  /** Absolute path to a custom preload script (.cjs) */
  readonly preload?: string;
  /** Allow Ctrl+Shift+I to open devtools (default: true) */
  readonly devtools?: boolean;
  /** Allow F11 to toggle fullscreen (default: true) */
  readonly fullscreenShortcut?: boolean;
}

/** Resolved config with all defaults filled in */
export interface ResolvedDesktopAppConfig {
  readonly name: string;
  readonly appId: string;
  readonly window: Required<WindowConfig>;
  readonly server: Required<Omit<ServerConfig, 'env' | 'killStalePort'>> & {
    readonly env: Readonly<Record<string, string>>;
    readonly killStalePort: boolean;
  };
  readonly preload: string | null;
  readonly devtools: boolean;
  readonly fullscreenShortcut: boolean;
}
