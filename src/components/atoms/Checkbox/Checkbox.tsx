import { forwardRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({
  label,
  indeterminate = false,
  className,
  id,
  ...rest
}, ref) {
  const inputId = id || (label ? `cb-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`checkbox${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        type="checkbox"
        className="checkbox__input"
        id={inputId}
        {...rest}
      />
      <span className="checkbox__box" />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
});
