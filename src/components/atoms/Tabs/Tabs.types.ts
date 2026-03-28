import type { ReactNode } from 'react';

export type TabsVariant = 'line' | 'pills';

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly content: ReactNode;
}

export interface TabsProps {
  readonly tabs: readonly TabItem[];
  readonly defaultTab?: string;
  readonly variant?: TabsVariant;
  readonly compact?: boolean;
  readonly onTabChange?: (tabId: string) => void;
  readonly className?: string;
}
