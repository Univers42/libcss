/**
 * UI StatusBadge — Stub component
 */
import type { FC } from 'react';

export type BadgeStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'pending'
  | 'idle'
  | 'running'
  | 'failed';

export interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status, label, className }) => (
  <span className={`badge badge--${status} ${className ?? ''}`}>{label ?? status}</span>
);
