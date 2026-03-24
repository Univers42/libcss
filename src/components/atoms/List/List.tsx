import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_LIST_VARIANT } from './List.constants';
import type { ListProps } from './List.types';

export function List({
  variant = DEFAULT_LIST_VARIANT,
  items,
  compact = false,
  onToggle,
  className = '',
}: ListProps): JSX.Element {
  const classes = cn(
    'prisma-list',
    `prisma-list--${variant}`,
    compact && 'prisma-list--compact',
    className,
  );

  return (
    <div className={classes} role="list">
      {items.map((item) => (
        <div key={item.id} className="prisma-list__item" role="listitem">
          {variant === 'todo' && (
            <input
              type="checkbox"
              className="prisma-list__checkbox"
              checked={item.checked ?? false}
              onChange={() => onToggle?.(item.id)}
              aria-label={`Toggle ${item.id}`}
            />
          )}
          <span className="prisma-list__item-text">{item.content}</span>
        </div>
      ))}
    </div>
  );
}
