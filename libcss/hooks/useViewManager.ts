import { useState, useCallback, useMemo } from 'react';
import type { ViewConfig, DatabaseSource } from '@libcss/common';

export interface UseViewManagerOptions {
  source: DatabaseSource;
}

/**
 * Manages the list of views and the currently active view.
 * Provides view CRUD + switching.
 */
export function useViewManager({ source }: UseViewManagerOptions) {
  const [views, setViews] = useState<ViewConfig[]>(source.views);
  const [activeViewId, setActiveViewId] = useState<string>(
    source.views[0]?.id ?? '',
  );

  const activeView = useMemo(
    () => views.find((v) => v.id === activeViewId) ?? views[0],
    [views, activeViewId],
  );

  const switchView = useCallback((viewId: string) => {
    setActiveViewId(viewId);
  }, []);

  const addView = useCallback(
    (view: ViewConfig) => {
      setViews((prev) => [...prev, view]);
      setActiveViewId(view.id);
    },
    [],
  );

  const updateView = useCallback(
    (viewId: string, patch: Partial<ViewConfig>) => {
      setViews((prev) =>
        prev.map((v) => (v.id === viewId ? { ...v, ...patch } : v)),
      );
    },
    [],
  );

  const deleteView = useCallback(
    (viewId: string) => {
      setViews((prev) => {
        const next = prev.filter((v) => v.id !== viewId);
        if (activeViewId === viewId && next.length > 0) {
          setActiveViewId(next[0].id);
        }
        return next;
      });
    },
    [activeViewId],
  );

  return {
    views,
    activeView,
    activeViewId,
    switchView,
    addView,
    updateView,
    deleteView,
  };
}
