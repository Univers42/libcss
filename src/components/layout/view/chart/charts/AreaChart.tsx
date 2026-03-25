/**
 * @file AreaChart
 * @description Single / multi-series area chart — filled region under the line.
 */

import {
  area,
  line,
  curveMonotoneX,
  curveLinear,
  curveStep,
  curveNatural,
  curveCatmullRom,
} from 'd3-shape';
import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type {
  ProcessedDataPoint,
  ProcessedGroupedData,
  ChartDimensions,
  ChartPalette,
  ChartStyle,
  CurveType,
} from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

const CURVE_MAP = {
  monotone: curveMonotoneX,
  linear: curveLinear,
  step: curveStep,
  natural: curveNatural,
  catmullRom: curveCatmullRom,
} as const;

/* ------------------------------------------------------------------ */

interface AreaChartProps {
  data: readonly ProcessedDataPoint[] | readonly ProcessedGroupedData[];
  groupKeys?: string[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'curveType' | 'pointRadius'>>;
  colorScale: (key: string) => string;
  onPointHover?: (label: string, group: string | null, value: number, x: number, y: number) => void;
  onPointLeave?: () => void;
}

function isSingle(d: readonly unknown[]): d is readonly ProcessedDataPoint[] {
  return d.length === 0 || !('groups' in (d[0] as object));
}

export function AreaChart({
  data,
  groupKeys,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onPointHover,
  onPointLeave,
}: AreaChartProps) {
  const { innerHeight, innerWidth } = dimensions;
  const { animate, animationDuration, curveType, pointRadius } = style;
  const curve = CURVE_MAP[curveType as CurveType] ?? curveMonotoneX;
  const halfBand = xScale.bandwidth() / 2;

  /* ---- Single series ---- */
  if (isSingle(data)) {
    const areaGen = area<ProcessedDataPoint>()
      .x((d: ProcessedDataPoint) => (xScale(d.label) ?? 0) + halfBand)
      .y0(innerHeight)
      .y1((d: ProcessedDataPoint) => yScale(d.value))
      .curve(curve);

    const lineGen = line<ProcessedDataPoint>()
      .x((d: ProcessedDataPoint) => (xScale(d.label) ?? 0) + halfBand)
      .y((d: ProcessedDataPoint) => yScale(d.value))
      .curve(curve);

    const fillColor = colorScale('default');

    return (
      <g className={`${CLS}__area-series`}>
        <path
          className={`${CLS}__area-fill`}
          d={areaGen(data as ProcessedDataPoint[]) ?? ''}
          fill={fillColor}
          fillOpacity={0.25}
          style={
            animate
              ? {
                  opacity: 0,
                  animation: `prisma-chart-fade-in ${animationDuration}ms ease-out forwards`,
                }
              : undefined
          }
        />
        <path
          className={`${CLS}__area-stroke`}
          d={lineGen(data as ProcessedDataPoint[]) ?? ''}
          fill="none"
          stroke={fillColor}
          strokeWidth={2}
          style={
            animate
              ? {
                  strokeDasharray: innerWidth,
                  strokeDashoffset: innerWidth,
                  animation: `prisma-chart-draw ${animationDuration}ms ease-out forwards`,
                }
              : undefined
          }
        />
        {data.map((pt, i) => (
          <circle
            key={pt.label}
            className={`${CLS}__point`}
            cx={(xScale(pt.label) ?? 0) + halfBand}
            cy={yScale(pt.value)}
            r={pointRadius}
            fill={fillColor}
            onMouseEnter={(e) => onPointHover?.(pt.label, null, pt.value, e.clientX, e.clientY)}
            onMouseLeave={onPointLeave}
            style={
              animate
                ? {
                    opacity: 0,
                    animation: `prisma-chart-fade-in 200ms ease-out ${i * ENTER_DELAY_PER_ITEM}ms forwards`,
                  }
                : undefined
            }
          />
        ))}
      </g>
    );
  }

  /* ---- Multi-series ---- */
  const keys = groupKeys ?? [];

  return (
    <g className={`${CLS}__area-series`}>
      {keys.map((gk, ki) => {
        const pts = (data as readonly ProcessedGroupedData[]).map((d) => ({
          label: d.label,
          value: d.groups.get(gk) ?? 0,
        }));

        type Pt = { label: string; value: number };

        const areaGen = area<Pt>()
          .x((d: Pt) => (xScale(d.label) ?? 0) + halfBand)
          .y0(innerHeight)
          .y1((d: Pt) => yScale(d.value))
          .curve(curve);

        const lineGen = line<Pt>()
          .x((d: Pt) => (xScale(d.label) ?? 0) + halfBand)
          .y((d: Pt) => yScale(d.value))
          .curve(curve);

        const c = colorScale(gk);

        return (
          <g key={gk}>
            <path
              className={`${CLS}__area-fill`}
              d={areaGen(pts) ?? ''}
              fill={c}
              fillOpacity={0.18}
              style={
                animate
                  ? {
                      opacity: 0,
                      animation: `prisma-chart-fade-in ${animationDuration}ms ease-out ${ki * 120}ms forwards`,
                    }
                  : undefined
              }
            />
            <path
              className={`${CLS}__area-stroke`}
              d={lineGen(pts) ?? ''}
              fill="none"
              stroke={c}
              strokeWidth={2}
              style={
                animate
                  ? {
                      strokeDasharray: innerWidth,
                      strokeDashoffset: innerWidth,
                      animation: `prisma-chart-draw ${animationDuration}ms ease-out ${ki * 120}ms forwards`,
                    }
                  : undefined
              }
            />
            {pts.map((pt, pi) => (
              <circle
                key={pt.label}
                className={`${CLS}__point`}
                cx={(xScale(pt.label) ?? 0) + halfBand}
                cy={yScale(pt.value)}
                r={pointRadius}
                fill={c}
                onMouseEnter={(e) => onPointHover?.(pt.label, gk, pt.value, e.clientX, e.clientY)}
                onMouseLeave={onPointLeave}
                style={
                  animate
                    ? {
                        opacity: 0,
                        animation: `prisma-chart-fade-in 200ms ease-out ${(ki * pts.length + pi) * ENTER_DELAY_PER_ITEM}ms forwards`,
                      }
                    : undefined
                }
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}
