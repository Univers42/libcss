import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
  readonly icon?: ReactNode;
}

export interface BreadcrumbProps {
  readonly items: readonly BreadcrumbItem[];
  readonly separator?: string;
  readonly compact?: boolean;
  readonly className?: string;
}
