/**
 * @file Studio Registry
 * @description Extends the common Registry with studio-specific queries:
 * filter by category, search across name/tags/description.
 */

import { Registry } from '../../../src/common';
import type { ComponentCategory, ComponentEntry } from './types';

class StudioRegistry extends Registry<string, ComponentEntry> {
  /** Get all entries for a given category. */
  getByCategory(category: ComponentCategory): ComponentEntry[] {
    return this.getAll().filter((e) => e.category === category);
  }

  /** Full-text search across name, tags, and description. */
  search(query: string): ComponentEntry[] {
    if (!query.trim()) return this.getAll();
    const q = query.toLowerCase();
    return this.getAll().filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  /** Get a map of categories → entries. */
  getGroupedByCategory(): Map<ComponentCategory, ComponentEntry[]> {
    const map = new Map<ComponentCategory, ComponentEntry[]>();
    for (const entry of this.getAll()) {
      const list = map.get(entry.category) ?? [];
      list.push(entry);
      map.set(entry.category, list);
    }
    return map;
  }

  /** Get distinct categories that have at least one entry. */
  getActiveCategories(): ComponentCategory[] {
    const cats = new Set<ComponentCategory>();
    for (const entry of this.getAll()) {
      cats.add(entry.category);
    }
    return [...cats];
  }
}

/** Singleton studio registry — import this everywhere. */
export const registry = new StudioRegistry();
