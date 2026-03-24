import { useMemo } from 'react';
import { registry } from '../../core/registry';
import { CATEGORY_META } from '../../core/types';
import type { ComponentCategory, ComponentEntry } from '../../core/types';

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
    <nav className="shell-nav" aria-label="Component navigation">
      {/* Overview link */}
      <button
        type="button"
        className={`shell-nav__overview${isOverview ? ' shell-nav__overview--active' : ''}`}
        onClick={onOverviewClick}
      >
        <span className="shell-nav__overview-icon">◉</span>
        Overview
      </button>

      {/* Category sections */}
      {CATEGORIES.map((cat) => {
        const entries = grouped.get(cat);
        if (!entries || entries.length === 0) return null;
        const meta = CATEGORY_META[cat];
        const isCategoryActive = activeCategory === cat && !activeComponentId;

        return (
          <div key={cat} className="shell-nav__section">
            <button
              type="button"
              className={`shell-nav__section-title${isCategoryActive ? ' shell-nav__section-title--active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              <span className="shell-nav__section-icon">{meta.icon}</span>
              {meta.label}
              <span className="shell-nav__section-count">{entries.length}</span>
            </button>

            {entries.map((entry: ComponentEntry) => (
              <button
                key={entry.id}
                type="button"
                className={`shell-nav__item${
                  activeComponentId === entry.id ? ' shell-nav__item--active' : ''
                }`}
                onClick={() => onSelectComponent(entry.id, cat)}
              >
                <span className="shell-nav__item-dot" />
                <span className="shell-nav__item-label">{entry.name}</span>
              </button>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
