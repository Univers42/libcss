/**
 * @file CursorFluid.tsx
 * @description Interactive fluid blob that follows the mouse cursor.
 *
 * Renders a soft, glowing orb that smoothly tracks the pointer
 * across the entire terminal surface. Uses CSS transitions for
 * buttery-smooth movement without requestAnimationFrame overhead.
 *
 * Architecture:
 *  - Absolutely positioned at z-index 45 (below particles at 50)
 *  - pointer-events: none so it never interferes with interaction
 *  - Two concentric blobs: a tight bright core + a large diffuse aura
 *  - Hue follows the theme accent via CSS custom properties
 */

import { useRef, useCallback, useEffect, useState } from 'react';

export interface CursorFluidProps {
  /** Whether the effect is enabled */
  enabled?: boolean;
}

export function CursorFluid({ enabled = true }: Readonly<CursorFluidProps>) {
  const blobRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!blobRef.current) return;
    blobRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    if (!visible) setVisible(true);
  }, [visible]);

  const handleLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const handleEnter = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    globalThis.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    return () => {
      globalThis.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [enabled, handleMove, handleLeave, handleEnter]);

  if (!enabled) return null;

  return (
    <div className="ct-cursor-fluid" aria-hidden="true">
      <div
        ref={blobRef}
        className="ct-cursor-fluid__blob"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="ct-cursor-fluid__core" />
        <div className="ct-cursor-fluid__aura" />
        <div className="ct-cursor-fluid__ring" />
      </div>
    </div>
  );
}
