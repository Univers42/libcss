import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_PAGE_ICON } from './PageLink.constants';
import type { PageLinkProps } from './PageLink.types';

export function PageLink({
  title,
  icon = DEFAULT_PAGE_ICON,
  href,
  compact = false,
  className = '',
}: PageLinkProps): JSX.Element {
  const classes = cn(
    'prisma-page',
    compact && 'prisma-page--compact',
    className,
  );

  return (
    <a className={classes} href={href}>
      <span className="prisma-page__icon">{icon}</span>
      <span className="prisma-page__title">{title}</span>
      <span className="prisma-page__arrow">→</span>
    </a>
  );
}
