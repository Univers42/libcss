import { useMemo } from 'react';
import type { SliderParameter } from './types';

interface SliderControlProps {
  param: SliderParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function SliderControl({ param, value, onChange }: SliderControlProps) {
  const num = Number(value ?? param.defaultValue ?? param.min);
  const pct = ((num - param.min) / (param.max - param.min)) * 100;

  // Pre-compute mark positions
  const marks = useMemo(() => {
    if (!param.marks || param.marks.length === 0) return null;
    return param.marks.map((m) => ({
      ...m,
      pct: ((m.value - param.min) / (param.max - param.min)) * 100,
    }));
  }, [param.marks, param.min, param.max]);

  return (
    <div className="shell-control shell-control--slider">
      <label className="shell-control__label">
        {param.label}
        <span className="shell-control__value">
          {num}
          {param.unit ? ` ${param.unit}` : ''}
        </span>
      </label>
      <div className="shell-control__slider-track-container">
        <div className="shell-control__slider-track">
          <div className="shell-control__slider-fill" style={{ width: `${pct}%` }} />
          <div className="shell-control__slider-thumb" style={{ left: `${pct}%` }} />
        </div>
        <input
          type="range"
          className="shell-control__slider-input"
          value={num}
          min={param.min}
          max={param.max}
          step={param.step ?? 1}
          disabled={param.disabled}
          onChange={(e) => onChange(param.key, Number(e.target.value))}
        />
        {marks && (
          <div className="shell-control__slider-marks">
            {marks.map((m) => (
              <button
                key={m.value}
                type="button"
                className={`shell-control__slider-mark${num === m.value ? ' shell-control__slider-mark--active' : ''}`}
                style={{ left: `${m.pct}%` }}
                onClick={() => onChange(param.key, m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
