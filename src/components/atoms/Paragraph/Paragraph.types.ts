import type { ReactNode } from 'react';

export type ParagraphSize = 'sm' | 'md' | 'lg';

export interface ParagraphProps {
  readonly size?: ParagraphSize;
  readonly muted?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
