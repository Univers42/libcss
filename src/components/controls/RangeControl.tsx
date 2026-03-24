import type { PropControl } from '../../core/types';

interface RangeControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function RangeControl({ control, value, onChange }: RangeControlProps) {
  const num = Number(value ?? control.defaultValue ?? 0);
  return (
    <div className="studio-control">
      <label className="studio-control__label">
        {control.label}
        <span className="studio-control__value">{num}</span>
      </label>
      <input
        type="range"
        className="studio-control__range"
        value={num}
        min={control.min ?? 0}
        max={control.max ?? 100}
        step={control.step ?? 1}
        onChange={(e) => onChange(control.key, Number(e.target.value))}
      />
    </div>
  );
}
