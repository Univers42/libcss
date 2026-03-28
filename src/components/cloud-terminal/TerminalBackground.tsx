import { cn } from '../lib/cn';
import { type BackgroundEffectId, getBackgroundEffect } from './backgroundEffects';

export interface TerminalBackgroundProps {
  visible?: boolean;
  className?: string;
  /** Which background particle effect to render (default: 'bubbles') */
  effectId?: BackgroundEffectId;
}

/**
 * Atmospheric background with gradient orbs, noise texture,
 * and configurable floating ambient particles.
 *
 * Two layers:
 *  1. Deep background (orbs + noise grid) at z-index 0 — behind all content.
 *  2. Particle overlay at z-index 50 — floats ABOVE sidebar, header,
 *     and terminal so the animation is one continuous shared layer
 *     visible everywhere. pointer-events: none keeps it non-interactive.
 *
 * Pure CSS animations — no JS overhead.
 */
export function TerminalBackground({
  visible = true,
  className = '',
  effectId = 'bubbles',
}: Readonly<TerminalBackgroundProps>) {
  if (!visible) return null;

  const effect = getBackgroundEffect(effectId);
  const particles = Array.from({ length: effect.particleCount }, (_, i) => i + 1);

  return (
    <>
      {/* Layer 1 — deep orbs + grid (z-index 0, behind content) */}
      <div className={cn('ct-bg', className)} aria-hidden="true">
        <div className="ct-bg__orb ct-bg__orb--sky" />
        <div className="ct-bg__orb ct-bg__orb--purple" />
        <div className="ct-bg__orb ct-bg__orb--blue" />
        <div className="ct-bg__noise" />
      </div>

      {/* Layer 2 — shared particle overlay (z-index 50, above all chrome) */}
      {effect.particleCount > 0 && (
        <div className="ct-bg__particles-overlay" aria-hidden="true" data-ct-effect={effectId}>
          {particles.map((n) => (
            <span key={n} className={`ct-bg__particle ct-bg__particle--${n}`} />
          ))}
        </div>
      )}
    </>
  );
}
