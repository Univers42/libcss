import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_HEADING_LEVEL } from './Heading.constants';
import type { HeadingProps, HeadingLevel } from './Heading.types';

const TAG_MAP: Record<HeadingLevel, keyof JSX.IntrinsicElements> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
};

export function Heading({
  level = DEFAULT_HEADING_LEVEL,
  toggleable = false,
  defaultOpen = true,
  children,
  className = '',
}: HeadingProps): JSX.Element {
  const Tag = TAG_MAP[level];
  const classes = cn(
    'prisma-heading',
    `prisma-heading--${level}`,
    toggleable && 'prisma-heading--toggle',
    className,
  );

  if (toggleable) {
    return (
      <details open={defaultOpen || undefined}>
        <summary className={classes}>
          <span className="prisma-heading__toggle-icon">▶</span>
          {children}
        </summary>
      </details>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}
