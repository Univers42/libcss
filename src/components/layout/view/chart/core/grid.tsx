/**
 * @file GridLines
 * @description SVG grid lines overlay for cartesian charts.
 */

import type { ScaleLinear, ScaleBand } from 'd3-scale';
import type { GridLineMode } from '../Chart.types';
import { CLS } from '../Chart.constants';

interface GridLinesProps {
  mode: GridLineMode;
  xScale?: ScaleBand<string> | ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
  innerHeight: number;
  color?: string;
}

export function GridLines({
  mode,
  xScale,
  yScale,
  innerWidth,
  innerHeight,
  color,
}: GridLinesProps) {
  if (mode === 'none') return null;

  const stroke = color ?? 'currentColor';
  // Guard: band scales (horizontal-bar yScale) don't have .ticks()
  const yTicks = 'ticks' in yScale && typeof yScale.ticks === 'function' ? yScale.ticks(6) : [];
  const showH = mode === 'horizontal' || mode === 'both';
  const showV = mode === 'vertical' || mode === 'both';

  // Extract band positions for vertical lines
  const xPositions: number[] = [];
  if (showV && xScale) {
    if ('bandwidth' in xScale) {
      const band = xScale as ScaleBand<string>;
      for (const d of band.domain()) {
        xPositions.push((band(d) ?? 0) + band.bandwidth() / 2);
      }
    } else {
      const linear = xScale as ScaleLinear<number, number>;
      for (const t of linear.ticks(6)) {
        xPositions.push(linear(t));
      }
    }
  }

  return (
    <g className={`${CLS}__grid`}>
      {showH &&
        yTicks.map((tick: number) => (
          <line
            key={`h-${tick}`}
            x1={0}
            x2={innerWidth}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke={stroke}
            strokeOpacity={color ? 1 : 0.15}
            strokeDasharray="4,4"
          />
        ))}
      {showV &&
        xPositions.map((x, i) => (
          <line
            key={`v-${i}`}
            x1={x}
            x2={x}
            y1={0}
            y2={innerHeight}
            stroke={stroke}
            strokeOpacity={color ? 1 : 0.1}
            strokeDasharray="4,4"
          />
        ))}
    </g>
  );
}
