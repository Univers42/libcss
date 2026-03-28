/**
 * @file useJsonConf
 * @description CRUD hook for JSON config files served by a REST API.
 *
 * Designed for dev-tools (makers, studios) where each config
 * is persisted as an individual JSON file on disk.
 *
 *  - Loads all configs on mount
 *  - Optimistic local-state updates (instant UI response)
 *  - Debounced writes to disk (safe for rapid edits / slider dragging)
 *  - Immediate deletes
 *
 * Pair with a Vite dev-server middleware (or any HTTP backend) that
 * exposes three endpoints:
 *
 *   GET    {apiBase}         → ConfEntry[]
 *   PUT    {apiBase}/{slug}  → write / update file
 *   DELETE {apiBase}/{slug}  → delete file
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ConfEntry<T = Record<string, unknown>> {
  /** File slug (filename without `.json`). */
  name: string;
  /** Parsed JSON payload. */
  data: T;
}

export interface UseJsonConfReturn<T> {
  entries: ConfEntry<T>[];
  /** Optimistic local update + debounced PUT. */
  save: (slug: string, data: T) => void;
  /** Local state only — no disk write. For live preview during drag. */
  patch: (slug: string, data: T) => void;
  /** Immediate disk write — no debounce. For commit-on-release. */
  commit: (slug: string, data: T) => void;
  remove: (slug: string) => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useJsonConf<T = Record<string, unknown>>(
  apiBase = '/api/configs',
  debounceMs = 400,
): UseJsonConfReturn<T> {
  const [entries, setEntries] = useState<ConfEntry<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiBase);
      if (!res.ok) throw new Error(`Failed to load configs (${res.status})`);
      const data: ConfEntry<T>[] = await res.json();
      setEntries(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    (slug: string, data: T) => {
      // Instant local-state update
      setEntries((prev) => {
        const idx = prev.findIndex((e) => e.name === slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { name: slug, data };
          return next;
        }
        return [...prev, { name: slug, data }];
      });

      // Debounced disk write
      const existing = timers.current.get(slug);
      if (existing) clearTimeout(existing);

      timers.current.set(
        slug,
        setTimeout(async () => {
          timers.current.delete(slug);
          try {
            await fetch(`${apiBase}/${encodeURIComponent(slug)}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data, null, 2),
            });
          } catch {
            /* debounced write — data is already in local state */
          }
        }, debounceMs),
      );
    },
    [apiBase, debounceMs],
  );

  const patch = useCallback((slug: string, data: T) => {
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.name === slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { name: slug, data };
        return next;
      }
      return [...prev, { name: slug, data }];
    });
  }, []);

  const commit = useCallback(
    (slug: string, data: T) => {
      // Update local state
      setEntries((prev) => {
        const idx = prev.findIndex((e) => e.name === slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { name: slug, data };
          return next;
        }
        return [...prev, { name: slug, data }];
      });

      // Cancel any pending debounced write for this slug
      const pending = timers.current.get(slug);
      if (pending) {
        clearTimeout(pending);
        timers.current.delete(slug);
      }

      // Immediate write to disk
      fetch(`${apiBase}/${encodeURIComponent(slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2),
      }).catch(() => {
        /* commit — data is in local state */
      });
    },
    [apiBase],
  );

  const remove = useCallback(
    async (slug: string) => {
      // Cancel any pending save for this slug
      const pending = timers.current.get(slug);
      if (pending) {
        clearTimeout(pending);
        timers.current.delete(slug);
      }

      setEntries((prev) => prev.filter((e) => e.name !== slug));

      try {
        await fetch(`${apiBase}/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      } catch {
        /* already removed from local state */
      }
    },
    [apiBase],
  );

  return { entries, save, patch, commit, remove, refresh, loading, error };
}
