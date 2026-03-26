import type { FilterRule, PropertyDef } from '@libcss/common';

export interface FilterBarProps {
  /** Current active filters. */
  filters: FilterRule[];
  /** Schema properties available for filtering. */
  properties: PropertyDef[];
  /** Fires when the filter set changes. */
  onChange: (filters: FilterRule[]) => void;
  /** Additional class names. */
  className?: string;
}
