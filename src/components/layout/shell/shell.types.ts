/**
 * @file Shell Layout Types
 * @description Shared type definitions for all shell layout variants.
 */

import type { ReactNode } from 'react';

/** Common slot-based layout API shared by all shell variants. */
export interface ShellSlots {
  /** Primary navigation (sidebar or top bar). */
  nav?: ReactNode;
  /** Header area (breadcrumbs, search, user menu). */
  header?: ReactNode;
  /** Main content area. */
  children: ReactNode;
  /** Secondary panel (inspector, details, chat). */
  aside?: ReactNode;
  /** Footer area. */
  footer?: ReactNode;
}

/** Color scheme applied to the shell. */
export type ShellColorScheme = 'light' | 'dark' | 'auto';

/** Common shell configuration. */
export interface ShellConfig {
  /** Color scheme. Default: 'dark'. */
  colorScheme?: ShellColorScheme;
  /** Custom CSS class appended to the root element. */
  className?: string;
  /** Whether the sidebar/nav starts collapsed on mobile. Default: true. */
  collapsedOnMobile?: boolean;
}

/** Dashboard shell — sidebar + header + main. */
export interface DashboardShellProps extends ShellSlots, ShellConfig {
  /** Sidebar width (CSS value). Default: '260px'. */
  sidebarWidth?: string;
  /** Brand element rendered at the top of the sidebar. */
  brand?: ReactNode;
  /** Show a mobile toggle button for the sidebar. Default: true. */
  sidebarToggle?: boolean;
}

/** Stacked shell — top nav + main + footer. */
export interface StackedShellProps extends ShellSlots, ShellConfig {
  /** Make the header sticky. Default: true. */
  stickyHeader?: boolean;
  /** Constrain content to a max-width container. Default: true. */
  contained?: boolean;
  /** Max-width of the container. Default: '1280px'. */
  maxWidth?: string;
}

/** Centered shell — centered content card (auth, landing, onboarding). */
export interface CenteredShellProps extends ShellConfig {
  /** Content to render inside the card. */
  children: ReactNode;
  /** Width of the centered card. Default: '480px'. */
  cardWidth?: string;
  /** Brand/logo element shown above the card. */
  brand?: ReactNode;
  /** Footer content below the card. */
  footer?: ReactNode;
  /** Decorative background variant. */
  bgVariant?: 'plain' | 'gradient' | 'mesh' | 'dots';
}

/** Panel shell — 3-column IDE-style layout. */
export interface PanelShellProps extends ShellSlots, ShellConfig {
  /** Left panel width. Default: '260px'. */
  leftWidth?: string;
  /** Right panel width. Default: '320px'. */
  rightWidth?: string;
  /** Brand element in the header. */
  brand?: ReactNode;
  /** Toolbar rendered in the header. */
  toolbar?: ReactNode;
  /** Left panel content (tree, explorer). */
  leftPanel?: ReactNode;
  /** Right panel content (inspector, properties). */
  rightPanel?: ReactNode;
  /** Bottom panel (terminal, output). */
  bottomPanel?: ReactNode;
  /** Whether the bottom panel is visible. Default: false. */
  showBottom?: boolean;
}
