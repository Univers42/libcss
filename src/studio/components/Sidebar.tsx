import { useMemo } from 'react';
import { registry } from '../core/registry';
import { CATEGORY_META } from '../core/types';
import type { ComponentCategory, ComponentEntry } from '../core/types';

const CATEGORIES: ComponentCategory[] = ['atoms', 'molecules', 'media', 'layouts'];

interface SidebarProps {
  activeCategory: ComponentCategory | null;
  activeComponentId: string | null;
  onSelectCategory: (category: ComponentCategory) => void;
  onSelectComponent: (id: string, category: ComponentCategory) => void;
  onOverviewClick: () => void;
  isOverview: boolean;
}

export function Sidebar({
  activeCategory,
  activeComponentId,
  onSelectCategory,
  onSelectComponent,
  onOverviewClick,
  isOverview,
}: SidebarProps) {
  const grouped = useMemo(() => registry.getGroupedByCategory(), []);

  return (
    <nav className="sidebar" aria-label="Component navigation">
      {/* Overview link */}
      <button
        type="button"
        className={`sidebar__overview${isOverview ? ' sidebar__overview--active' : ''}`}
        onClick={onOverviewClick}
      >
        <span className="sidebar__overview-icon">◉</span>
        Overview
      </button>

      {/* Category sections */}
      {CATEGORIES.map((cat) => {
        const entries = grouped.get(cat);
        if (!entries || entries.length === 0) return null;
        const meta = CATEGORY_META[cat];
        const isCategoryActive = activeCategory === cat && !activeComponentId;

        return (
          <div key={cat} className="sidebar__section">
            <button
              type="button"
              className={`sidebar__section-title${isCategoryActive ? ' sidebar__section-title--active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              <span className="sidebar__section-icon">{meta.icon}</span>
              {meta.label}
              <span className="sidebar__section-count">{entries.length}</span>
            </button>

            {entries.map((entry: ComponentEntry) => (
              <button
                key={entry.id}
                type="button"
                className={`sidebar__item${
                  activeComponentId === entry.id ? ' sidebar__item--active' : ''
                }`}
                onClick={() => onSelectComponent(entry.id, cat)}
              >
                <span className="sidebar__item-dot" />
                <span className="sidebar__item-label">{entry.name}</span>
              </button>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
