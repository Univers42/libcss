/**
 * @file SaturationMap
 * @description 2D saturation-value grid with a cursor.
 * Y-axis = value (bright top → dark bottom).
 * X-axis = saturation (gray left → vivid right).
 * Background is generated via two CSS gradients layered on
 * a solid hue background — no canvas needed.
 */

import { useRef, useCallback } from 'react';
import type { HSVA, ColorState } from '../model/color-engine';

interface SaturationMapProps {
  color: ColorState;
  onChange: (hsv: HSVA) => void;
}

export function SaturationMap({ color, onChange }: SaturationMapProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromMouse = useCallback(
    (clientX: number, clientY: number) => {
      const el = areaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
      onChange({ h: color.hsv.h, s, v, a: color.hsv.a });
    },
    [color.hsv.h, color.hsv.a, onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateFromMouse(e.clientX, e.clientY);
    },
    [updateFromMouse],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateFromMouse(e.clientX, e.clientY);
    },
    [updateFromMouse],
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const hue = color.hsv.h;
  const cursorX = color.hsv.s * 100;
  const cursorY = (1 - color.hsv.v) * 100;

  return (
    <div
      ref={areaRef}
      className="cpk-satmap"
      style={{ background: `hsl(${hue}, 100%, 50%)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* White → transparent (saturation) */}
      <div className="cpk-satmap__white" />
      {/* Transparent → black (value) */}
      <div className="cpk-satmap__black" />
      {/* Cursor */}
      <div
        className="cpk-satmap__cursor"
        style={{ left: `${cursorX}%`, top: `${cursorY}%` }}
      />
    </div>
  );
}
