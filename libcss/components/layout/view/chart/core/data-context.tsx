/**
 * @file DataProviderContext
 * @description React context for injecting DataProvider into chart trees.
 * Allows nested components to access the data layer without prop drilling.
 */

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { DataProvider } from './data-provider';
import type { DataRecord } from '../Chart.types';

const DataProviderCtx = createContext<DataProvider | null>(null);

/** Consume the current DataProvider from context. */
export function useDataProvider(): DataProvider {
  const ctx = useContext(DataProviderCtx);
  if (!ctx) {
    throw new Error('[prisma-chart] useDataProvider must be used within a <DataProviderScope>');
  }
  return ctx;
}

interface DataProviderScopeProps {
  data: readonly DataRecord[];
  children: ReactNode;
}

/**
 * Wraps children with a DataProvider context.
 * Any child calling `useDataProvider()` will get a fresh provider
 * built from the supplied data array.
 */
export function DataProviderScope({ data, children }: DataProviderScopeProps) {
  const provider = useMemo(() => new DataProvider(data), [data]);
  return <DataProviderCtx.Provider value={provider}>{children}</DataProviderCtx.Provider>;
}
