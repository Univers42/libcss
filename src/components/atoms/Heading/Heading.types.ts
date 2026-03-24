import type { ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5;

export interface HeadingProps {
  readonly level?: HeadingLevel;
  readonly toggleable?: boolean;
  readonly defaultOpen?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
