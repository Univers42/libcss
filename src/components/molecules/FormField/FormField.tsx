import type { FormFieldProps } from './FormField.types';
import { cn } from '../../lib';

export function FormField({
  label,
  error,
  children,
  className,
  id,
  required = false,
}: FormFieldProps) {
  return (
    <div className={cn('prisma-field', error && 'prisma-field--error', className)}>
      <label
        className={cn('prisma-field__label', required && 'prisma-field__label--required')}
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      {error && <span className="prisma-field__error">{error}</span>}
    </div>
  );
}
