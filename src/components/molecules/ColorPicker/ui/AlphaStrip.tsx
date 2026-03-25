/**
 * @file AlphaStrip
 * @description Horizontal alpha slider with checkerboard + colour gradient.
 */

import { memo, useRef, useCallback } from 'react';

interface AlphaStripProps {
  alpha: number;
  color: string; // solid hex (no alpha)
  onChange: (a: number) => void;
}

export const AlphaStrip = memo(function AlphaStrip({ alpha, color, onChange }: AlphaStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const rafId = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const update = useCallback(
    (clientX: number) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        onChangeRef.current(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
      });
    },
    [], // stable
  );

  return (
    <div
      ref={ref}
      className="cpk-alpha"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging.current) update(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      <div
        className="cpk-alpha__gradient"
        style={{
          background: `linear-gradient(90deg, transparent, ${color})`,
        }}
      />
      <div
        className="cpk-alpha__thumb"
        style={{ left: `${alpha * 100}%` }}
      />
    </div>
  );
});
