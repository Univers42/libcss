import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { ParagraphProps } from './Paragraph.types';

export function Paragraph({
  size = 'md',
  muted = false,
  children,
  className = '',
}: ParagraphProps): JSX.Element {
  const classes = cn(
    'prisma-paragraph',
    size !== 'md' && `prisma-paragraph--${size}`,
    muted && 'prisma-paragraph--muted',
    className,
  );
  return <p className={classes}>{children}</p>;
}
