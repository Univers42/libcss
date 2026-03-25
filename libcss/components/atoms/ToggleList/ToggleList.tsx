import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { ToggleListProps } from './ToggleList.types';

export function ToggleList({
  title,
  defaultOpen = false,
  variant = 'default',
  children,
  className = '',
}: ToggleListProps): JSX.Element {
  const classes = cn(
    'prisma-toggle-list',
    variant !== 'default' && `prisma-toggle-list--${variant}`,
    className,
  );

  return (
    <details className={classes} open={defaultOpen || undefined}>
      <summary className="prisma-toggle-list__summary">
        <span className="prisma-toggle-list__icon">▶</span>
        {title}
      </summary>
      <div className="prisma-toggle-list__content">{children}</div>
    </details>
  );
}
