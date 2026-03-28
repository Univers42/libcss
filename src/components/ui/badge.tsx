/**
 * UI Badge — Stub re-export for consuming-app customisation
 */
import type { HTMLAttributes, FC } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const Badge: FC<BadgeProps> = ({ children, className, ...props }) => (
  <span className={className} {...props}>
    {children}
  </span>
);
