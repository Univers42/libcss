/**
 * @file Axes
 * @description React SVG axis components powered by D3 axis generators.
 */

import { useRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import type { ScaleBand, ScaleLinear } from 'd3-scale';
import { CLS, MAX_TICK_LABEL_LENGTH } from '../Chart.constants';

interface XAxisProps {
  scale: ScaleBand<string> | ScaleLinear<number, number>;
  height: number;
  label?: string;
  showLabel?: boolean;
  color?: string;
  innerWidth?: number;
}

export function XAxis({ scale, height, label, showLabel = true, color, innerWidth }: XAxisProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const g = select(ref.current);
    g.selectAll('*').remove();

    const axis = axisBottom(scale as any).tickSizeOuter(0);

    // Limit tick count for linear scales
    if ('ticks' in scale) {
      axis.ticks(Math.min(10, Math.max(3, Math.round((innerWidth ?? 300) / 80))));
    }

    g.call(axis as any);

    // Style ticks
    g.selectAll('.tick text')
      .attr('fill', color ?? 'currentColor')
      .attr('font-size', '11px')
      .each(function (this: any) {
        const el = select(this as SVGTextElement);
        const text = el.text();
        if (text.length > MAX_TICK_LABEL_LENGTH) {
          el.text(text.slice(0, MAX_TICK_LABEL_LENGTH - 1) + '…');
        }
      });

    g.selectAll('.tick line')
      .attr('stroke', color ?? 'currentColor')
      .attr('opacity', 0.3);
    g.select('.domain')
      .attr('stroke', color ?? 'currentColor')
      .attr('opacity', 0.3);
  }, [scale, color, innerWidth]);

  return (
    <g ref={ref} className={`${CLS}__x-axis`} transform={`translate(0,${height})`}>
      {showLabel && label && (
        <text
          x={(innerWidth ?? 300) / 2}
          y={35}
          textAnchor="middle"
          fill={color ?? 'currentColor'}
          fontSize="12px"
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </g>
  );
}

interface YAxisProps {
  scale: ScaleLinear<number, number>;
  label?: string;
  showLabel?: boolean;
  color?: string;
  innerHeight?: number;
}

export function YAxis({ scale, label, showLabel = true, color, innerHeight }: YAxisProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const g = select(ref.current);
    g.selectAll('*').remove();

    const axis = axisLeft(scale)
      .tickSizeOuter(0)
      .ticks(Math.min(8, Math.max(3, Math.round((innerHeight ?? 300) / 60))));

    g.call(axis);

    g.selectAll('.tick text')
      .attr('fill', color ?? 'currentColor')
      .attr('font-size', '11px');
    g.selectAll('.tick line')
      .attr('stroke', color ?? 'currentColor')
      .attr('opacity', 0.3);
    g.select('.domain')
      .attr('stroke', color ?? 'currentColor')
      .attr('opacity', 0.3);
  }, [scale, color, innerHeight]);

  return (
    <g ref={ref} className={`${CLS}__y-axis`}>
      {showLabel && label && (
        <text
          transform="rotate(-90)"
          x={-((innerHeight ?? 300) / 2)}
          y={-40}
          textAnchor="middle"
          fill={color ?? 'currentColor'}
          fontSize="12px"
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </g>
  );
}
