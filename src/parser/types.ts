/**
 * @file Component Parser Types
 * @description Type definitions for the auto-discovery system.
 */

import type { ComponentCategory, VariantDimensionDef } from '../core/types';

/** Raw file module shapes discovered via import.meta.glob. */
export interface GlobModule {
  [key: string]: unknown;
}

/** Metadata extracted from a single component directory. */
export interface ComponentManifestEntry {
  /** kebab-case id derived from directory name (e.g. 'brand-logo'). */
  readonly id: string;
  /** PascalCase display name (e.g. 'BrandLogo'). */
  readonly name: string;
  /** Category inferred from parent directory. */
  readonly category: ComponentCategory;
  /** Directory path relative to src/components (e.g. 'atoms/BrandLogo'). */
  readonly path: string;
  /** Tags derived from directory name segments + category. */
  readonly tags: readonly string[];
  /** Whether this component has a matching .entry.ts in the registry. */
  registered: boolean;
  /** Exported constant arrays found (e.g. BUTTON_VARIANTS). */
  readonly variants: Record<string, readonly string[]>;
  /** Variant dimensions inferred from constants (e.g. variant × size). */
  readonly variantDimensions: readonly VariantDimensionDef[];
  /** Files discovered inside the component directory. */
  readonly files: readonly string[];
}

/** Complete manifest of all discovered components. */
export interface ComponentManifest {
  readonly entries: readonly ComponentManifestEntry[];
  readonly byCategory: ReadonlyMap<ComponentCategory, readonly ComponentManifestEntry[]>;
  readonly byId: ReadonlyMap<string, ComponentManifestEntry>;
  readonly categories: readonly ComponentCategory[];
  readonly totalCount: number;
}
