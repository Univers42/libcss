import type { SelectParameter } from './types';

interface SelectControlProps {
  param: SelectParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function SelectControl({ param, value, onChange }: SelectControlProps) {
  return (
    <div className="shell-control">
      <label className="shell-control__label">{param.label}</label>
      <select
        className="shell-control__select"
        value={String(value ?? param.defaultValue)}
        disabled={param.disabled}
        onChange={(e) => onChange(param.key, e.target.value)}
      >
        {param.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
