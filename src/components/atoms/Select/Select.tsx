import type { SelectProps } from './Select.types';

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select…',
  error,
  disabled = false,
  fullWidth = false,
  className,
}: SelectProps) {
  const cls = [
    'select-field',
    error && 'select-field--error',
    fullWidth && 'select-field--full',
    disabled && 'select-field--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="select-field__label">{label}</label>}
      <div className="select-field__wrapper">
        <select
          className="select-field__select"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-field__chevron">▾</span>
      </div>
      {error && <span className="select-field__error">{error}</span>}
    </div>
  );
}
