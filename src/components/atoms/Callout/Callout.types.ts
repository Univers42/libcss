import type { ReactNode } from 'react';

export type CalloutVariant = 'info' | 'warning' | 'error' | 'success';

export interface CalloutProps {
  readonly variant?: CalloutVariant;
  readonly title?: string;
  readonly icon?: ReactNode;
  readonly compact?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
