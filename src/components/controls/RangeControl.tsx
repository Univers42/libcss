import type { RangeParameter } from './types';

interface RangeControlProps {
  param: RangeParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function RangeControl({ param, value, onChange }: RangeControlProps) {
  const num = Number(value ?? param.defaultValue ?? 0);
  return (
    <div className="shell-control">
      <label className="shell-control__label">
        {param.label}
        <span className="shell-control__value">
          {num}
          {param.unit ? ` ${param.unit}` : ''}
        </span>
      </label>
      <input
        type="range"
        className="shell-control__range"
        value={num}
        min={param.min}
        max={param.max}
        step={param.step ?? 1}
        disabled={param.disabled}
        onChange={(e) => onChange(param.key, Number(e.target.value))}
      />
    </div>
  );
}
