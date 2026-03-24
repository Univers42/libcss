import type { PropControl } from '../../core/types';

interface NumberControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function NumberControl({ control, value, onChange }: NumberControlProps) {
  const num = Number(value ?? control.defaultValue ?? 0);
  const step = control.step ?? 1;
  const min = control.min ?? 0;
  const max = control.max ?? 100;

  return (
    <div className="shell-control">
      <label className="shell-control__label">{control.label}</label>
      <div className="shell-control__number-row">
        <button
          type="button"
          className="shell-control__stepper"
          onClick={() => onChange(control.key, Math.max(min, num - step))}
          disabled={num <= min}
        >
          −
        </button>
        <input
          type="number"
          className="shell-control__input shell-control__input--number"
          value={num}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(control.key, Number(e.target.value))}
        />
        <button
          type="button"
          className="shell-control__stepper"
          onClick={() => onChange(control.key, Math.min(max, num + step))}
          disabled={num >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}
