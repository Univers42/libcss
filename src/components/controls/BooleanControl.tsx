import type { PropControl } from '../../core/types';

interface BooleanControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function BooleanControl({ control, value, onChange }: BooleanControlProps) {
  const checked = Boolean(value ?? control.defaultValue);
  return (
    <div className="shell-control shell-control--boolean">
      <label className="shell-control__label">{control.label}</label>
      <div className="shell-control__toggle-track">
        <input
          type="checkbox"
          className="shell-control__checkbox"
          checked={checked}
          onChange={(e) => onChange(control.key, e.target.checked)}
        />
        <div
          className={`shell-control__toggle ${checked ? 'shell-control__toggle--on' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
