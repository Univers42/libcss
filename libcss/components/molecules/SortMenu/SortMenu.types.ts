import type { SortRule, PropertyDef } from '@libcss/common';

export interface SortMenuProps {
  /** Active sort rules (first = primary). */
  sorts: SortRule[];
  /** Available properties. */
  properties: PropertyDef[];
  /** Fires when sorts change. */
  onChange: (sorts: SortRule[]) => void;
  /** Additional class names. */
  className?: string;
}
