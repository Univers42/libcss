/**
 * @file useChartDimensions
 * @description Responsive hook using ResizeObserver to track container size.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ChartDimensions, ChartMargins } from '../Chart.types';
import { DEFAULT_MARGINS } from '../Chart.constants';

export function useChartDimensions(
  margins: ChartMargins = DEFAULT_MARGINS,
  fallbackWidth = 600,
  fallbackHeight = 360,
): {
  ref: React.RefObject<HTMLDivElement>;
  dimensions: ChartDimensions;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const [size, setSize] = useState({ width: fallbackWidth, height: fallbackHeight });

  const updateSize = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize({ width, height });
      }
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateSize]);

  const dimensions: ChartDimensions = {
    width: size.width,
    height: size.height,
    margins,
    innerWidth: Math.max(0, size.width - margins.left - margins.right),
    innerHeight: Math.max(0, size.height - margins.top - margins.bottom),
  };

  return { ref, dimensions };
}
