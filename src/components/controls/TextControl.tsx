import type { PropControl } from '../../core/types';

interface TextControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function TextControl({ control, value, onChange }: TextControlProps) {
  return (
    <div className="studio-control">
      <label className="studio-control__label">{control.label}</label>
      <input
        type="text"
        className="studio-control__input"
        value={String(value ?? '')}
        placeholder={String(control.defaultValue ?? '')}
        onChange={(e) => onChange(control.key, e.target.value)}
      />
    </div>
  );
}
