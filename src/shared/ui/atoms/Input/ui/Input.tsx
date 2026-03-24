/**
 * @file Input.tsx
 * @description Atomic input component for form handling.
 */

import type { JSX } from 'react';
import type { InputProps } from '../model/Input.types';
import styles from '../Input.module.scss';

export function Input({
  variant = 'default',
  inputSize = 'md',
  hasError = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: InputProps): JSX.Element {
  const combinedClasses = [
    styles.input,
    styles[`input--${variant}`],
    styles[`input--${inputSize}`],
    fullWidth && styles['input--fullWidth'],
    hasError && styles['input--error'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <input
      className={combinedClasses}
      disabled={disabled}
      aria-invalid={hasError}
      {...props}
    />
  );
}
