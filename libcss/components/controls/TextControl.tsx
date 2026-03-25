import type { TextParameter } from './types';

interface TextControlProps {
  param: TextParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  onCommit?: (key: string, value: unknown) => void;
}

export function TextControl({ param, value, onChange, onCommit }: TextControlProps) {
  const str = String(value ?? param.defaultValue ?? '');

  if (param.multiline) {
    return (
      <div className="shell-control">
        <label className="shell-control__label">{param.label}</label>
        <textarea
          className="shell-control__input shell-control__input--textarea"
          value={str}
          placeholder={param.placeholder}
          maxLength={param.maxLength}
          disabled={param.disabled}
          rows={3}
          onChange={(e) => onChange(param.key, e.target.value)}
          onBlur={(e) => onCommit?.(param.key, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="shell-control">
      <label className="shell-control__label">{param.label}</label>
      <input
        type="text"
        className="shell-control__input"
        value={str}
        placeholder={param.placeholder ?? String(param.defaultValue ?? '')}
        maxLength={param.maxLength}
        disabled={param.disabled}
        onChange={(e) => onChange(param.key, e.target.value)}
        onBlur={(e) => onCommit?.(param.key, e.target.value)}
      />
    </div>
  );
}
