/**
 * UI Spinner — Stub loader component
 */
import type { FC } from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 'md', className }) => (
  <span className={`spinner spinner--${size} ${className ?? ''}`} aria-label="Loading" />
);
