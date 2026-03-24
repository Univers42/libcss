import type { PropControl } from '../../core/types';

interface TextControlProps {
  control: PropControl;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function TextControl({ control, value, onChange }: TextControlProps) {
  return (
    <div className="shell-control">
      <label className="shell-control__label">{control.label}</label>
      <input
        type="text"
        className="shell-control__input"
        value={String(value ?? '')}
        placeholder={String(control.defaultValue ?? '')}
        onChange={(e) => onChange(control.key, e.target.value)}
      />
    </div>
  );
}
