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
    <button type="button" className="shell-list-item" onClick={onClick}>
      <span className="shell-list-item__icon">{meta.icon}</span>
      <div className="shell-list-item__body">
        <h3 className="shell-list-item__title">{meta.label}</h3>
        <p className="shell-list-item__desc">{meta.description}</p>
      </div>
      <span className="shell-list-item__count">{count}</span>
    </button>
  );
}
