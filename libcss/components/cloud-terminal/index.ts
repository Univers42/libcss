/**
 * Cloud Terminal — Public exports
 *
 * Simple mode (HTTP API):
 *   Shell, ShellModal, ShellFab
 *
 * Full PTY mode (xterm.js + socket.io):
 *   CloudTerminal and all sub-components
 */

// ── Simple shell (HTTP API) ──────────────────────
export { Shell } from './Shell';
export { ShellModal } from './ShellModal';
export { ShellFab } from './ShellFab';
export type { CommandResult, HistoryEntry } from './types';

// ── Full PTY terminal (xterm.js + socket.io) ─────
export { CloudTerminal } from './CloudTerminal';
export { TerminalHeader } from './TerminalHeader';
export { TerminalChrome } from './TerminalChrome';
export { TerminalViewport } from './TerminalViewport';
export { TerminalStatusBar } from './TerminalStatusBar';
export { TerminalNavRail } from './TerminalNavRail';
export { TerminalEditor } from './TerminalEditor';
export { TerminalDocs } from './TerminalDocs';
export { TerminalBackground } from './TerminalBackground';
export { TerminalThemeSwitcher } from './TerminalThemeSwitcher';
export { SplitContainer } from './SplitContainer';
export { SplitHandle } from './SplitHandle';
export { TerminalPane } from './TerminalPane';
export { TerminalTabs } from './TerminalTabs';
export { useXterm } from './useXterm';
export { useSplitPane } from './useSplitPane';

// ── Themes & Animations ──────────────────────────
export {
  TERMINAL_THEMES,
  THEME_MAP,
  getTheme,
  applyThemeTokens,
} from './themes';
export type { TerminalThemeDef } from './themes';

export {
  ANIM_PRESET_NONE,
  ANIM_PRESET_SMOOTH,
  ANIM_PRESET_BOUNCY,
  ANIM_PRESET_CYBER,
  ANIM_PRESET_ELEGANT,
  animClasses,
} from './animations';
export type { AnimationPreset, ElementAnimation, AnimClassName } from './animations';

export type {
  CloudTerminalConfig,
  TerminalThemeColors,
  TerminalColorScheme,
  EditorFile,
  NavItem,
  ConnectionStatus,
} from './CloudTerminal.types';

export {
  TERMINAL_THEME_DARK,
  TERMINAL_THEME_LIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_TITLE,
} from './CloudTerminal.constants';

export type { NavRailItem } from './TerminalNavRail';
export type { TerminalHeaderProps } from './TerminalHeader';
export type { TerminalChromeProps } from './TerminalChrome';
export type { TerminalEditorProps } from './TerminalEditor';
export type { TerminalDocsProps } from './TerminalDocs';
export type { UseXtermReturn, UseXtermOptions } from './useXterm';
