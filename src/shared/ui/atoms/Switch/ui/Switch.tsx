/**
 * @file Switch.tsx
 * @description Atomic switch (toggle) component for binary states.
 */

import type { JSX } from 'react';
import type { SwitchProps } from '../model/Switch.types';
import styles from '../Switch.module.scss';

export function Switch({
  label,
  switchSize = 'md',
  hasError = false,
  className = '',
  disabled,
  id,
  ...props
}: SwitchProps): JSX.Element {
  const containerClasses = [
    styles['switch-container'],
    styles[`switch-container--${switchSize}`],
    hasError && styles['switch-container--error'],
    disabled && styles['switch-container--disabled'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={styles.switch__input}
        disabled={disabled}
        aria-invalid={hasError}
        role="switch"
        {...props}
      />
      <span className={styles.switch__track}>
        <span className={styles.switch__thumb} />
      </span>
      {label && <span className={styles['switch-label']}>{label}</span>}
    </label>
  );
}
