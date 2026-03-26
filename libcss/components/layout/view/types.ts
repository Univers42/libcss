import type {
  DatabaseSchema,
  DatabaseRecord,
  PropertyDef,
  ViewConfig,
  CellValue,
} from '@libcss/common';

/** Props shared by all database view components. */
export interface DatabaseViewProps {
  /** Full database schema. */
  schema: DatabaseSchema;
  /** Processed (filtered + sorted) records. */
  records: DatabaseRecord[];
  /** Grouped records (if groupBy is active). */
  groups: Map<string, DatabaseRecord[]>;
  /** Properties visible in the current view. */
  visibleProperties: PropertyDef[];
  /** Active view configuration. */
  viewConfig?: ViewConfig;
  /** Cell update callback. */
  onCellChange: (recordId: string, property: string, value: CellValue) => void;
  /** Add record callback. */
  onAddRecord: () => void;
  /** Delete record callback. */
  onDeleteRecord: (recordId: string) => void;
}

/** Format a CellValue for display as a simple string. */
export function displayValue(value: CellValue, property?: PropertyDef): string {
  if (value == null) return '';
  if (typeof value === 'boolean') return value ? '✓' : '';
  if (typeof value === 'number') {
    if (property?.config?.numberFormat === 'currency') {
      return `${property.config.currency ?? '$'}${value.toLocaleString()}`;
    }
    if (property?.config?.numberFormat === 'percent') {
      return `${value}%`;
    }
    return String(value);
  }
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object' && value !== null) {
    if ('url' in value)
      return (value as { url: string; name?: string }).name ?? (value as { url: string }).url;
  }
  return String(value);
}
