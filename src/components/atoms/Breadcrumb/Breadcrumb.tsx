import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_BREADCRUMB_SEPARATOR } from './Breadcrumb.constants';
import type { BreadcrumbProps } from './Breadcrumb.types';

export function Breadcrumb({
  items,
  separator = DEFAULT_BREADCRUMB_SEPARATOR,
  compact = false,
  className = '',
}: BreadcrumbProps): JSX.Element {
  const classes = cn(
    'prisma-breadcrumb',
    compact && 'prisma-breadcrumb--compact',
    className,
  );

  return (
    <nav className={classes} aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="prisma-breadcrumb__item">
          {item.icon && <span className="prisma-breadcrumb__icon">{item.icon}</span>}
          {item.href ? (
            <a className="prisma-breadcrumb__link" href={item.href}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
          <span className="prisma-breadcrumb__separator" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </nav>
  );
}
