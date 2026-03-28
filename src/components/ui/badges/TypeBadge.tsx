/**
 * UI TypeBadge — Stub component
 */
import type { FC } from 'react';

export interface TypeBadgeProps {
  type: string;
  className?: string;
}

export const TypeBadge: FC<TypeBadgeProps> = ({ type, className }) => (
  <span className={`badge badge--type-${type} ${className ?? ''}`}>{type}</span>
);
