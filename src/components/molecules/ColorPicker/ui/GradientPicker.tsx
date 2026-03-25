/**
 * @file GradientPicker
 * @description Multi-stop linear gradient editor.
 * Stops sit on a horizontal bar. Drag to reposition, click to select,
 * double-click the bar to add a new stop. Selected stop controls the
 * parent colour picker's current colour.
 */

import { useState, useRef, useCallback } from 'react';
import type { GradientStop } from '../model/color-engine';
import { buildGradientCSS } from '../model/color-engine';

interface GradientPickerProps {
  stops: GradientStop[];
  onChange: (stops: GradientStop[]) => void;
  /** Currently selected stop index. */
  selectedIndex: number;
  onSelect: (idx: number) => void;
  /** Current hex colour — used when adding a new stop. */
  currentHex: string;
}

export function GradientPicker({
  stops,
  onChange,
  selectedIndex,
  onSelect,
  currentHex,
}: GradientPickerProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<number | null>(null);

  const pctFromClient = useCallback((clientX: number) => {
    const el = barRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = useCallback(
    (idx: number, e: React.PointerEvent) => {
      e.stopPropagation();
      dragging.current = idx;
      onSelect(idx);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [onSelect],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current === null) return;
      const pos = pctFromClient(e.clientX);
      const next = stops.map((s, i) => (i === dragging.current ? { ...s, position: pos } : s));
      onChange(next);
    },
    [stops, onChange, pctFromClient],
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = null;
  }, []);

  const handleBarDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const pos = pctFromClient(e.clientX);
      const next = [...stops, { color: currentHex, position: pos }];
      onChange(next);
      onSelect(next.length - 1);
    },
    [stops, currentHex, onChange, onSelect, pctFromClient],
  );

  const handleDelete = useCallback(
    (idx: number) => {
      if (stops.length <= 2) return; // minimum 2 stops
      const next = stops.filter((_, i) => i !== idx);
      onChange(next);
      onSelect(Math.min(idx, next.length - 1));
    },
    [stops, onChange, onSelect],
  );

  const cssGrad = buildGradientCSS(stops);

  return (
    <div className="cpk-gradient">
      {/* ── Preview ── */}
      <div className="cpk-gradient__preview" style={{ background: cssGrad }} />

      {/* ── Stop bar ── */}
      <div
        ref={barRef}
        className="cpk-gradient__bar"
        style={{ background: cssGrad }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleBarDoubleClick}
      >
        {stops.map((stop, i) => (
          <div
            key={i}
            className={`cpk-gradient__stop${i === selectedIndex ? ' cpk-gradient__stop--selected' : ''}`}
            style={{ left: `${stop.position}%`, background: stop.color }}
            onPointerDown={(e) => handlePointerDown(i, e)}
            onDoubleClick={(e) => { e.stopPropagation(); handleDelete(i); }}
            title={`${stop.color} @ ${Math.round(stop.position)}% — double-click to remove`}
          />
        ))}
      </div>

      <div className="cpk-gradient__hint">
        Drag stops to reposition · Double-click bar to add · Double-click stop to remove
      </div>
    </div>
  );
}
