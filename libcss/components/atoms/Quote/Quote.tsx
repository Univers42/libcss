import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { QuoteProps } from './Quote.types';

export function Quote({
  author,
  variant = 'default',
  children,
  className = '',
}: QuoteProps): JSX.Element {
  const classes = cn(
    'prisma-quote',
    variant !== 'default' && `prisma-quote--${variant}`,
    className,
  );

  return (
    <blockquote className={classes}>
      <div className="prisma-quote__text">{children}</div>
      {author && <cite className="prisma-quote__author">{author}</cite>}
    </blockquote>
  );
}
