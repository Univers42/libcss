/**
 * @file StackedBarChart
 * @description Stacked vertical bar chart — segments stacked per category.
 */

import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { ProcessedGroupedData, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface StackedBarChartProps {
  data: readonly ProcessedGroupedData[];
  groupKeys: string[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'barRadius'>>;
  colorScale: (key: string) => string;
  onBarHover?: (label: string, group: string, value: number, x: number, y: number) => void;
  onBarLeave?: () => void;
}

export function StackedBarChart({
  data,
  groupKeys,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onBarHover,
  onBarLeave,
}: StackedBarChartProps) {
  const { innerHeight } = dimensions;
  const { animate, animationDuration, barRadius } = style;

  return (
    <g className={`${CLS}__stacked-bars`}>
      {data.map((d, di) => {
        const x = xScale(d.label) ?? 0;
        const w = xScale.bandwidth();
        let cumY = innerHeight; // start from bottom

        return (
          <g key={d.label}>
            {groupKeys.map((gk, gi) => {
              const val = d.groups.get(gk) ?? 0;
              if (val === 0) return null;
              const segH = Math.max(0, innerHeight - yScale(val));
              cumY -= segH;
              const segY = cumY;
              const isTop = gi === groupKeys.length - 1 || groupKeys.slice(gi + 1).every((k) => (d.groups.get(k) ?? 0) === 0);

              return (
                <rect
                  key={gk}
                  className={`${CLS}__bar ${CLS}__bar--stacked`}
                  x={x}
                  y={segY}
                  width={w}
                  height={segH}
                  rx={isTop ? barRadius : 0}
                  ry={isTop ? barRadius : 0}
                  fill={colorScale(gk)}
                  onMouseEnter={(e) => onBarHover?.(d.label, gk, val, e.clientX, e.clientY)}
                  onMouseLeave={onBarLeave}
                  style={
                    animate
                      ? {
                          animation: `prisma-chart-bar-grow ${animationDuration}ms ease-out ${(di * groupKeys.length + gi) * ENTER_DELAY_PER_ITEM}ms both`,
                        }
                      : undefined
                  }
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
