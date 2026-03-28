/**
 * @file CatalogView (OverviewView)
 * @description Landing page showing all component categories with preview cards.
 */

import { useMemo } from 'react';
import type { ComponentCategory, ComponentEntry } from '../../core/types';
import { CATEGORY_META } from '../../core/types';
import { registry } from '../../core/registry';

export interface OverviewViewProps {
  onSelectCategory: (category: ComponentCategory) => void;
  onSelectComponent: (id: string, category: ComponentCategory) => void;
  onOpenGallery: () => void;
}

const CATEGORIES: ComponentCategory[] = ['atoms', 'molecules', 'media', 'layouts'];

export function OverviewView({
  onSelectCategory,
  onSelectComponent,
  onOpenGallery,
}: OverviewViewProps) {
  const grouped = useMemo(() => registry.getGroupedByCategory(), []);

  return (
    <section className="shell-overview">
      <div className="shell-overview__hero">
        <h1 className="shell-overview__title">Prismatica Design System</h1>
        <p className="shell-overview__subtitle">
          Browse, customize, and preview every component. Pick a category from the sidebar or click
          any card below.
        </p>
        <div className="shell-shell-overview__stats">
          <div className="shell-overview__stat">
            <span className="shell-shell-overview__stat-value">{registry.size}</span>
            <span className="shell-shell-overview__stat-label">Components</span>
          </div>
          {CATEGORIES.map((cat) => {
            const entries = grouped.get(cat);
            if (!entries?.length) return null;
            return (
              <div key={cat} className="shell-overview__stat">
                <span className="shell-shell-overview__stat-value">{entries.length}</span>
                <span className="shell-shell-overview__stat-label">{CATEGORY_META[cat].label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" className="shell-overview__cta" onClick={onOpenGallery}>
        <span className="shell-overview__cta-icon">📊</span>
        <div className="shell-overview__cta-text">
          <h3>Chart Gallery</h3>
          <p>
            Explore all 10 chart types with realistic data — bar, line, area, pie, scatter, combo
            and more.
          </p>
        </div>
        <span className="shell-overview__cta-arrow">→</span>
      </button>

      {CATEGORIES.map((cat) => {
        const entries = grouped.get(cat);
        if (!entries?.length) return null;
        const meta = CATEGORY_META[cat];

        return (
          <div key={cat} className="shell-overview__category">
            <button
              type="button"
              className="shell-shell-overview__category-header"
              onClick={() => onSelectCategory(cat)}
            >
              <span className="shell-shell-overview__category-icon">{meta.icon}</span>
              <h2 className="shell-shell-overview__category-title">{meta.label}</h2>
              <span className="shell-shell-overview__category-count">
                {entries.length} component{entries.length > 1 ? 's' : ''} →
              </span>
            </button>
            <p className="shell-shell-overview__category-desc">{meta.description}</p>

            <div className="shell-overview__grid">
              {entries.map((entry: ComponentEntry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="shell-card"
                  onClick={() => onSelectComponent(entry.id, cat)}
                >
                  <div className="shell-card__preview">{entry.render(entry.defaultProps)}</div>
                  <div className="shell-card__info">
                    <h3 className="shell-card__name">{entry.name}</h3>
                    <p className="shell-card__desc">{entry.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
