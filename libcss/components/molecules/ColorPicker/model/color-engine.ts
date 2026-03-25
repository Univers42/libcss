/**
 * @file Color Engine
 * @description Pure-function color space conversions and utilities.
 * Supports: HEX, RGB, HSV (HSB), HSL, CMYK.
 * All values are normalised:
 *   H: 0–360   S/V/L: 0–1   R/G/B: 0–255   A: 0–1
 */

// ─── Data structures ───────────────────────────────────

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}
export interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}
export interface HSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}
export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorState {
  hex: string;
  rgb: RGBA;
  hsv: HSVA;
  hsl: HSLA;
  cmyk: CMYK;
}

// ─── Clamp helpers ─────────────────────────────────────

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const round = (v: number, d = 0) => {
  const m = 10 ** d;
  return Math.round(v * m) / m;
};

// ─── HEX ↔ RGB ────────────────────────────────────────

export function hexToRgba(hex: string): RGBA {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0]! + h[0]! + h[1]! + h[1]! + h[2]! + h[2]!;
  if (h.length === 4) h = h[0]! + h[0]! + h[1]! + h[1]! + h[2]! + h[2]! + h[3]! + h[3]!;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

export function rgbaToHex(c: RGBA, includeAlpha = false): string {
  const toH = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  const base = `#${toH(c.r)}${toH(c.g)}${toH(c.b)}`;
  if (!includeAlpha || c.a >= 1) return base;
  return base + toH(c.a * 255);
}

// ─── RGB ↔ HSV ─────────────────────────────────────────

export function rgbaToHsva(c: RGBA): HSVA {
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const s = max === 0 ? 0 : d / max;
  return { h: round(h, 1), s: round(s, 4), v: round(max, 4), a: c.a };
}

export function hsvaToRgba(c: HSVA): RGBA {
  const h = c.h / 60;
  const s = c.s,
    v = c.v;
  const i = Math.floor(h) % 6;
  const f = h - Math.floor(h);
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  let r: number, g: number, b2: number;
  switch (i) {
    case 0:
      r = v;
      g = t;
      b2 = p;
      break;
    case 1:
      r = q;
      g = v;
      b2 = p;
      break;
    case 2:
      r = p;
      g = v;
      b2 = t;
      break;
    case 3:
      r = p;
      g = q;
      b2 = v;
      break;
    case 4:
      r = t;
      g = p;
      b2 = v;
      break;
    default:
      r = v;
      g = p;
      b2 = q;
      break;
  }
  return {
    r: clamp(Math.round(r * 255), 0, 255),
    g: clamp(Math.round(g * 255), 0, 255),
    b: clamp(Math.round(b2 * 255), 0, 255),
    a: c.a,
  };
}

// ─── HSV ↔ HSL ─────────────────────────────────────────

export function hsvaToHsla(c: HSVA): HSLA {
  const l = c.v * (1 - c.s / 2);
  const s = l === 0 || l === 1 ? 0 : (c.v - l) / Math.min(l, 1 - l);
  return { h: c.h, s: round(s, 4), l: round(l, 4), a: c.a };
}

export function hslaToHsva(c: HSLA): HSVA {
  const v = c.l + c.s * Math.min(c.l, 1 - c.l);
  const s = v === 0 ? 0 : 2 * (1 - c.l / v);
  return { h: c.h, s: round(s, 4), v: round(v, 4), a: c.a };
}

// ─── RGB ↔ CMYK ────────────────────────────────────────

export function rgbaToCmyk(c: RGBA): CMYK {
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };
  return {
    c: round((1 - r - k) / (1 - k), 4),
    m: round((1 - g - k) / (1 - k), 4),
    y: round((1 - b - k) / (1 - k), 4),
    k: round(k, 4),
  };
}

export function cmykToRgba(c: CMYK, a = 1): RGBA {
  return {
    r: clamp(Math.round(255 * (1 - c.c) * (1 - c.k)), 0, 255),
    g: clamp(Math.round(255 * (1 - c.m) * (1 - c.k)), 0, 255),
    b: clamp(Math.round(255 * (1 - c.y) * (1 - c.k)), 0, 255),
    a,
  };
}

// ─── Master builder — from any partial ─────────────────

export function colorFromHex(hex: string): ColorState {
  const rgb = hexToRgba(hex);
  const hsv = rgbaToHsva(rgb);
  const hsl = hsvaToHsla(hsv);
  const cmyk = rgbaToCmyk(rgb);
  return { hex: rgbaToHex(rgb), rgb, hsv, hsl, cmyk };
}

export function colorFromHsva(hsv: HSVA): ColorState {
  const rgb = hsvaToRgba(hsv);
  const hsl = hsvaToHsla(hsv);
  const cmyk = rgbaToCmyk(rgb);
  return { hex: rgbaToHex(rgb), rgb, hsv, hsl, cmyk };
}

export function colorFromRgba(rgba: RGBA): ColorState {
  const hsv = rgbaToHsva(rgba);
  const hsl = hsvaToHsla(hsv);
  const cmyk = rgbaToCmyk(rgba);
  return { hex: rgbaToHex(rgba), rgb: rgba, hsv, hsl, cmyk };
}

export function colorFromHsla(hsl: HSLA): ColorState {
  const hsv = hslaToHsva(hsl);
  const rgb = hsvaToRgba(hsv);
  const cmyk = rgbaToCmyk(rgb);
  return { hex: rgbaToHex(rgb), rgb, hsv, hsl, cmyk };
}

// ─── Formatting helpers ────────────────────────────────

export function formatRgb(c: RGBA): string {
  return c.a < 1 ? `rgba(${c.r}, ${c.g}, ${c.b}, ${round(c.a, 2)})` : `rgb(${c.r}, ${c.g}, ${c.b})`;
}

export function formatHsl(c: HSLA): string {
  return c.a < 1
    ? `hsla(${round(c.h)}°, ${round(c.s * 100)}%, ${round(c.l * 100)}%, ${round(c.a, 2)})`
    : `hsl(${round(c.h)}°, ${round(c.s * 100)}%, ${round(c.l * 100)}%)`;
}

export function formatCmyk(c: CMYK): string {
  return `cmyk(${round(c.c * 100)}%, ${round(c.m * 100)}%, ${round(c.y * 100)}%, ${round(c.k * 100)}%)`;
}

// ─── Gradient helpers ──────────────────────────────────

export interface GradientStop {
  color: string;
  position: number; // 0–100
}

export function buildGradientCSS(stops: readonly GradientStop[], angle = 90): string {
  const parts = stops
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`);
  return `linear-gradient(${angle}deg, ${parts.join(', ')})`;
}

// ─── Contrast helpers ──────────────────────────────────

export function luminance(c: RGBA): number {
  const [rs, gs, bs] = [c.r / 255, c.g / 255, c.b / 255].map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

export function contrastRatio(c1: RGBA, c2: RGBA): number {
  const l1 = luminance(c1) + 0.05;
  const l2 = luminance(c2) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}
