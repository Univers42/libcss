import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_CALLOUT_VARIANT, CALLOUT_ICONS } from './Callout.constants';
import type { CalloutProps } from './Callout.types';

export function Callout({
  variant = DEFAULT_CALLOUT_VARIANT,
  title,
  icon,
  compact = false,
  children,
  className = '',
}: CalloutProps): JSX.Element {
  const classes = cn(
    'prisma-callout',
    `prisma-callout--${variant}`,
    compact && 'prisma-callout--compact',
    className,
  );

  return (
    <div className={classes} role="note">
      <span className="prisma-callout__icon">{icon ?? CALLOUT_ICONS[variant]}</span>
      <div className="prisma-callout__content">
        {title && <div className="prisma-callout__title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
