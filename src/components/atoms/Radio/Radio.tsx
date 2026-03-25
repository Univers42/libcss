import { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, className, id, ...rest }, ref) {
  const inputId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`radio${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input ref={ref} type="radio" className="radio__input" id={inputId} {...rest} />
      <span className="radio__circle" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
});
