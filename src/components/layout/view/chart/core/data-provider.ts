/**
 * @file DataProvider
 * @description Injectable data abstraction for chart layouts.
 * Charts never touch raw arrays directly — they operate through a
 * DataProvider which handles field access, filtering, grouping,
 * aggregation, sorting, and cumulative transforms.
 *
 * @example
 * ```ts
 * const dp = new DataProvider(salesData);
 * const grouped = dp
 *   .filter([{ field: 'region', operator: 'eq', value: 'EMEA' }])
 *   .sort('month', 'ascending')
 *   .groupBy('product')
 *   .aggregate('revenue', 'sum');
 * ```
 */

import type {
  DataRecord,
  ChartFilter,
  AggregateFunction,
  SortDirection,
  ProcessedDataPoint,
  ProcessedGroupedData,
  ProcessedPieSlice,
  ProcessedScatterPoint,
} from '../Chart.types';

// ─── Filter logic ──────────────────────────────────────
function matchFilter(record: DataRecord, f: ChartFilter): boolean {
  const val = record[f.field];
  const cmp = f.value;

  switch (f.operator) {
    case 'eq':
      return val === cmp;
    case 'neq':
      return val !== cmp;
    case 'gt':
      return Number(val) > Number(cmp);
    case 'gte':
      return Number(val) >= Number(cmp);
    case 'lt':
      return Number(val) < Number(cmp);
    case 'lte':
      return Number(val) <= Number(cmp);
    case 'contains':
      return String(val ?? '')
        .toLowerCase()
        .includes(String(cmp).toLowerCase());
    case 'in':
      return Array.isArray(cmp) && cmp.includes(val);
    case 'not-in':
      return Array.isArray(cmp) && !cmp.includes(val);
    default:
      return true;
  }
}

// ─── Aggregation logic ─────────────────────────────────
function aggregateValues(values: number[], fn: AggregateFunction): number {
  if (values.length === 0) return 0;
  switch (fn) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'count':
      return values.length;
    case 'average':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    case 'median': {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    default:
      return values.reduce((a, b) => a + b, 0);
  }
}

// ─── DataProvider ──────────────────────────────────────
export class DataProvider {
  private readonly records: readonly DataRecord[];

  constructor(data: readonly DataRecord[]) {
    this.records = data;
  }

  /** Get the raw record count. */
  get size(): number {
    return this.records.length;
  }

  /** Get all raw records. */
  getAll(): readonly DataRecord[] {
    return this.records;
  }

  /** Extract all values for a single field. */
  getField<T = unknown>(field: string): T[] {
    return this.records.map((r) => r[field] as T);
  }

  /** Get distinct values for a field. */
  getDistinct(field: string): (string | number | boolean)[] {
    const seen = new Set<string | number | boolean>();
    for (const r of this.records) {
      const v = r[field];
      if (v != null) seen.add(v as string | number | boolean);
    }
    return [...seen];
  }

  /** Return a new DataProvider with filters applied. */
  filter(filters: readonly ChartFilter[]): DataProvider {
    if (!filters.length) return this;
    const filtered = this.records.filter((r) => filters.every((f) => matchFilter(r, f)));
    return new DataProvider(filtered);
  }

  /** Return a new DataProvider sorted by a field. */
  sort(field: string, direction: SortDirection = 'ascending'): DataProvider {
    if (direction === 'none') return this;
    const sorted = [...this.records].sort((a, b) => {
      const va = a[field];
      const vb = b[field];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return direction === 'ascending' ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return direction === 'ascending' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return new DataProvider(sorted);
  }

  /** Return a new DataProvider with zero-value rows removed for a field. */
  omitZeros(field: string): DataProvider {
    return new DataProvider(this.records.filter((r) => Number(r[field]) !== 0));
  }

  /** Aggregate a value field, returning one ProcessedDataPoint per unique xField value. */
  aggregate(xField: string, yField: string, fn: AggregateFunction = 'sum'): ProcessedDataPoint[] {
    const groups = new Map<string, { values: number[]; raw: DataRecord }>();
    for (const r of this.records) {
      const key = String(r[xField] ?? '');
      if (!groups.has(key)) groups.set(key, { values: [], raw: r });
      groups.get(key)!.values.push(Number(r[yField] ?? 0));
    }
    const result: ProcessedDataPoint[] = [];
    for (const [label, { values, raw }] of groups) {
      result.push({ label, value: aggregateValues(values, fn), raw });
    }
    return result;
  }

  /** Group data by a grouping field, producing stacked/grouped data points. */
  groupBy(
    xField: string,
    yField: string,
    groupField: string,
    fn: AggregateFunction = 'sum',
  ): ProcessedGroupedData[] {
    // Build: xLabel → groupLabel → values[]
    const outer = new Map<string, Map<string, number[]>>();
    for (const r of this.records) {
      const xKey = String(r[xField] ?? '');
      const gKey = String(r[groupField] ?? '');
      if (!outer.has(xKey)) outer.set(xKey, new Map());
      const inner = outer.get(xKey)!;
      if (!inner.has(gKey)) inner.set(gKey, []);
      inner.get(gKey)!.push(Number(r[yField] ?? 0));
    }
    const result: ProcessedGroupedData[] = [];
    for (const [label, groupMap] of outer) {
      const groups = new Map<string, number>();
      let total = 0;
      for (const [g, vals] of groupMap) {
        const agg = aggregateValues(vals, fn);
        groups.set(g, agg);
        total += agg;
      }
      result.push({ label, groups, total });
    }
    return result;
  }

  /** Prepare data for pie/donut: one slice per distinct value of categoryField. */
  toPieSlices(
    categoryField: string,
    valueField: string,
    fn: AggregateFunction = 'sum',
  ): ProcessedPieSlice[] {
    const agg = this.aggregate(categoryField, valueField, fn);
    const total = agg.reduce((s, p) => s + p.value, 0);
    return agg.map((p) => ({
      label: p.label,
      value: p.value,
      percentage: total > 0 ? (p.value / total) * 100 : 0,
    }));
  }

  /** Prepare data for scatter: each record becomes an (x, y) point. */
  toScatterPoints(xField: string, yField: string, groupField?: string): ProcessedScatterPoint[] {
    return this.records.map((r) => ({
      x: Number(r[xField] ?? 0),
      y: Number(r[yField] ?? 0),
      label: String(r[xField] ?? ''),
      group: groupField ? String(r[groupField] ?? '') : undefined,
      raw: r,
    }));
  }

  /** Apply cumulative sum to a processed data array. */
  static toCumulative(data: ProcessedDataPoint[]): ProcessedDataPoint[] {
    let running = 0;
    return data.map((p) => {
      running += p.value;
      return { ...p, value: running };
    });
  }
}
