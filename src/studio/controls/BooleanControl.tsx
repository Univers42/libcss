import type { PropControl } from '../core/types';

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
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`studio-control__toggle ${checked ? 'studio-control__toggle--on' : ''}`}
        onClick={() => onChange(control.key, !checked)}
      >
        <span className="studio-control__toggle-thumb" />
      </button>
    </div>
  );
}
