/**
 * @file useColorState
 * @description Central state hook for the colour picker.
 * Manages a single source of truth and recalculates all
 * colour spaces on change.
 */

import { useState, useCallback, useRef } from 'react';
import type { HSVA, RGBA, HSLA, ColorState } from './color-engine';
import { colorFromHex, colorFromHsva, colorFromRgba, colorFromHsla } from './color-engine';

export function useColorState(initialHex = '#3b82f6') {
  const [color, setColor] = useState<ColorState>(() => colorFromHex(initialHex));
  const onChangeRef = useRef<((hex: string, state: ColorState) => void) | undefined>();

  const emit = useCallback((next: ColorState) => {
    setColor(next);
    onChangeRef.current?.(next.hex, next);
  }, []);

  const setHex = useCallback((hex: string) => emit(colorFromHex(hex)), [emit]);
  const setHsva = useCallback((hsv: HSVA) => emit(colorFromHsva(hsv)), [emit]);
  const setRgba = useCallback((rgba: RGBA) => emit(colorFromRgba(rgba)), [emit]);
  const setHsla = useCallback((hsl: HSLA) => emit(colorFromHsla(hsl)), [emit]);

  const setHue = useCallback(
    (h: number) => emit(colorFromHsva({ ...color.hsv, h })),
    [emit, color.hsv],
  );

  const setAlpha = useCallback(
    (a: number) => emit(colorFromHsva({ ...color.hsv, a })),
    [emit, color.hsv],
  );

  return {
    color,
    setHex,
    setHsva,
    setRgba,
    setHsla,
    setHue,
    setAlpha,
    onChangeRef,
  };
}
