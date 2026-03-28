import { useState, useRef, useEffect } from 'react';
import type { MultiSelectParameter } from './types';

interface MultiSelectControlProps {
  param: MultiSelectParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function MultiSelectControl({ param, value, onChange }: MultiSelectControlProps) {
  const selected: string[] = Array.isArray(value)
    ? value
    : Array.isArray(param.defaultValue)
      ? param.defaultValue
      : [];

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : param.maxSelections && selected.length >= param.maxSelections
        ? selected
        : [...selected, val];
    onChange(param.key, next);
  };

  return (
    <div className="shell-control" ref={ref}>
      <label className="shell-control__label">{param.label}</label>
      <button
        type="button"
        className="shell-control__multiselect-trigger"
        disabled={param.disabled}
        onClick={() => setOpen(!open)}
      >
        {selected.length === 0
          ? 'Select…'
          : selected.length <= 2
            ? selected.join(', ')
            : `${selected.length} selected`}
        <span className="shell-control__chevron">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="shell-control__multiselect-dropdown">
          {param.options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={`shell-control__multiselect-option${isSelected ? ' shell-control__multiselect-option--selected' : ''}`}
                onClick={() => toggle(opt.value)}
              >
                <span className="shell-control__multiselect-check">{isSelected ? '✓' : ''}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
      {selected.length > 0 && (
        <div className="shell-control__multiselect-pills">
          {selected.map((val) => {
            const opt = param.options.find((o) => o.value === val);
            return (
              <span key={val} className="shell-control__pill">
                {opt?.label ?? val}
                <button
                  type="button"
                  className="shell-control__pill-remove"
                  onClick={() => toggle(val)}
                  aria-label={`Remove ${opt?.label ?? val}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
