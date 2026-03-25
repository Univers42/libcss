import type { ColorParameter } from './types';

interface ColorControlProps {
  param: ColorParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  onCommit?: (key: string, value: unknown) => void;
}

export function ColorControl({ param, value, onChange, onCommit }: ColorControlProps) {
  const color = String(value || param.defaultValue || '#000000');
  return (
    <div className="shell-control">
      <label className="shell-control__label">{param.label}</label>
      {param.swatches && param.swatches.length > 0 && (
        <div className="shell-control__swatches">
          {param.swatches.map((sw) => (
            <button
              key={sw}
              type="button"
              className={`shell-control__swatch${color === sw ? ' shell-control__swatch--active' : ''}`}
              style={{ background: sw }}
              onClick={() => { onChange(param.key, sw); onCommit?.(param.key, sw); }}
              title={sw}
            />
          ))}
        </div>
      )}
      <div className="shell-control__color-row">
        <input
          type="color"
          className="shell-control__color"
          value={color}
          disabled={param.disabled}
          onChange={(e) => onChange(param.key, e.target.value)}
          onBlur={(e) => onCommit?.(param.key, e.target.value)}
        />
        <input
          type="text"
          className="shell-control__input shell-control__input--color-text"
          value={color}
          disabled={param.disabled}
          onChange={(e) => onChange(param.key, e.target.value)}
          onBlur={(e) => onCommit?.(param.key, e.target.value)}
          maxLength={9}
        />
      </div>
    </div>
  );
}
