// Layout — public API barrel
export * from './view/chart';

// Studio layout (component explorer shell)
export { StudioLayout } from './StudioLayout';

// Shell layouts
export { DashboardShell, StackedShell, CenteredShell, PanelShell, StreamingShell } from './shell';
export type {
  ShellSlots,
  ShellColorScheme,
  ShellConfig,
  DashboardShellProps,
  StackedShellProps,
  CenteredShellProps,
  PanelShellProps,
  StreamingShellProps,
} from './shell';
