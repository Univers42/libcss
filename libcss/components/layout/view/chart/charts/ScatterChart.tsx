/**
 * @file ScatterChart
 * @description X/Y scatter plot with optional group coloring.
 */

import type { ScaleLinear } from 'd3-scale';
import type {
  ProcessedScatterPoint,
  ChartDimensions,
  ChartPalette,
  ChartStyle,
} from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface ScatterChartProps {
  data: readonly ProcessedScatterPoint[];
  dimensions: ChartDimensions;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'pointRadius'>>;
  colorScale: (key: string) => string;
  onPointHover?: (x: number, y: number, group: string | undefined, cx: number, cy: number) => void;
  onPointLeave?: () => void;
}

export function ScatterChart({
  data,
  dimensions: _dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onPointHover,
  onPointLeave,
}: ScatterChartProps) {
  const { animate, animationDuration, pointRadius } = style;

  return (
    <g className={`${CLS}__scatter`}>
      {data.map((pt, i) => {
        const cx = xScale(pt.x);
        const cy = yScale(pt.y);
        return (
          <circle
            key={`${pt.x}-${pt.y}-${pt.group ?? i}`}
            className={`${CLS}__point ${CLS}__point--scatter`}
            cx={cx}
            cy={cy}
            r={pointRadius}
            fill={colorScale(pt.group ?? 'default')}
            fillOpacity={0.75}
            stroke={colorScale(pt.group ?? 'default')}
            strokeWidth={1}
            onMouseEnter={(e) => onPointHover?.(pt.x, pt.y, pt.group, e.clientX, e.clientY)}
            onMouseLeave={onPointLeave}
            style={
              animate
                ? {
                    opacity: 0,
                    transform: 'scale(0)',
                    transformOrigin: `${cx}px ${cy}px`,
                    animation: `prisma-chart-pop ${animationDuration}ms ease-out ${i * ENTER_DELAY_PER_ITEM}ms forwards`,
                  }
                : undefined
            }
          />
        );
      })}
    </g>
  );
}
