import type { BooleanParameter } from './types';

interface BooleanControlProps {
  param: BooleanParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function BooleanControl({ param, value, onChange }: BooleanControlProps) {
  const checked = Boolean(value ?? param.defaultValue);
  return (
    <div className="shell-control shell-control--boolean">
      <label className="shell-control__label">{param.label}</label>
      <div className="shell-control__toggle-track">
        <input
          type="checkbox"
          className="shell-control__checkbox"
          checked={checked}
          disabled={param.disabled}
          onChange={(e) => onChange(param.key, e.target.checked)}
        />
        <div
          className={`shell-control__toggle ${checked ? 'shell-control__toggle--on' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
