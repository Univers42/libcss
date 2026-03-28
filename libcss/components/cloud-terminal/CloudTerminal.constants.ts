import type { TerminalThemeColors } from './CloudTerminal.types';

/* ── Default xterm theme — Solaris Noir ─────────── */
export const TERMINAL_THEME_DARK: TerminalThemeColors = {
  background:          'transparent',
  foreground:          '#d6d3d1',   // stone-300
  cursor:              '#f59e0b',   // amber-500
  cursorAccent:        '#0a0a0a',
  selectionBackground: 'rgba(245, 158, 11, 0.25)',
  black:               '#1c1917',   // stone-900
  red:                 '#ef4444',   // red-500
  green:               '#22c55e',   // green-500
  yellow:              '#fbbf24',   // amber-400
  blue:                '#60a5fa',   // blue-400
  magenta:             '#c084fc',   // purple-400
  cyan:                '#2dd4bf',   // teal-400
  white:               '#fafaf9',   // stone-50
  brightBlack:         '#78716c',   // stone-500
  brightRed:           '#f87171',   // red-400
  brightGreen:         '#4ade80',   // green-400
  brightYellow:        '#fde68a',   // amber-200
  brightBlue:          '#93c5fd',   // blue-300
  brightMagenta:       '#d8b4fe',   // purple-300
  brightCyan:          '#5eead4',   // teal-300
  brightWhite:         '#ffffff',
};

export const TERMINAL_THEME_LIGHT: TerminalThemeColors = {
  background:          'transparent',
  foreground:          '#1e293b',
  cursor:              '#0284c7',
  cursorAccent:        '#f8fafc',
  selectionBackground: 'rgba(59, 130, 246, 0.2)',
  black:               '#f8fafc',
  red:                 '#dc2626',
  green:               '#059669',
  yellow:              '#d97706',
  blue:                '#2563eb',
  magenta:             '#7c3aed',
  cyan:                '#0891b2',
  white:               '#0f172a',
  brightBlack:         '#94a3b8',
  brightRed:           '#f87171',
  brightGreen:         '#34d399',
  brightYellow:        '#fbbf24',
  brightBlue:          '#60a5fa',
  brightMagenta:       '#a78bfa',
  brightCyan:          '#22d3ee',
  brightWhite:         '#020617',
};

/* ── Defaults ───────────────────────────────────── */
export const DEFAULT_FONT_SIZE   = 13;
export const DEFAULT_FONT_FAMILY = '"JetBrains Mono", "Fira Code", "Consolas", monospace';
export const DEFAULT_TITLE       = 'INFERNO';
export const DEFAULT_RESIZE_DEBOUNCE = 60;
