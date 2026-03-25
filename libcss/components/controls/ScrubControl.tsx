/**
 * @file ScrubControl
 * @description Numeric input with drag-to-scrub.  Looks like a normal input
 * field — but hover shows ↔ arrows, and dragging left/right adjusts the
 * value precisely.  Click to type directly.
 *
 * Features:
 *  - Compact inline design matching regular inputs
 *  - Hover shows ↔ drag indicator (SVG, not emoji)
 *  - Unit badge (px, rem, %, etc.)
 *  - Mini progress bar at bottom
 *
 * Events:
 *  - onChange  → fires on every frame during scrub (live preview)
 *  - onCommit → fires once on pointerUp / blur   (persist to disk)
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ScrubParameter } from './types';

interface ScrubControlProps {
  readonly param: ScrubParameter;
  readonly value: unknown;
  readonly onChange: (key: string, value: unknown) => void;
  readonly onCommit?: (key: string, value: unknown) => void;
}

export function ScrubControl({ param, value, onChange, onCommit }: ScrubControlProps) {
  const num = Number(value ?? param.defaultValue ?? param.min);
  const step = param.step ?? 1;
  const precision = String(step).includes('.') ? String(step).split('.')[1]!.length : 0;
  const sensitivity = param.sensitivity ?? 1;

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const startX   = useRef(0);
  const startVal = useRef(0);
  const dragged  = useRef(false);

  const clamp = useCallback(
    (v: number) => {
      let r = Math.round(v / step) * step;
      r = parseFloat(r.toFixed(precision));
      return Math.min(param.max, Math.max(param.min, r));
    },
    [param.min, param.max, step, precision],
  );

  // ── Pointer scrub ─────────────────────────────────

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (editing) return;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      startX.current = e.clientX;
      startVal.current = num;
      dragged.current = false;
    },
    [editing, num],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!e.buttons) return;
      if (editing) return;
      const dx = e.clientX - startX.current;
      if (!dragged.current && Math.abs(dx) < 3) return;
      dragged.current = true;
      const delta = dx * step * sensitivity;
      const next = clamp(startVal.current + delta);
      onChange(param.key, next);
    },
    [editing, step, sensitivity, clamp, onChange, param.key],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragged.current) {
        const dx = e.clientX - startX.current;
        const next = clamp(startVal.current + dx * step * sensitivity);
        onCommit?.(param.key, next);
      }
      // If not dragged, treat as click → switch to edit mode
      if (!dragged.current && !editing) {
        setEditing(true);
        setEditText(String(num));
      }
    },
    [editing, num, step, sensitivity, clamp, onCommit, param.key],
  );

  // Focus input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commitEdit = useCallback(() => {
    const parsed = parseFloat(editText);
    if (!Number.isNaN(parsed)) {
      const clamped = clamp(parsed);
      onChange(param.key, clamped);
      onCommit?.(param.key, clamped);
    }
    setEditing(false);
  }, [editText, clamp, onChange, onCommit, param.key]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') commitEdit();
      if (e.key === 'Escape') setEditing(false);
    },
    [commitEdit],
  );

  // ── Render ────────────────────────────────────────

  const pct = ((num - param.min) / (param.max - param.min)) * 100;
  const displayVal = precision > 0 ? num.toFixed(precision) : num;
  const unitLabel = param.unit || '';

  return (
    <div className="shell-control shell-control--scrub">
      <label className="shell-control__label">{param.label}</label>

      {editing ? (
        <div className="scrub-row">
          <input
            ref={inputRef}
            type="number"
            className="scrub-field scrub-field--editing"
            value={editText}
            min={param.min}
            max={param.max}
            step={step}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={onKeyDown}
          />
          {unitLabel && <span className="scrub-unit">{unitLabel}</span>}
        </div>
      ) : (
        <div
          ref={scrubRef}
          className="scrub-row scrub-row--idle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          title={`Drag ↔ to adjust · Click to type · ${param.min}–${param.max}`}
        >
          {/* Drag arrows — visible on hover */}
          <span className="scrub-arrows">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 1 L0.5 4 L3 7" />
              <path d="M7 1 L9.5 4 L7 7" />
            </svg>
          </span>
          <span className="scrub-value">{displayVal}</span>
          {unitLabel && <span className="scrub-unit">{unitLabel}</span>}
          {/* Progress indicator */}
          <div className="scrub-track">
            <div className="scrub-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
