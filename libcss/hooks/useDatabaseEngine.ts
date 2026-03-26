import { useMemo, useCallback, useState } from 'react';
import {
  applyFilters,
  applySort,
  applyGroupBy,
  searchRecords,
} from '@libcss/common';
import type {
  DatabaseSource,
  DatabaseRecord,
  FilterRule,
  SortRule,
  GroupRule,
  CellValue,
} from '@libcss/common';

export interface UseDatabaseEngineOptions {
  source: DatabaseSource;
}

/**
 * Core hook that owns the record set and exposes filter / sort / group /
 * search as derived state. Also provides CRUD mutations.
 */
export function useDatabaseEngine({ source }: UseDatabaseEngineOptions) {
  const { schema } = source;

  // ── Mutable record list ──────────────────────────
  const [records, setRecords] = useState<DatabaseRecord[]>(source.records);

  // ── View-level ephemeral state ───────────────────
  const [filters, setFilters] = useState<FilterRule[]>([]);
  const [sorts, setSorts] = useState<SortRule[]>([]);
  const [groupBy, setGroupBy] = useState<GroupRule | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Derived data ─────────────────────────────────
  const processed = useMemo(() => {
    let result: DatabaseRecord[] = records;
    if (searchQuery) {
      result = searchRecords(result, searchQuery);
    }
    result = applyFilters(result, filters, schema);
    result = applySort(result, sorts, schema);
    return result;
  }, [records, filters, sorts, searchQuery, schema]);

  const groups = useMemo(
    () => applyGroupBy(processed, groupBy, schema),
    [processed, groupBy, schema],
  );

  // ── Mutations ────────────────────────────────────
  const updateCell = useCallback(
    (recordId: string, property: string, value: CellValue) => {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === recordId
            ? {
                ...r,
                values: { ...r.values, [property]: value },
                _last_edited_time: new Date().toISOString(),
              }
            : r,
        ),
      );
    },
    [],
  );

  const addRecord = useCallback(
    (values: Record<string, CellValue> = {}) => {
      const id = `r${Date.now()}`;
      const now = new Date().toISOString();
      const record: DatabaseRecord = {
        id,
        values,
        _created_time: now,
        _last_edited_time: now,
        _last_edited_by: 'User',
      };
      setRecords((prev) => [...prev, record]);
      return record;
    },
    [],
  );

  const deleteRecord = useCallback((recordId: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
  }, []);

  return {
    schema,
    records,
    processed,
    groups,

    filters,
    setFilters,
    sorts,
    setSorts,
    groupBy,
    setGroupBy,
    searchQuery,
    setSearchQuery,

    updateCell,
    addRecord,
    deleteRecord,
    setRecords,
  };
}
