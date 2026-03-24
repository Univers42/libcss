import { useMemo } from 'react';
import type { ComponentCategory, ComponentEntry } from '@libcss/studio';
import { CATEGORY_META, registry } from '@libcss/studio';

interface OverviewViewProps {
  onSelectCategory: (category: ComponentCategory) => void;
  onSelectComponent: (id: string, category: ComponentCategory) => void;
  onOpenGallery: () => void;
}

const CATEGORIES: ComponentCategory[] = ['atoms', 'molecules', 'media', 'layouts'];

export function OverviewView({ onSelectCategory, onSelectComponent, onOpenGallery }: OverviewViewProps) {
  const grouped = useMemo(() => registry.getGroupedByCategory(), []);

  return (
    <section className="overview">
      <div className="overview__hero">
        <h1 className="overview__title">Prismatica Design System</h1>
        <p className="overview__subtitle">
          Browse, customize, and preview every component. Pick a category from the
          sidebar or click any card below.
        </p>
        <div className="overview__stats">
          <div className="overview__stat">
            <span className="overview__stat-value">{registry.size}</span>
            <span className="overview__stat-label">Components</span>
          </div>
          {CATEGORIES.map((cat) => {
            const entries = grouped.get(cat);
            if (!entries?.length) return null;
            return (
              <div key={cat} className="overview__stat">
                <span className="overview__stat-value">{entries.length}</span>
                <span className="overview__stat-label">{CATEGORY_META[cat].label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="overview__gallery-cta"
        onClick={onOpenGallery}
      >
        <span className="overview__gallery-cta-icon">📊</span>
        <div className="overview__gallery-cta-text">
          <h3>Chart Gallery</h3>
          <p>Explore all 10 chart types with realistic data — bar, line, area, pie, scatter, combo and more.</p>
        </div>
        <span className="overview__gallery-cta-arrow">→</span>
      </button>

      {CATEGORIES.map((cat) => {
        const entries = grouped.get(cat);
        if (!entries?.length) return null;
        const meta = CATEGORY_META[cat];

        return (
          <div key={cat} className="overview__category">
            <button
              type="button"
              className="overview__category-header"
              onClick={() => onSelectCategory(cat)}
            >
              <span className="overview__category-icon">{meta.icon}</span>
              <h2 className="overview__category-title">{meta.label}</h2>
              <span className="overview__category-count">
                {entries.length} component{entries.length > 1 ? 's' : ''} →
              </span>
            </button>
            <p className="overview__category-desc">{meta.description}</p>

            <div className="overview__grid">
              {entries.map((entry: ComponentEntry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="overview__card"
                  onClick={() => onSelectComponent(entry.id, cat)}
                >
                  <div className="overview__card-preview">
                    {entry.render(entry.defaultProps)}
                  </div>
                  <div className="overview__card-info">
                    <h3 className="overview__card-name">{entry.name}</h3>
                    <p className="overview__card-desc">{entry.description}</p>
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
