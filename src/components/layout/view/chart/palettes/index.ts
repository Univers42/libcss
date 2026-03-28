/**
 * @file Palettes barrel
 * @description 10 root chart color themes + lookup helpers.
 */

import type { ChartPalette, PaletteName } from '../Chart.types';

import { prismaPalette } from './prisma';
import { oceanPalette } from './ocean';
import { forestPalette } from './forest';
import { sunsetPalette } from './sunset';
import { neonPalette } from './neon';
import { pastelPalette } from './pastel';
import { earthPalette } from './earth';
import { monochromePalette } from './monochrome';
import { corporatePalette } from './corporate';
import { contrastPalette } from './contrast';

export { generatePaletteColors, createColorAccessor, colorsAreSimilar } from './generator';

/** All available chart palettes keyed by name. */
export const PALETTES: Record<PaletteName, ChartPalette> = {
  prisma: prismaPalette,
  ocean: oceanPalette,
  forest: forestPalette,
  sunset: sunsetPalette,
  neon: neonPalette,
  pastel: pastelPalette,
  earth: earthPalette,
  monochrome: monochromePalette,
  corporate: corporatePalette,
  contrast: contrastPalette,
};

/** Get a palette by name. Falls back to prisma. */
export function getPalette(name: PaletteName = 'prisma'): ChartPalette {
  return PALETTES[name] ?? PALETTES.prisma;
}

/** Get a single color from a palette by index (wraps around). */
export function getColor(palette: ChartPalette, index: number): string {
  return palette.colors[index % palette.colors.length];
}

/** Array of all palette names. */
export const PALETTE_NAMES: PaletteName[] = Object.keys(PALETTES) as PaletteName[];
