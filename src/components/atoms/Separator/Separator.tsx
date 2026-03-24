import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { SeparatorProps } from './Separator.types';

export function Separator({
  variant = 'solid',
  spacing = 'default',
  thick = false,
  className = '',
}: SeparatorProps): JSX.Element {
  const classes = cn(
    'prisma-separator',
    variant !== 'solid' && `prisma-separator--${variant}`,
    spacing !== 'default' && `prisma-separator--${spacing}`,
    thick && 'prisma-separator--thick',
    className,
  );
  return <hr className={classes} />;
}
