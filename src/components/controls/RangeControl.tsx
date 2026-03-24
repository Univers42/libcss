import type { PropControl } from '../../core/types';

interface RangeControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function RangeControl({ control, value, onChange }: RangeControlProps) {
  const num = Number(value ?? control.defaultValue ?? 0);
  return (
    <div className="shell-control">
      <label className="shell-control__label">
        {control.label}
        <span className="shell-control__value">{num}</span>
      </label>
      <input
        type="range"
        className="shell-control__range"
        value={num}
        min={control.min ?? 0}
        max={control.max ?? 100}
        step={control.step ?? 1}
        onChange={(e) => onChange(control.key, Number(e.target.value))}
      />
    </div>
  );
}
