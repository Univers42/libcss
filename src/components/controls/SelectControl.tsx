import type { PropControl } from '../../core/types';

interface SelectControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function SelectControl({ control, value, onChange }: SelectControlProps) {
  return (
    <div className="studio-control">
      <label className="studio-control__label">{control.label}</label>
      <select
        className="studio-control__select"
        value={String(value ?? control.defaultValue)}
        onChange={(e) => onChange(control.key, e.target.value)}
      >
        {control.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
