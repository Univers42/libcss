/**
 * @file Filter Engine
 * @description Pure functions for filtering, sorting, and grouping
 * database records. Operates on the DatabaseRecord[] + schema.
 *
 * All functions are immutable — they return new arrays, never mutate.
 */

import type {
  DatabaseRecord,
  DatabaseSchema,
  FilterRule,
  SortRule,
  GroupRule,
  CellValue,
  PropertyDef,
  FilterOperator,
} from '../types/database';

// ─── Cell Value Helpers ──────────────────────────────

/** Coerce a cell value to a comparable string. */
function cellToString(v: CellValue): string {
  if (v == null) return '';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(cellToString).join(', ');
  if (typeof v === 'object' && 'url' in v) return v.name ?? v.url;
  return String(v);
}

/** Coerce a cell value to a number (NaN if not possible). */
function cellToNumber(v: CellValue): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return parseFloat(v);
  if (typeof v === 'boolean') return v ? 1 : 0;
  return NaN;
}

/** Check if a cell value is "empty". */
function isEmpty(v: CellValue): boolean {
  if (v == null) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

// ─── Filter Matching ─────────────────────────────────

/** Test a single cell value against a filter operator + comparison value. */
function matchesFilter(
  cellVal: CellValue,
  operator: FilterOperator,
  filterVal: CellValue,
): boolean {
  const str = cellToString(cellVal).toLowerCase();
  const filterStr = cellToString(filterVal).toLowerCase();
  const num = cellToNumber(cellVal);
  const filterNum = cellToNumber(filterVal);

  switch (operator) {
    case 'eq':
      return str === filterStr;
    case 'neq':
      return str !== filterStr;
    case 'contains':
      return str.includes(filterStr);
    case 'not_contains':
      return !str.includes(filterStr);
    case 'starts_with':
      return str.startsWith(filterStr);
    case 'ends_with':
      return str.endsWith(filterStr);
    case 'is_empty':
      return isEmpty(cellVal);
    case 'is_not_empty':
      return !isEmpty(cellVal);
    case 'gt':
      return !isNaN(num) && !isNaN(filterNum) && num > filterNum;
    case 'gte':
      return !isNaN(num) && !isNaN(filterNum) && num >= filterNum;
    case 'lt':
      return !isNaN(num) && !isNaN(filterNum) && num < filterNum;
    case 'lte':
      return !isNaN(num) && !isNaN(filterNum) && num <= filterNum;
    case 'in': {
      const list = Array.isArray(filterVal) ? filterVal : [filterVal];
      return list.some((v) => cellToString(v).toLowerCase() === str);
    }
    case 'not_in': {
      const list = Array.isArray(filterVal) ? filterVal : [filterVal];
      return !list.some((v) => cellToString(v).toLowerCase() === str);
    }
    default:
      return true;
  }
}

// ─── Public API ──────────────────────────────────────

/**
 * Filter records by a set of filter rules (AND logic).
 * All rules must match for a record to be included.
 */
export function applyFilters(
  records: readonly DatabaseRecord[],
  filters: readonly FilterRule[],
  _schema?: DatabaseSchema,
): DatabaseRecord[] {
  if (!filters.length) return [...records];

  return records.filter((record) =>
    filters.every((rule) => {
      const cellVal = record.values[rule.property];
      return matchesFilter(cellVal, rule.operator, rule.value);
    }),
  );
}

/**
 * Sort records by a list of sort rules (first rule is primary).
 */
export function applySort(
  records: readonly DatabaseRecord[],
  sorts: readonly SortRule[],
  schema?: DatabaseSchema,
): DatabaseRecord[] {
  if (!sorts.length) return [...records];

  const propMap = new Map<string, PropertyDef>();
  if (schema) {
    for (const p of schema.properties) {
      propMap.set(p.id, p);
    }
  }

  return [...records].sort((a, b) => {
    for (const rule of sorts) {
      const prop = propMap.get(rule.property);
      const aVal = a.values[rule.property];
      const bVal = b.values[rule.property];

      let cmp: number;

      // Determine comparison type from property type
      const isNumeric =
        prop &&
        (prop.type === 'number' ||
          prop.type === 'number_id' ||
          prop.type === 'checkbox');

      const isDate =
        prop &&
        (prop.type === 'date' ||
          prop.type === 'created_time' ||
          prop.type === 'last_edited_time');

      if (isNumeric) {
        const an = cellToNumber(aVal);
        const bn = cellToNumber(bVal);
        if (isNaN(an) && isNaN(bn)) cmp = 0;
        else if (isNaN(an)) cmp = 1;
        else if (isNaN(bn)) cmp = -1;
        else cmp = an - bn;
      } else if (isDate) {
        const aDate = aVal ? new Date(String(aVal)).getTime() : 0;
        const bDate = bVal ? new Date(String(bVal)).getTime() : 0;
        cmp = aDate - bDate;
      } else {
        const aStr = cellToString(aVal).toLowerCase();
        const bStr = cellToString(bVal).toLowerCase();
        cmp = aStr.localeCompare(bStr);
      }

      if (cmp !== 0) {
        return rule.direction === 'desc' ? -cmp : cmp;
      }
    }
    return 0;
  });
}

/**
 * Group records by a property.
 * Returns a Map of group label → records in that group.
 * Records with empty values go to an "(Empty)" group.
 */
export function applyGroupBy(
  records: readonly DatabaseRecord[],
  groupBy: GroupRule | undefined,
  schema?: DatabaseSchema,
): Map<string, DatabaseRecord[]> {
  if (!groupBy) {
    return new Map([['all', [...records]]]);
  }

  const groups = new Map<string, DatabaseRecord[]>();
  const prop = schema?.properties.find((p) => p.id === groupBy.property);

  // Pre-populate groups for select/status types so empty groups appear
  if (prop && groupBy.showEmpty !== false) {
    const options =
      prop.type === 'status'
        ? prop.config?.statusOptions
        : prop.config?.options;
    if (options) {
      for (const opt of options) {
        groups.set(opt.label, []);
      }
    }
  }

  for (const record of records) {
    const cellVal = record.values[groupBy.property];
    let key: string;

    if (Array.isArray(cellVal)) {
      // Multi-select: record appears in each selected group
      if (cellVal.length === 0) {
        key = '(Empty)';
        const list = groups.get(key) ?? [];
        list.push(record);
        groups.set(key, list);
      } else {
        for (const v of cellVal) {
          const k = String(v);
          const list = groups.get(k) ?? [];
          list.push(record);
          groups.set(k, list);
        }
      }
      continue;
    }

    if (isEmpty(cellVal)) {
      key = '(Empty)';
    } else if (typeof cellVal === 'boolean') {
      key = cellVal ? 'Yes' : 'No';
    } else {
      key = cellToString(cellVal);
    }

    const list = groups.get(key) ?? [];
    list.push(record);
    groups.set(key, list);
  }

  // Sort groups if requested
  if (groupBy.sort) {
    const entries = [...groups.entries()];
    entries.sort(([a], [b]) => {
      const cmp = a.localeCompare(b);
      return groupBy.sort === 'desc' ? -cmp : cmp;
    });
    const sorted = new Map<string, DatabaseRecord[]>();
    for (const [k, v] of entries) sorted.set(k, v);
    return sorted;
  }

  return groups;
}

/**
 * Full pipeline: filter → sort → return processed records.
 */
export function processRecords(
  records: readonly DatabaseRecord[],
  filters: readonly FilterRule[],
  sorts: readonly SortRule[],
  schema?: DatabaseSchema,
): DatabaseRecord[] {
  const filtered = applyFilters(records, filters, schema);
  return applySort(filtered, sorts, schema);
}

/**
 * Search records by a text query across all visible properties.
 */
export function searchRecords(
  records: readonly DatabaseRecord[],
  query: string,
  visibleProperties?: readonly string[],
): DatabaseRecord[] {
  if (!query.trim()) return [...records];
  const q = query.toLowerCase();

  return records.filter((record) => {
    const keys = visibleProperties ?? Object.keys(record.values);
    return keys.some((key) => {
      const val = record.values[key];
      return cellToString(val).toLowerCase().includes(q);
    });
  });
}

// Re-export the cellToString utility for view renderers
export { cellToString, cellToNumber, isEmpty };
