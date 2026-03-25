import type { JSX } from 'react';
import { DEFAULT_VARIANT } from './SplitLayout.constants';
import type { SplitLayoutProps } from './SplitLayout.types';
import { cn } from '../../lib';

export function SplitLayout({
  leftContent,
  rightContent,
  variant = DEFAULT_VARIANT,
  className,
  maxWidth,
  id,
}: SplitLayoutProps): JSX.Element {
  return (
    <div
      id={id}
      className={cn('prisma-split-layout', `prisma-split-layout--${variant}`, className)}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div className="prisma-split-layout__left">{leftContent}</div>
      {rightContent && <div className="prisma-split-layout__right">{rightContent}</div>}
    </div>
  );
}
