import type { ReactNode } from 'react';

export type QuoteVariant = 'default' | 'lg' | 'accent';

export interface QuoteProps {
  readonly author?: string;
  readonly variant?: QuoteVariant;
  readonly children: ReactNode;
  readonly className?: string;
}
