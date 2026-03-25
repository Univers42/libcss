// Layout — public API barrel
export * from './view/chart';

// Studio layout (component explorer shell)
export { StudioLayout } from './StudioLayout';

// Shell layouts
export { DashboardShell, StackedShell, CenteredShell, PanelShell } from './shell';
export type {
  ShellSlots,
  ShellColorScheme,
  ShellConfig,
  DashboardShellProps,
  StackedShellProps,
  CenteredShellProps,
  PanelShellProps,
} from './shell';
