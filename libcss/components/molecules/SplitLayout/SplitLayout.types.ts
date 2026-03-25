import type { ReactNode } from 'react';

export type SplitLayoutVariant = 'split' | 'centered' | 'minimal';

export interface SplitLayoutProps {
  readonly leftContent: ReactNode;
  readonly rightContent?: ReactNode;
  readonly variant?: SplitLayoutVariant;
  readonly className?: string;
  readonly maxWidth?: string;
  readonly id?: string;
}
