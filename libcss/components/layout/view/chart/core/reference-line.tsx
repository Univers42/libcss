/**
 * @file ReferenceLine
 * @description Horizontal or vertical reference line marker on a chart.
 */

import { CLS } from '../Chart.constants';
import type { ScaleLinear } from 'd3-scale';

interface ReferenceLineProps {
  value: number;
  label?: string;
  color?: string;
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
}

export function ReferenceLine({
  value,
  label,
  color = '#ef4444',
  yScale,
  innerWidth,
}: ReferenceLineProps) {
  const y = yScale(value);
  if (y == null || !isFinite(y)) return null;

  return (
    <g className={`${CLS}__reference-line`}>
      <line
        x1={0}
        x2={innerWidth}
        y1={y}
        y2={y}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="6,4"
        opacity={0.7}
      />
      {label && (
        <text x={innerWidth + 4} y={y + 4} fill={color} fontSize="11px" fontWeight={500}>
          {label}
        </text>
      )}
    </g>
  );
}
