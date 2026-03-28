import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { BrandLogoProps } from './BrandLogo.types';
import { DefaultLogoIcon } from './BrandLogo.icons';
import { DEFAULT_HREF, DEFAULT_TITLE } from './BrandLogo.constants';

export function BrandLogo({
  href = DEFAULT_HREF,
  title = DEFAULT_TITLE,
  icon,
  className = '',
  onClick,
}: BrandLogoProps): JSX.Element {
  return (
    <a
      href={href}
      className={cn('prisma-brand-logo', className)}
      onClick={onClick}
      aria-label={`${title} - Home`}
    >
      <span className="prisma-brand-logo__icon">{icon ?? <DefaultLogoIcon />}</span>
      <span className="prisma-brand-logo__title">{title}</span>
    </a>
  );
}
