import type { PropertyDef, FilterRule, SortRule, GroupRule } from '@libcss/common';

export interface DatabaseToolbarProps {
  /** Database name/title. */
  title: string;
  /** Database icon (emoji or ReactNode). */
  icon?: React.ReactNode;
  /** Schema properties for filter/sort/group pickers. */
  properties: PropertyDef[];
  /** Current filters. */
  filters: FilterRule[];
  /** Current sorts. */
  sorts: SortRule[];
  /** Current group-by. */
  groupBy?: GroupRule;
  /** Search query text. */
  searchQuery: string;
  /** Callbacks. */
  onFiltersChange: (filters: FilterRule[]) => void;
  onSortsChange: (sorts: SortRule[]) => void;
  onGroupByChange: (groupBy: GroupRule | undefined) => void;
  onSearchChange: (query: string) => void;
  onNewRecord?: () => void;
  /** Additional class names. */
  className?: string;
}
