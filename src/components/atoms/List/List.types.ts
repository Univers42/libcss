import type { ReactNode } from 'react';

export type ListVariant = 'ordered' | 'unordered' | 'todo';

export interface ListItem {
  readonly id: string;
  readonly content: ReactNode;
  readonly checked?: boolean;
}

export interface ListProps {
  readonly variant?: ListVariant;
  readonly items: readonly ListItem[];
  readonly compact?: boolean;
  readonly onToggle?: (id: string) => void;
  readonly className?: string;
}
