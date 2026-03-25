import type { ToggleParameter } from './types';

interface ToggleControlProps {
  param: ToggleParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function ToggleControl({ param, value, onChange }: ToggleControlProps) {
  const on = Boolean(value ?? param.defaultValue);
  const onLabel = param.onLabel ?? 'On';
  const offLabel = param.offLabel ?? 'Off';

  return (
    <div className="shell-control shell-control--toggle">
      <label className="shell-control__label">{param.label}</label>
      <div className="shell-control__toggle-btns">
        <button
          type="button"
          className={`shell-control__toggle-btn${!on ? ' shell-control__toggle-btn--active' : ''}`}
          disabled={param.disabled}
          onClick={() => onChange(param.key, false)}
        >
          {offLabel}
        </button>
        <button
          type="button"
          className={`shell-control__toggle-btn${on ? ' shell-control__toggle-btn--active' : ''}`}
          disabled={param.disabled}
          onClick={() => onChange(param.key, true)}
        >
          {onLabel}
        </button>
      </div>
    </div>
  );
}
