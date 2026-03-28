/**
 * @file KeyRipple.tsx
 * @description Spawns expanding ripple rings on every keypress.
 *
 * Each ripple is a thin ring that scales out from the current
 * cursor position (or viewport center if unknown) and fades away.
 * Uses CSS @keyframes for the expansion — zero JS animation loop.
 *
 * Ripples self-clean after their animation completes (600ms).
 * Maximum 6 concurrent ripples to limit GPU pressure.
 */

import { useRef, useCallback, useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const MAX_RIPPLES = 6;
const RIPPLE_DURATION = 650; // ms — matches CSS animation

let nextId = 0;

function removeById(id: number) {
  return (prev: Ripple[]) => prev.filter((r) => r.id !== id);
}

export interface KeyRippleProps {
  /** Whether the effect is enabled */
  enabled?: boolean;
}

export function KeyRipple({ enabled = true }: Readonly<KeyRippleProps>) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mousePos = useRef({ x: globalThis.innerWidth / 2, y: globalThis.innerHeight / 2 });

  /* Track cursor so we know where to spawn the ripple */
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    globalThis.addEventListener('mousemove', onMove, { passive: true });
    return () => globalThis.removeEventListener('mousemove', onMove);
  }, [enabled]);

  /* Spawn ripple on keydown */
  const handleKey = useCallback((e: KeyboardEvent) => {
    /* Ignore modifier-only keys */
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;

    const id = ++nextId;
    const { x, y } = mousePos.current;

    setRipples((prev) => {
      const next = [...prev, { id, x, y }];
      /* Keep pool bounded */
      return next.length > MAX_RIPPLES ? next.slice(-MAX_RIPPLES) : next;
    });

    /* Auto-remove after animation completes */
    setTimeout(() => setRipples(removeById(id)), RIPPLE_DURATION);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    globalThis.addEventListener('keydown', handleKey, { passive: true });
    return () => globalThis.removeEventListener('keydown', handleKey);
  }, [enabled, handleKey]);

  if (!enabled) return null;

  return (
    <div className="ct-key-ripple" aria-hidden="true">
      {ripples.map((r) => (
        <span key={r.id} className="ct-key-ripple__ring" style={{ left: r.x, top: r.y }} />
      ))}
    </div>
  );
}
