/**
 * @file Component Registry
 * @description Extends the common Registry with explorer-specific queries:
 * filter by category, search across name/tags/description.
 */

import { Registry } from '../common';
import type { ComponentCategory, ComponentEntry } from './types';

class ComponentRegistry extends Registry<string, ComponentEntry> {
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

  /** Get summary statistics. */
  getStats(): { total: number; byCategory: Record<string, number> } {
    const byCategory: Record<string, number> = {};
    for (const entry of this.getAll()) {
      byCategory[entry.category] = (byCategory[entry.category] ?? 0) + 1;
    }
    return { total: this.size, byCategory };
  }
}

/** Singleton component registry — import this everywhere. */
export const registry = new ComponentRegistry();
