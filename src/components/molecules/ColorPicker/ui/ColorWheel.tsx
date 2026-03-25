/**
 * @file ColorWheel
 * @description HSV colour wheel rendered with a conic-gradient.
 * The angle around the wheel maps to hue (0–360°).
 * Distance from center maps to saturation (0–1).
 * Value is kept constant (from current colour state).
 */

import { useRef, useCallback, useMemo } from 'react';
import type { HSVA, ColorState } from '../model/color-engine';

interface ColorWheelProps {
  color: ColorState;
  onChange: (hsv: HSVA) => void;
  /** Wheel diameter in px. */
  size?: number;
}

export function ColorWheel({ color, onChange, size = 220 }: ColorWheelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const rafId = useRef(0);
  const radius = size / 2;
  const colorRef = useRef(color);
  colorRef.current = color;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const update = useCallback(
    (clientX: number, clientY: number) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;

        // Angle → hue (0 at top, clockwise)
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        const h = angle % 360;

        // Distance → saturation (centre = 0, edge = 1)
        const r = size / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const s = Math.min(1, dist / r);
        const c = colorRef.current;
        onChangeRef.current({ h, s, v: c.hsv.v, a: c.hsv.a });
      });
    },
    [size], // only depends on size
  );

  /* ── Cursor position (polar → cartesian) ── */
  const cursorStyle = useMemo(() => {
    const a = (color.hsv.h - 90) * (Math.PI / 180);
    const r = color.hsv.s * radius;
    return {
      left: `calc(50% + ${Math.cos(a) * r}px)`,
      top: `calc(50% + ${Math.sin(a) * r}px)`,
    };
  }, [color.hsv.h, color.hsv.s, radius]);

  return (
    <div
      className="cpk-wheel"
      style={{ width: size, height: size }}
    >
      <div
        ref={ref}
        className="cpk-wheel__ring"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => { if (dragging.current) update(e.clientX, e.clientY); }}
        onPointerUp={() => { dragging.current = false; }}
      >
        {/* White centre overlay for saturation fade */}
        <div className="cpk-wheel__white" />
        {/* Cursor */}
        <div className="cpk-wheel__cursor" style={cursorStyle} />
      </div>
    </div>
  );
}
