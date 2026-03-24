import type { PropControl } from '../../core/types';

interface BooleanControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function BooleanControl({ control, value, onChange }: BooleanControlProps) {
  const checked = Boolean(value ?? control.defaultValue);
  return (
    <div className="studio-control studio-control--boolean">
      <label className="studio-control__label">{control.label}</label>
      <div className="studio-control__toggle-track">
        <input
          type="checkbox"
          className="studio-control__checkbox"
          checked={checked}
          onChange={(e) => onChange(control.key, e.target.checked)}
        />
        <div
          className={`studio-control__toggle ${checked ? 'studio-control__toggle--on' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
