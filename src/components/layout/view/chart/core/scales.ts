/**
 * @file Scale factories
 * @description Wrappers around D3 scale constructors for chart usage.
 */

import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import type { ScaleBand, ScaleLinear, ScaleOrdinal } from 'd3-scale';
import type { ChartPalette } from '../Chart.types';

export function createBandScale(
  domain: string[],
  range: [number, number],
  padding = 0.2,
): ScaleBand<string> {
  return scaleBand<string>().domain(domain).range(range).padding(padding);
}

export function createLinearScale(
  domain: [number, number],
  range: [number, number],
  nice = true,
): ScaleLinear<number, number> {
  const s = scaleLinear().domain(domain).range(range);
  return nice ? s.nice() : s;
}

export function createColorScale(
  domain: string[],
  palette: ChartPalette,
): ScaleOrdinal<string, string> {
  return scaleOrdinal<string, string>()
    .domain(domain)
    .range(palette.colors as string[]);
}

/** Compute a nice domain [min, max] from numeric data. */
export function computeDomain(
  values: number[],
  padRatio = 0.05,
): [number, number] {
  if (values.length === 0) return [0, 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * padRatio || 1;
  return [Math.min(0, min - pad), max + pad];
}
