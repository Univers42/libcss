/**
 * @file HorizontalBarChart
 * @description Horizontal bar chart — axes swapped from vertical bar.
 */

import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { ProcessedDataPoint, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface HorizontalBarChartProps {
  data: readonly ProcessedDataPoint[];
  dimensions: ChartDimensions;
  yScale: ScaleBand<string>;
  xScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'dataLabels' | 'barRadius'>>;
  colorScale: (key: string) => string;
  onBarHover?: (point: ProcessedDataPoint, x: number, y: number) => void;
  onBarLeave?: () => void;
  onBarClick?: (point: ProcessedDataPoint) => void;
}

export function HorizontalBarChart({
  data,
  yScale,
  xScale,
  style,
  colorScale,
  onBarHover,
  onBarLeave,
  onBarClick,
}: HorizontalBarChartProps) {
  const { animate, animationDuration, dataLabels, barRadius } = style;

  return (
    <g className={`${CLS}__horizontal-bars`}>
      {data.map((d, i) => {
        const y = yScale(d.label) ?? 0;
        const h = yScale.bandwidth();
        const w = Math.max(0, xScale(d.value));

        return (
          <g key={d.label}>
            <rect
              className={`${CLS}__bar ${CLS}__bar--horizontal`}
              x={0}
              y={y}
              width={w}
              height={h}
              rx={barRadius}
              ry={barRadius}
              fill={colorScale(d.label)}
              onMouseEnter={(e) => onBarHover?.(d, e.clientX, e.clientY)}
              onMouseLeave={onBarLeave}
              onClick={() => onBarClick?.(d)}
              style={
                animate
                  ? {
                      animation: `prisma-chart-bar-grow-h ${animationDuration}ms ease-out ${i * ENTER_DELAY_PER_ITEM}ms both`,
                    }
                  : undefined
              }
            />
            {dataLabels && (
              <text
                x={animate ? 8 : w + 8}
                y={y + h / 2}
                dy="0.35em"
                fill="currentColor"
                fontSize="11px"
                fontWeight={500}
                opacity={animate ? 0 : 1}
                style={
                  animate
                    ? {
                        animation: `prisma-chart-fade-in ${animationDuration}ms ease-out ${i * ENTER_DELAY_PER_ITEM + animationDuration}ms forwards`,
                      }
                    : undefined
                }
              >
                {d.value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
