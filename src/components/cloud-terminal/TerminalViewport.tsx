import type { RefObject } from 'react';
import { cn } from '../lib/cn';

export interface TerminalViewportProps {
  /** Ref to the div where xterm.js will mount */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Whether this viewport is visible (vs docs/editor overlay) */
  visible?: boolean;
  /** Show scanline CRT effect */
  showScanlines?: boolean;
  className?: string;
}

/**
 * The raw xterm.js viewport container with optional CRT scanline overlay.
 */
export function TerminalViewport({
  containerRef,
  visible = true,
  showScanlines = true,
  className = '',
}: Readonly<TerminalViewportProps>) {
  return (
    <div className={cn('ct-viewport', !visible && 'ct-viewport--hidden', className)}>
      <div ref={containerRef as React.RefObject<HTMLDivElement>} className="ct-viewport__xterm" />
      {showScanlines && <div className="ct-viewport__scanlines" aria-hidden="true" />}
    </div>
  );
}
