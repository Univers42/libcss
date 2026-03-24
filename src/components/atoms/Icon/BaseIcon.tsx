import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_ICON_SIZE } from './Icon.constants';
import type { BaseIconProps } from './Icon.types';

interface IconWrapperProps extends BaseIconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export function BaseIcon({
  size = DEFAULT_ICON_SIZE,
  className = '',
  children,
  viewBox = '0 0 24 24',
}: IconWrapperProps): JSX.Element {
  const combinedClasses = cn(
    'prisma-icon',
    `prisma-icon--${size}`,
    className,
  );

  return (
    <div className={combinedClasses}>
      <svg viewBox={viewBox} aria-hidden="true">
        {children}
      </svg>
    </div>
  );
}
