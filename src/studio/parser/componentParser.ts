/**
 * @file Component Directory Parser
 * @description Auto-discovers components from the filesystem structure using
 * Vite's import.meta.glob. Scans `src/components/{atoms,molecules,media}/`
 * and builds a typed manifest with zero manual registration.
 *
 * Usage:
 *   import { discoverComponents } from '@libcss/studio/parser';
 *   const manifest = await discoverComponents();
 *
 * The parser:
 * 1. Globs all .ts/.tsx files in component directories
 * 2. Groups by directory → extracts name, category, tags
 * 3. Eagerly loads constants files to find variant arrays
 * 4. Cross-references with the studio registry for registration status
 */

import type { ComponentCategory } from '../core/types';
import { registry } from '../core/registry';
import type {
  ComponentManifestEntry,
  ComponentManifest,
  GlobModule,
} from './types';

// ─── Helpers ───────────────────────────────────────────

/** Convert PascalCase to kebab-case. */
function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** Extract category from a glob path like '../components/atoms/Button/Button.tsx'. */
function extractCategory(globPath: string): ComponentCategory | null {
  const match = globPath.match(/components\/(atoms|molecules|media|layouts)\//);
  return match ? (match[1] as ComponentCategory) : null;
}

/** Extract directory name from a glob path. */
function extractDirName(globPath: string): string | null {
  const match = globPath.match(/components\/(?:atoms|molecules|media|layouts)\/([^/]+)\//);
  return match ? match[1] : null;
}

/** Derive search tags from a PascalCase component name and category. */
function deriveTags(name: string, category: ComponentCategory): string[] {
  const words = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(' ');
  return [...new Set([...words, category, toKebab(name)])];
}

/** Check if a value looks like a variant array constant (readonly string[]). */
function isVariantArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === 'string')
  );
}

// ─── Glob Patterns ─────────────────────────────────────

/**
 * Vite import.meta.glob patterns for component directories.
 * These are evaluated at build time — no runtime filesystem access needed.
 */
const FILE_GLOBS = import.meta.glob<GlobModule>(
  [
    '../../components/atoms/*/index.ts',
    '../../components/atoms/*/*.tsx',
    '../../components/atoms/*/*.ts',
    '../../components/molecules/*/index.ts',
    '../../components/molecules/*/*.tsx',
    '../../components/molecules/*/*.ts',
    '../../components/media/*/index.ts',
    '../../components/media/*/*.tsx',
    '../../components/media/*/*.ts',
  ],
  { eager: false },
);

/** Eagerly loaded constants files for variant extraction. */
const CONSTANTS_GLOBS = import.meta.glob<GlobModule>(
  [
    '../../components/atoms/*/*.constants.ts',
    '../../components/molecules/*/*.constants.ts',
    '../../components/media/*/*.constants.ts',
  ],
  { eager: false },
);

// ─── Discovery ─────────────────────────────────────────

/** Group glob paths by their component directory. */
function groupByComponent(
  globPaths: string[],
): Map<string, { category: ComponentCategory; dirName: string; files: string[] }> {
  const groups = new Map<
    string,
    { category: ComponentCategory; dirName: string; files: string[] }
  >();

  for (const path of globPaths) {
    const category = extractCategory(path);
    const dirName = extractDirName(path);
    if (!category || !dirName) continue;

    const key = `${category}/${dirName}`;
    if (!groups.has(key)) {
      groups.set(key, { category, dirName, files: [] });
    }
    groups.get(key)!.files.push(path);
  }

  return groups;
}

/** Extract variant arrays from a loaded constants module. */
function extractVariants(mod: GlobModule): Record<string, readonly string[]> {
  const variants: Record<string, readonly string[]> = {};
  for (const [key, value] of Object.entries(mod)) {
    if (key.includes('VARIANT') || key.includes('SIZE') || key.includes('TYPE')) {
      if (isVariantArray(value)) {
        variants[key] = value;
      }
    }
  }
  return variants;
}

/**
 * Convert discovered variant constants into VariantDimensionDef array.
 * Maps constant names like BUTTON_VARIANTS → { prop: 'variant', ... }
 */
function inferVariantDimensions(
  variants: Record<string, readonly string[]>,
): import('../core/types').VariantDimensionDef[] {
  const dims: import('../core/types').VariantDimensionDef[] = [];
  for (const [constName, values] of Object.entries(variants)) {
    // Extract prop name from constant: BUTTON_VARIANTS → variant, BUTTON_SIZES → size
    const parts = constName.toLowerCase().split('_');
    // Remove component prefix (first segment), keep the rest
    const propParts = parts.slice(1);
    let prop = propParts.join('_');
    // Normalize: VARIANTS → variant, SIZES → size, TYPES → type
    if (prop.endsWith('s')) prop = prop.slice(0, -1);
    if (prop === 'variant') prop = 'variant';
    const label = prop.charAt(0).toUpperCase() + prop.slice(1);
    dims.push({ prop, label, values });
  }
  return dims;
}

/**
 * Discover all components from the filesystem and build a manifest.
 * Call this once at app startup — results are cacheable.
 */
export async function discoverComponents(): Promise<ComponentManifest> {
  const allPaths = Object.keys(FILE_GLOBS);
  const groups = groupByComponent(allPaths);

  // Load constants in parallel for variant extraction
  const constantsEntries = Object.entries(CONSTANTS_GLOBS);
  const loadedConstants = new Map<string, Record<string, readonly string[]>>();

  await Promise.all(
    constantsEntries.map(async ([path, loader]) => {
      const dirName = extractDirName(path);
      const category = extractCategory(path);
      if (!dirName || !category) return;
      try {
        const mod = await loader();
        const variants = extractVariants(mod);
        if (Object.keys(variants).length > 0) {
          loadedConstants.set(`${category}/${dirName}`, variants);
        }
      } catch {
        // Constants file couldn't load — skip
      }
    }),
  );

  // Build manifest entries
  const entries: ComponentManifestEntry[] = [];

  for (const [key, { category, dirName, files }] of groups) {
    const id = toKebab(dirName);
    const name = dirName;
    const tags = deriveTags(dirName, category);
    const variants = loadedConstants.get(key) ?? {};
    const variantDimensions = inferVariantDimensions(variants);
    const registered = registry.has(id);

    entries.push({
      id,
      name,
      category,
      path: `${category}/${dirName}`,
      tags,
      registered,
      variants,
      variantDimensions,
      files: files.map((f) => f.split('/').pop()!),
    });
  }

  // Sort by category then name
  entries.sort((a, b) => {
    const catOrder: ComponentCategory[] = ['atoms', 'molecules', 'media', 'layouts'];
    const catDiff = catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
    return catDiff !== 0 ? catDiff : a.name.localeCompare(b.name);
  });

  // Build indexes
  const byCategory = new Map<ComponentCategory, ComponentManifestEntry[]>();
  const byId = new Map<string, ComponentManifestEntry>();

  for (const entry of entries) {
    byId.set(entry.id, entry);
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }

  const categories = [...byCategory.keys()];

  return {
    entries,
    byCategory,
    byId,
    categories,
    totalCount: entries.length,
  };
}

/**
 * Synchronous variant: builds manifest from already-known glob paths
 * without loading constants (variants will be empty).
 * Useful for initial render before async discovery completes.
 */
export function discoverComponentsSync(): Omit<ComponentManifest, 'entries'> & {
  entries: ComponentManifestEntry[];
} {
  const allPaths = Object.keys(FILE_GLOBS);
  const groups = groupByComponent(allPaths);

  const entries: ComponentManifestEntry[] = [];
  for (const [, { category, dirName, files }] of groups) {
    const id = toKebab(dirName);
    entries.push({
      id,
      name: dirName,
      category,
      path: `${category}/${dirName}`,
      tags: deriveTags(dirName, category),
      registered: registry.has(id),
      variants: {},
      variantDimensions: [],
      files: files.map((f) => f.split('/').pop()!),
    });
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));

  const byCategory = new Map<ComponentCategory, ComponentManifestEntry[]>();
  const byId = new Map<string, ComponentManifestEntry>();
  for (const entry of entries) {
    byId.set(entry.id, entry);
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }

  return {
    entries,
    byCategory,
    byId,
    categories: [...byCategory.keys()],
    totalCount: entries.length,
  };
}
