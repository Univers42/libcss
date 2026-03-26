import { useState, useRef, useEffect, useCallback } from 'react';
import type { InlineEditorProps } from './InlineEditor.types';
import type { CellValue } from '@libcss/common';

/**
 * A generic inline-editing cell.
 * Double-click to activate, Escape to cancel, Enter/blur to commit.
 * Renders a type-aware input based on `property.type`.
 */
export function InlineEditor({
  value,
  property,
  onCommit,
  onCancel,
  className,
}: InlineEditorProps) {
  const [draft, setDraft] = useState<string>(toInputValue(value));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (inputRef.current && 'select' in inputRef.current) {
      (inputRef.current as HTMLInputElement).select();
    }
  }, []);

  const commit = useCallback(() => {
    const parsed = fromInputValue(draft, property.type);
    onCommit(parsed);
  }, [draft, property.type, onCommit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onCancel?.();
      }
    },
    [commit, onCancel],
  );

  const cls = ['inline-editor', className].filter(Boolean).join(' ');

  // ── Checkbox ────────────────────────────────────
  if (property.type === 'checkbox') {
    return (
      <label className={`${cls} inline-editor--checkbox`}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="checkbox"
          className="inline-editor__checkbox"
          checked={draft === 'true'}
          onChange={(e) => {
            onCommit(e.target.checked);
          }}
          onKeyDown={handleKeyDown}
        />
      </label>
    );
  }

  // ── Select / Status ─────────────────────────────
  if (property.type === 'select' || property.type === 'status') {
    const options =
      property.type === 'status'
        ? property.config?.statusOptions ?? []
        : property.config?.options ?? [];

    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        className={`${cls} inline-editor--select`}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          onCommit(e.target.value);
        }}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  // ── Number ──────────────────────────────────────
  if (property.type === 'number' || property.type === 'number_id') {
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="number"
        className={`${cls} inline-editor--number`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    );
  }

  // ── Date ────────────────────────────────────────
  if (
    property.type === 'date' ||
    property.type === 'created_time' ||
    property.type === 'last_edited_time'
  ) {
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="date"
        className={`${cls} inline-editor--date`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    );
  }

  // ── URL / Email / Phone ─────────────────────────
  if (property.type === 'url' || property.type === 'email' || property.type === 'phone') {
    const inputType =
      property.type === 'email' ? 'email' : property.type === 'phone' ? 'tel' : 'url';
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={inputType}
        className={`${cls} inline-editor--${property.type}`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    );
  }

  // ── Multi-select (comma-separated) ─────────────
  if (property.type === 'multi_select') {
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        className={`${cls} inline-editor--multi`}
        value={draft}
        placeholder="value1, value2, …"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    );
  }

  // ── Default: text ───────────────────────────────
  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      className={`${cls} inline-editor--text`}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
    />
  );
}

// ─── Helpers ──────────────────────────────────────────

function toInputValue(v: CellValue): string {
  if (v == null) return '';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

function fromInputValue(raw: string, type: string): CellValue {
  if (type === 'checkbox') return raw === 'true';
  if (type === 'number' || type === 'number_id') {
    const n = parseFloat(raw);
    return isNaN(n) ? null : n;
  }
  if (type === 'multi_select') {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return raw || null;
}
