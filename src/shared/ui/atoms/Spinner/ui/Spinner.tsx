/**
 * @file Spinner.tsx
 * @description Atomic spinner component for loading states.
 */

import type { JSX } from 'react';
import type { SpinnerProps } from '../model/Spinner.types';
import styles from '../Spinner.module.scss';

export function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
  label = 'Loading...',
}: SpinnerProps): JSX.Element {
  const combinedClasses = [
    styles.spinner,
    styles[`spinner--${size}`],
    styles[`spinner--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} role="status">
      <span className={styles['sr-only']}>{label}</span>
    </div>
  );
}
