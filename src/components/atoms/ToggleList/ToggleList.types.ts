import type { ReactNode } from 'react';

export interface ToggleListProps {
  readonly title: string;
  readonly defaultOpen?: boolean;
  readonly variant?: 'default' | 'borderless' | 'filled';
  readonly children: ReactNode;
  readonly className?: string;
}
