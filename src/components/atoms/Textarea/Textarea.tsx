import { forwardRef, useCallback, useRef, useEffect } from 'react';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  label,
  error,
  hint,
  resize = 'vertical',
  fullWidth = false,
  autoGrow = false,
  minRows = 3,
  maxRows = 12,
  className,
  id,
  onChange,
  ...rest
}, ref) {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const inputId = id || (label ? `ta-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const adjustHeight = useCallback(() => {
    const el = internalRef.current;
    if (!el || !autoGrow) return;
    el.style.height = 'auto';
    const lineH = parseInt(getComputedStyle(el).lineHeight) || 20;
    const min = lineH * minRows;
    const max = lineH * maxRows;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, min), max)}px`;
  }, [autoGrow, minRows, maxRows]);

  useEffect(adjustHeight, [adjustHeight, rest.value]);

  const cls = [
    'textarea',
    error && 'textarea--error',
    fullWidth && 'textarea--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="textarea__label" htmlFor={inputId}>{label}</label>}
      <textarea
        ref={(el) => { internalRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) (ref as any).current = el; }}
        className="textarea__input"
        id={inputId}
        style={{ resize: autoGrow ? 'none' : resize }}
        rows={minRows}
        onChange={(e) => { onChange?.(e); adjustHeight(); }}
        {...rest}
      />
      {(error || hint) && (
        <span className={`textarea__helper${error ? ' textarea__helper--error' : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
});
