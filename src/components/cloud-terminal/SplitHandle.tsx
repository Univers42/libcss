/**
 * @file SplitHandle.tsx
 * @description Draggable divider between split panes.
 * Handles mouse-drag to resize, double-click to reset ratio to 50%.
 */

import { useCallback, useRef } from 'react';
import { cn } from '../lib/cn';
import type { SplitDirection } from './useSplitPane';

export interface SplitHandleProps {
  readonly direction: SplitDirection;
  readonly onResize: (ratio: number) => void;
  readonly className?: string;
}

export function SplitHandle({ direction, onResize, className = '' }: Readonly<SplitHandleProps>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const handle = containerRef.current;
      if (!handle) return;
      const parent = handle.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const isH = direction === 'horizontal';

      const onMove = (ev: MouseEvent) => {
        const pos = isH ? ev.clientX - rect.left : ev.clientY - rect.top;
        const total = isH ? rect.width : rect.height;
        const ratio = Math.max(0.1, Math.min(0.9, pos / total));
        onResize(ratio);
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = isH ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [direction, onResize],
  );

  const onDoubleClick = useCallback(() => onResize(0.5), [onResize]);

  return (
    <div
      ref={containerRef}
      className={cn('ct-split-handle', `ct-split-handle--${direction}`, className)}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      role="separator"
      aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
      aria-label="Resize pane"
      tabIndex={-1}
    >
      <div className="ct-split-handle__line" />
    </div>
  );
}
