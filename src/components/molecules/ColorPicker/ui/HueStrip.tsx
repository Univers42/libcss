/**
 * @file HueStrip
 * @description Horizontal hue slider (0–360°).
 * Rendered as a CSS linear gradient — no canvas.
 */

import { useRef, useCallback } from 'react';

interface HueStripProps {
  hue: number;
  onChange: (h: number) => void;
  /** 'horizontal' (default) or 'vertical'. */
  direction?: 'horizontal' | 'vertical';
}

export function HueStrip({ hue, onChange, direction = 'horizontal' }: HueStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = direction === 'horizontal'
        ? (clientX - rect.left) / rect.width
        : (clientY - rect.top) / rect.height;
      onChange(Math.max(0, Math.min(360, pct * 360)));
    },
    [onChange, direction],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      update(e.clientX, e.clientY);
    },
    [update],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      update(e.clientX, e.clientY);
    },
    [update],
  );

  const pct = (hue / 360) * 100;
  const isH = direction === 'horizontal';

  return (
    <div
      ref={ref}
      className={`cpk-hue cpk-hue--${direction}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => { dragging.current = false; }}
    >
      <div
        className="cpk-hue__thumb"
        style={isH ? { left: `${pct}%` } : { top: `${pct}%` }}
      />
    </div>
  );
}
