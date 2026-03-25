import { forwardRef } from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, size = 'md', className, id, ...rest }, ref) {
  const inputId = id || (label ? `sw-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`switch switch--${size}${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input ref={ref} type="checkbox" className="switch__input" id={inputId} {...rest} />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
});
