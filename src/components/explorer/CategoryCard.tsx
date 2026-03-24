import type { ComponentCategory } from '../../core/types';
import { CATEGORY_META } from '../../core/types';
import { registry } from '../../core/registry';

interface CategoryCardProps {
  category: ComponentCategory;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const meta = CATEGORY_META[category];
  const count = registry.getByCategory(category).length;

  return (
    <button type="button" className="studio-category-card" onClick={onClick}>
      <span className="studio-category-card__icon">{meta.icon}</span>
      <div className="studio-category-card__body">
        <h3 className="studio-category-card__title">{meta.label}</h3>
        <p className="studio-category-card__desc">{meta.description}</p>
      </div>
      <span className="studio-category-card__count">{count}</span>
    </button>
  );
}
