import { useMemo } from 'react';
import type { ComponentCategory, ComponentEntry } from '@libcss/studio';
import { CATEGORY_META, registry, Breadcrumb, ComponentCard, SearchBar } from '@libcss/studio';

interface CategoryViewProps {
  category: ComponentCategory;
  searchQuery: string;
  onSearch: (query: string) => void;
  onSelectComponent: (id: string, category: ComponentCategory) => void;
  onBack: () => void;
}

export function CategoryView({
  category,
  searchQuery,
  onSearch,
  onSelectComponent,
  onBack,
}: CategoryViewProps) {
  const meta = CATEGORY_META[category];

  const entries = useMemo(() => {
    const all = registry.getByCategory(category);
    if (!searchQuery.trim()) return all;
    const q = searchQuery.toLowerCase();
    return all.filter(
      (e: ComponentEntry) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t: string) => t.toLowerCase().includes(q)),
    );
  }, [category, searchQuery]);

  return (
    <section className="studio-category">
      <Breadcrumb
        segments={[
          { label: 'Catalog', onClick: onBack },
          { label: meta.label },
        ]}
      />

      <div className="studio-category__header">
        <div className="studio-category__info">
          <h2 className="studio-category__title">
            <span className="studio-category__icon">{meta.icon}</span>
            {meta.label}
          </h2>
          <p className="studio-category__description">{meta.description}</p>
        </div>
        <SearchBar value={searchQuery} onChange={onSearch} placeholder="Filter components…" />
      </div>

      {entries.length === 0 ? (
        <div className="studio-category__empty">
          <p>No components match "{searchQuery}"</p>
        </div>
      ) : (
        <div className="studio-category__grid">
          {entries.map((entry: ComponentEntry) => (
            <ComponentCard
              key={entry.id}
              entry={entry}
              onClick={() => onSelectComponent(entry.id, category)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
