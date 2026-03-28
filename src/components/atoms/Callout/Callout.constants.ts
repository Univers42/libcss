export const CALLOUT_VARIANTS = ['info', 'warning', 'error', 'success'] as const;
export const DEFAULT_CALLOUT_VARIANT = 'info';

export const CALLOUT_ICONS: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
} as const;
