import { useState, useMemo, useCallback } from 'react';
import { registry } from '../core/registry';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => registry.search(query), [query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return { query, results, handleSearch, clearSearch };
}
