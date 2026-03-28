import { useState, useMemo, useCallback } from 'react';

/**
 * Generic search hook — accepts any search function that maps a query string
 * to an array of results. Fully decoupled from any specific registry.
 *
 * @example
 *   // With the component registry
 *   const { query, results, handleSearch } = useSearch(
 *     (q) => registry.search(q),
 *   );
 *
 *   // With any async-free search
 *   const { query, results } = useSearch(
 *     (q) => items.filter(i => i.name.includes(q)),
 *   );
 */
export function useSearch<T>(searchFn: (query: string) => T[]) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchFn(query), [query, searchFn]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return { query, results, handleSearch, clearSearch };
}
