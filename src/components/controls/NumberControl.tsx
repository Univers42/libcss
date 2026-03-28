import type { NumberParameter } from './types';

interface NumberControlProps {
  param: NumberParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  onCommit?: (key: string, value: unknown) => void;
}

export function NumberControl({ param, value, onChange, onCommit }: NumberControlProps) {
  const num = Number(value ?? param.defaultValue ?? 0);
  const step = param.step ?? 1;
  const min = param.min ?? 0;
  const max = param.max ?? 100;

  /** Stepper click: update + commit immediately. */
  const stepBy = (delta: number) => {
    const next = Math.min(max, Math.max(min, num + delta));
    onChange(param.key, next);
    onCommit?.(param.key, next);
  };

  return (
    <div className="shell-control">
      <label className="shell-control__label">
        {param.label}
        {param.unit && <span className="shell-control__unit">{param.unit}</span>}
      </label>
      <div className="shell-control__number-row">
        <button
          type="button"
          className="shell-control__stepper"
          onClick={() => stepBy(-step)}
          disabled={param.disabled || num <= min}
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
          disabled={param.disabled}
          onChange={(e) => onChange(param.key, Number(e.target.value))}
          onBlur={(e) => onCommit?.(param.key, Number(e.target.value))}
        />
        <button
          type="button"
          className="shell-control__stepper"
          onClick={() => stepBy(step)}
          disabled={param.disabled || num >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}
