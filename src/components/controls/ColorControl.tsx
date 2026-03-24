import type { PropControl } from '../../core/types';

interface ColorControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function ColorControl({ control, value, onChange }: ColorControlProps) {
  const color = String(value || control.defaultValue || '#000000');
  return (
    <div className="shell-control">
      <label className="shell-control__label">{control.label}</label>
      <div className="shell-control__color-row">
        <input
          type="color"
          className="shell-control__color"
          value={color}
          onChange={(e) => onChange(control.key, e.target.value)}
        />
        <input
          type="text"
          className="shell-control__input shell-control__input--color-text"
          value={color}
          onChange={(e) => onChange(control.key, e.target.value)}
          maxLength={9}
        />
      </div>
    </div>
  );
}
