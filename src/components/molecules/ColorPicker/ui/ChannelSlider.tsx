/**
 * @file ChannelSlider
 * @description Reusable single-channel slider used by RGB / HSL / CMYK views.
 * Renders a labelled track with a gradient background and a thumb.
 */

import { useRef, useCallback } from 'react';

export interface ChannelSliderProps {
  /** Visible label, e.g. "R" or "Hue". */
  label: string;
  /** Current value. */
  value: number;
  /** Minimum. */
  min: number;
  /** Maximum. */
  max: number;
  /** Number of decimals shown. */
  decimals?: number;
  /** Track gradient CSS string. */
  gradient: string;
  /** Called with the new value. */
  onChange: (v: number) => void;
}

export function ChannelSlider({
  label,
  value,
  min,
  max,
  decimals = 0,
  gradient,
  onChange,
}: ChannelSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const rafId = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const minRef = useRef(min);
  minRef.current = min;
  const maxRef = useRef(max);
  maxRef.current = max;

  const update = useCallback(
    (clientX: number) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        onChangeRef.current(minRef.current + pct * (maxRef.current - minRef.current));
      });
    },
    [], // stable
  );

  const pct = ((value - min) / (max - min)) * 100;
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <div className="cpk-channel">
      <span className="cpk-channel__label">{label}</span>
      <div
        ref={ref}
        className="cpk-channel__track"
        style={{ background: gradient }}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => { if (dragging.current) update(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
      >
        <div className="cpk-channel__thumb" style={{ left: `${pct}%` }} />
      </div>
      <span className="cpk-channel__value">{display}</span>
    </div>
  );
}
