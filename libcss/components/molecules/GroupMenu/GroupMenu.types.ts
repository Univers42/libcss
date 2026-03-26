import type { GroupRule, PropertyDef } from '@libcss/common';

export interface GroupMenuProps {
  /** Current group-by rule (or undefined). */
  groupBy?: GroupRule;
  /** Available properties. */
  properties: PropertyDef[];
  /** Fires when group-by changes. Passing undefined removes grouping. */
  onChange: (groupBy: GroupRule | undefined) => void;
  /** Additional class names. */
  className?: string;
}
