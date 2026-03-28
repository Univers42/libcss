export interface TocItem {
  readonly id: string;
  readonly label: string;
  readonly depth: number;
  readonly href?: string;
}

export type TocVariant = 'default' | 'flat' | 'sticky';

export interface TableOfContentsProps {
  readonly items: readonly TocItem[];
  readonly activeId?: string;
  readonly title?: string;
  readonly variant?: TocVariant;
  readonly className?: string;
}
