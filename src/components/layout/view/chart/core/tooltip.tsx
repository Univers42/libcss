/**
 * @file ChartTooltip
 * @description Floating tooltip that follows the pointer inside chart SVG.
 */

import { useState, useCallback, type ReactNode } from 'react';
import { CLS, TOOLTIP_OFFSET } from '../Chart.constants';

interface TooltipState {
  x: number;
  y: number;
  content: ReactNode;
  visible: boolean;
}

const INITIAL: TooltipState = { x: 0, y: 0, content: null, visible: false };

export function useTooltip() {
  const [tip, setTip] = useState<TooltipState>(INITIAL);

  const show = useCallback((x: number, y: number, content: ReactNode) => {
    setTip({ x, y, content, visible: true });
  }, []);

  const hide = useCallback(() => {
    setTip(INITIAL);
  }, []);

  return { tip, show, hide };
}

interface ChartTooltipProps {
  x: number;
  y: number;
  visible: boolean;
  children: ReactNode;
}

export function ChartTooltip({ x, y, visible, children }: ChartTooltipProps) {
  if (!visible) return null;

  return (
    <div
      className={`${CLS}__tooltip`}
      style={{
        position: 'absolute',
        left: x + TOOLTIP_OFFSET,
        top: y + TOOLTIP_OFFSET,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}

/** Default tooltip content renderer */
export function DefaultTooltipContent({
  label,
  value,
  group,
  color,
}: {
  label: string;
  value: string | number;
  group?: string;
  color?: string;
}) {
  return (
    <div className={`${CLS}__tooltip-content`}>
      {color && (
        <span
          className={`${CLS}__tooltip-swatch`}
          style={{ backgroundColor: color }}
        />
      )}
      <div className={`${CLS}__tooltip-body`}>
        {group && <span className={`${CLS}__tooltip-group`}>{group}</span>}
        <span className={`${CLS}__tooltip-label`}>{label}</span>
        <span className={`${CLS}__tooltip-value`}>{value}</span>
      </div>
    </div>
  );
}
