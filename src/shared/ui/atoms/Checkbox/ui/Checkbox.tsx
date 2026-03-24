/**
 * @file Checkbox.tsx
 * @description Atomic checkbox component for binary states.
 */

import type { JSX } from 'react';
import type { CheckboxProps } from '../model/Checkbox.types';
import styles from '../Checkbox.module.scss';

export function Checkbox({
  label,
  checkboxSize = 'md',
  hasError = false,
  className = '',
  disabled,
  ...props
}: CheckboxProps): JSX.Element {
  const containerClasses = [
    styles['checkbox-container'],
    styles[`checkbox-container--${checkboxSize}`],
    hasError && styles['checkbox-container--error'],
    disabled && styles['checkbox-container--disabled'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        className={styles.checkbox}
        disabled={disabled}
        aria-invalid={hasError}
        {...props}
      />
      {label && <span className={styles['checkbox-label']}>{label}</span>}
    </label>
  );
}
