/**
 * @file ColorPicker Types
 */

import type { ReactNode } from 'react';
import type { ColorState, GradientStop } from './color-engine';

export type ColorPickerMode =
  | 'map'        // 2D saturation-value grid + hue bar
  | 'wheel'      // HSV colour wheel
  | 'rgb'        // R / G / B / A channel sliders
  | 'hsl'        // H / S / L / A channel sliders
  | 'cmyk'       // C / M / Y / K sliders
  | 'gradient';  // Multi-stop linear gradient editor

export interface ColorPickerProps {
  /** Current color (hex string). */
  value?: string;
  /** Update callback — receives the new hex value. */
  onChange?: (hex: string, state: ColorState) => void;
  /** Which views to offer. Defaults to all 6. */
  modes?: readonly ColorPickerMode[];
  /** Initial mode. */
  defaultMode?: ColorPickerMode;
  /** Show alpha channel controls. */
  showAlpha?: boolean;
  /** Preset swatches. */
  swatches?: readonly string[];
  /** Width. */
  width?: number | string;
  /** Show the WindowPanel chrome (header + tabs). */
  windowed?: boolean;
  /** Window title override. */
  title?: string;
  /** Additional class. */
  className?: string;
  /** Gradient stops (only relevant in 'gradient' mode). */
  gradientStops?: GradientStop[];
  /** Gradient change callback. */
  onGradientChange?: (stops: GradientStop[]) => void;
}

export const MODE_LABELS: Record<ColorPickerMode, { label: string; icon: string }> = {
  map:      { label: 'Map',      icon: '🎯' },
  wheel:    { label: 'Wheel',    icon: '🌈' },
  rgb:      { label: 'RGB',      icon: '🔴' },
  hsl:      { label: 'HSL',      icon: '💠' },
  cmyk:     { label: 'CMYK',     icon: '🖨' },
  gradient: { label: 'Gradient', icon: '🌅' },
};

export const ALL_MODES: ColorPickerMode[] = ['map', 'wheel', 'rgb', 'hsl', 'cmyk', 'gradient'];

export const DEFAULT_SWATCHES = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6',
  '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff',
];
