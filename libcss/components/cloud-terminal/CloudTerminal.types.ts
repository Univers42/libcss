import type { ReactNode } from 'react';
import type { AnimationPreset } from './animations';

/* ── xterm.js theme ─────────────────────────────── */
export interface TerminalThemeColors {
  readonly background: string;
  readonly foreground: string;
  readonly cursor: string;
  readonly cursorAccent: string;
  readonly selectionBackground: string;
  readonly black: string;
  readonly red: string;
  readonly green: string;
  readonly yellow: string;
  readonly blue: string;
  readonly magenta: string;
  readonly cyan: string;
  readonly white: string;
  readonly brightBlack: string;
  readonly brightRed: string;
  readonly brightGreen: string;
  readonly brightYellow: string;
  readonly brightBlue: string;
  readonly brightMagenta: string;
  readonly brightCyan: string;
  readonly brightWhite: string;
}

/* ── Terminal configuration ─────────────────────── */
export type TerminalColorScheme = 'dark' | 'light';

export interface CloudTerminalConfig {
  /** Socket.io server URL — defaults to current origin */
  readonly socketUrl?: string;
  /** xterm.js font size */
  readonly fontSize?: number;
  /** xterm.js font family */
  readonly fontFamily?: string;
  /** xterm.js color theme override (overridden by themeId if set) */
  readonly theme?: Partial<TerminalThemeColors>;
  /** Allow transparent xterm background */
  readonly allowTransparency?: boolean;
  /** Show cursor blink */
  readonly cursorBlink?: boolean;

  /* ── Layout ───────────────────────────────────── */
  /** Show the left navigation rail */
  readonly showNavRail?: boolean;
  /** Allow collapsing the nav rail (adds toggle button) */
  readonly sidebarCollapsible?: boolean;
  /** Start with sidebar collapsed */
  readonly sidebarCollapsed?: boolean;
  /** Show the header bar */
  readonly showHeader?: boolean;
  /** Show the bottom status bar */
  readonly showStatusBar?: boolean;
  /** Show atmospheric FX (gradients, scanlines) */
  readonly showEffects?: boolean;
  /** Show the file editor overlay */
  readonly enableEditor?: boolean;
  /** Show the docs viewer */
  readonly enableDocs?: boolean;

  /* ── Themes ───────────────────────────────────── */
  /** Color scheme */
  readonly colorScheme?: TerminalColorScheme;
  /** Theme ID from the theme registry (overrides colorScheme) */
  readonly themeId?: string;
  /** Show the theme switcher in header */
  readonly showThemeSwitcher?: boolean;

  /* ── Split terminals ──────────────────────────── */
  /** Enable terminal splitting */
  readonly enableSplit?: boolean;
  /** Enable drag-and-drop for terminal tabs */
  readonly enableTabDragDrop?: boolean;
  /** Show terminal tabs */
  readonly showTabs?: boolean;

  /* ── Animations ───────────────────────────────── */
  /** Animation preset (from libcss animation library) */
  readonly animationPreset?: AnimationPreset;

  /* ── Branding ─────────────────────────────────── */
  /** Custom brand node for the nav rail */
  readonly brand?: ReactNode;
  /** Custom title */
  readonly title?: string;

  /* ── Misc ──────────────────────────────────────── */
  /** Extra CSS class */
  readonly className?: string;
  /** Inline style */
  readonly style?: React.CSSProperties;
  /** Markdown content for the docs viewer */
  readonly docsContent?: string;
}

/* ── Editor file state ──────────────────────────── */
export interface EditorFile {
  filename: string;
  content: string;
}

/* ── Nav item ───────────────────────────────────── */
export interface NavItem {
  readonly id: string;
  readonly icon: ReactNode;
  readonly label: string;
  readonly active?: boolean;
  readonly onClick?: () => void;
}

/* ── Connection state ───────────────────────────── */
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';
