/**
 * @file AlphaStrip
 * @description Horizontal alpha slider with checkerboard + colour gradient.
 */

import { useRef, useCallback } from 'react';

interface AlphaStripProps {
  alpha: number;
  color: string; // solid hex (no alpha)
  onChange: (a: number) => void;
}

export function AlphaStrip({ alpha, color, onChange }: AlphaStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      onChange(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
    },
    [onChange],
  );

  return (
    <div
      ref={ref}
      className="cpk-alpha"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
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
}
