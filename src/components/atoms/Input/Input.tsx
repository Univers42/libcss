import { forwardRef } from 'react';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  label,
  error,
  hint,
  inputSize = 'md',
  variant = 'outlined',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  ...rest
}, ref) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const cls = [
    'input-field',
    `input-field--${inputSize}`,
    `input-field--${variant}`,
    error && 'input-field--error',
    fullWidth && 'input-field--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="input-field__label" htmlFor={inputId}>{label}</label>}
      <div className="input-field__wrapper">
        {leftIcon && <span className="input-field__icon input-field__icon--left">{leftIcon}</span>}
        <input ref={ref} className="input-field__input" id={inputId} {...rest} />
        {rightIcon && <span className="input-field__icon input-field__icon--right">{rightIcon}</span>}
      </div>
      {(error || hint) && (
        <span className={`input-field__helper${error ? ' input-field__helper--error' : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
});
