/**
 * @file useComponentManifest
 * @description React hook for the component auto-discovery system.
 * Calls discoverComponents() once and caches the result.
 */

import { useState, useEffect } from 'react';
import type { ComponentManifest } from './types';
import { discoverComponents, discoverComponentsSync } from './componentParser';

let cachedManifest: ComponentManifest | null = null;

/**
 * Hook returning the full component manifest.
 * On first call, returns a sync (no-variants) snapshot immediately,
 * then upgrades to the full async manifest once constants are loaded.
 */
export function useComponentManifest(): ComponentManifest {
  const [manifest, setManifest] = useState<ComponentManifest>(
    () => cachedManifest ?? discoverComponentsSync(),
  );

  useEffect(() => {
    if (cachedManifest) {
      setManifest(cachedManifest);
      return;
    }

    let cancelled = false;
    discoverComponents().then((m) => {
      if (!cancelled) {
        cachedManifest = m;
        setManifest(m);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return manifest;
}
