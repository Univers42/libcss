import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_TOC_TITLE } from './TableOfContents.constants';
import type { TableOfContentsProps } from './TableOfContents.types';

export function TableOfContents({
  items,
  activeId,
  title = DEFAULT_TOC_TITLE,
  variant = 'default',
  className = '',
}: TableOfContentsProps): JSX.Element {
  const classes = cn('prisma-toc', variant !== 'default' && `prisma-toc--${variant}`, className);

  return (
    <nav className={classes} aria-label="Table of contents">
      {title && <div className="prisma-toc__title">{title}</div>}
      <ul className="prisma-toc__list">
        {items.map((item) => (
          <li key={item.id} className="prisma-toc__item" data-depth={item.depth}>
            <a
              className={cn('prisma-toc__link', activeId === item.id && 'prisma-toc__link--active')}
              href={item.href ?? `#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
