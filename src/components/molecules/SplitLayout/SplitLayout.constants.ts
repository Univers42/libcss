export const SPLIT_RATIOS = {
  EQUAL: '50/50',
  GOLDEN: '60/40',
  SIDEBAR: '30/70',
} as const;

export type SplitRatio = (typeof SPLIT_RATIOS)[keyof typeof SPLIT_RATIOS];

export const DEFAULT_VARIANT = 'split' as const;
