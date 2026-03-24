import type { PropControl } from '../core/types';

interface ColorControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function ColorControl({ control, value, onChange }: ColorControlProps) {
  const color = String(value || control.defaultValue || '#000000');
  return (
    <div className="studio-control">
      <label className="studio-control__label">{control.label}</label>
      <div className="studio-control__color">
        <input
          type="color"
          className="studio-control__color-picker"
          value={color || '#000000'}
          onChange={(e) => onChange(control.key, e.target.value)}
        />
        <input
          type="text"
          className="studio-control__input studio-control__input--color"
          value={color}
          onChange={(e) => onChange(control.key, e.target.value)}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
