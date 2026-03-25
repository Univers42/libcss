/**
 * @file WindowPanel Types
 * @description Notion-like floating window container that hosts any canvas.
 * Supports tabbed views, resizing, and drag positioning.
 */

import type { ReactNode } from 'react';

export interface WindowTab {
  /** Unique tab id. */
  readonly id: string;
  /** Tab label displayed in the header. */
  readonly label: string;
  /** Optional icon (emoji or component). */
  readonly icon?: ReactNode;
  /** Content rendered when this tab is active. */
  readonly content: ReactNode;
}

export interface WindowPanelProps {
  /** Window title shown in the header bar. */
  title?: string;
  /** Optional icon for the window title. */
  icon?: ReactNode;
  /** Tabs for multi-view mode. If provided, body children are ignored. */
  tabs?: readonly WindowTab[];
  /** Active tab id (controlled). */
  activeTab?: string;
  /** Called when user switches tabs. */
  onTabChange?: (tabId: string) => void;
  /** Single-view body (used when no tabs). */
  children?: ReactNode;
  /** Width of the window. */
  width?: number | string;
  /** Height of the window. */
  height?: number | string;
  /** Additional CSS class. */
  className?: string;
  /** Show close button. */
  closable?: boolean;
  /** Close callback. */
  onClose?: () => void;
  /** Compact mode — smaller header, tighter padding. */
  compact?: boolean;
  /** Footer content. */
  footer?: ReactNode;
  /** Status bar content (shown below footer). */
  statusBar?: ReactNode;
}
