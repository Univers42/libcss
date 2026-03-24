import { useState, useCallback } from 'react';
import type { ComponentCategory, StudioView, StudioState } from '../core/types';

const INITIAL_STATE: StudioState = {
  view: 'catalog',
  category: null,
  componentId: null,
  searchQuery: '',
};

/**
 * Navigation state machine for a component explorer.
 * Manages view / category / component / search transitions.
 */
export function useStudioNavigation() {
  const [state, setState] = useState<StudioState>(INITIAL_STATE);

  const goToCatalog = useCallback(() => {
    setState({
      view: 'catalog',
      category: null,
      componentId: null,
      searchQuery: '',
    });
  }, []);

  const goToCategory = useCallback((category: ComponentCategory) => {
    setState((prev) => ({
      ...prev,
      view: 'category',
      category,
      componentId: null,
      searchQuery: '',
    }));
  }, []);

  const goToPlayground = useCallback(
    (componentId: string, category: ComponentCategory) => {
      setState((prev) => ({
        ...prev,
        view: 'playground',
        category,
        componentId,
      }));
    },
    [],
  );

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.view === 'playground' && prev.category) {
        return { ...prev, view: 'category', componentId: null };
      }
      return { ...INITIAL_STATE };
    });
  }, []);

  const setSearch = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  return {
    ...state,
    goToCatalog,
    goToCategory,
    goToPlayground,
    goBack,
    setSearch,
  };
}
