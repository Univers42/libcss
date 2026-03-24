import type { ChartPalette } from '../Chart.types';

export const monochromePalette: ChartPalette = {
  name: 'monochrome',
  colors: [
    '#6366f1', // single accent — indigo
    '#94a3b8', // slate-400
    '#64748b', // slate-500
    '#475569', // slate-600
    '#334155', // slate-700
    '#1e293b', // slate-800
    '#818cf8', // indigo-400 (lighter accent)
    '#cbd5e1', // slate-300
    '#4f46e5', // indigo-600 (darker accent)
    '#e2e8f0', // slate-200
    '#a5b4fc', // indigo-300
    '#0f172a', // slate-900
  ],
  gridColor: 'rgba(148, 163, 184, 0.12)',
  axisColor: 'rgba(148, 163, 184, 0.35)',
  textColor: 'rgba(148, 163, 184, 0.8)',
};
