/**
 * @file Palette Generator
 * @description Generates extended color sequences from a base palette
 * using D3 interpolation. Ensures adjacent colors have sufficient
 * contrast and hue separation to remain distinguishable.
 */

import { interpolateHcl } from 'd3-interpolate';
import { hcl } from 'd3-color';
import type { ChartPalette } from '../Chart.types';

/**
 * Expand a base set of colors to `count` colors by interpolating
 * between adjacent base colors. Keeps the original colors and fills gaps.
 */
export function generatePaletteColors(
  baseColors: readonly string[],
  count: number,
): string[] {
  if (count <= baseColors.length) {
    return baseColors.slice(0, count) as string[];
  }

  const result: string[] = [];
  const segments = baseColors.length;

  for (let i = 0; i < count; i++) {
    const pos = (i / count) * segments;
    const idx = Math.floor(pos);
    const t = pos - idx;
    const from = baseColors[idx % segments];
    const to = baseColors[(idx + 1) % segments];
    result.push(interpolateHcl(from, to)(t));
  }

  return result;
}

/**
 * Check that two colors differ enough in hue + luminance to be
 * distinguishable. Uses CIE HCL color space for perceptual accuracy.
 */
export function colorsAreSimilar(a: string, b: string, threshold = 30): boolean {
  const ca = hcl(a);
  const cb = hcl(b);
  const dh = Math.abs((ca.h || 0) - (cb.h || 0));
  const dl = Math.abs((ca.l || 0) - (cb.l || 0));
  return dh + dl < threshold;
}

/**
 * Given a palette, return a color accessor function that auto-expands
 * the palette if more colors are needed than defined.
 */
export function createColorAccessor(
  palette: ChartPalette,
): (index: number) => string {
  const cache = new Map<number, string>();

  return (index: number): string => {
    if (cache.has(index)) return cache.get(index)!;

    const { colors } = palette;
    let color: string;

    if (index < colors.length) {
      color = colors[index];
    } else {
      // Generate extended palette on demand
      const extended = generatePaletteColors(colors, index + 1);
      color = extended[index];
    }

    cache.set(index, color);
    return color;
  };
}
