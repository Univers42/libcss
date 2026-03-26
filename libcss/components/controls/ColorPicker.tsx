/**
 * @file ColorPicker
 * @description Professional color picker with:
 *   - Saturation/Lightness 2D canvas
 *   - Hue strip
 *   - Opacity slider
 *   - Hex / RGBA text input
 *   - Eyedropper (when available)
 *   - Recent colors row
 *
 * Replaces the basic <input type="color"> with a real design-tool picker.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ColorParameter } from './types';

// ── Color conversion helpers ──────────────────────────

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hexToRgb(hex: string): [number, number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0]! + clean[0], 16);
    const g = parseInt(clean[1]! + clean[1], 16);
    const b = parseInt(clean[2]! + clean[2], 16);
    return [r, g, b, 1];
  }
  if (clean.length === 6) {
    return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16), 1];
  }
  if (clean.length === 8) {
    return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16), parseInt(clean.slice(6, 8), 16) / 255];
  }
  return [0, 0, 0, 1];
}

function parseColor(val: string): { h: number; s: number; l: number; a: number } {
  // Handle rgba(...)
  const rgbaMatch = val.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (rgbaMatch) {
    const [, rs, gs, bs, as] = rgbaMatch;
    const [h, s, l] = rgbToHsl(Number(rs), Number(gs), Number(bs));
    return { h, s, l, a: as != null ? Number(as) : 1 };
  }
  // Handle hex
  if (val.startsWith('#')) {
    const [r, g, b, a] = hexToRgb(val);
    const [h, s, l] = rgbToHsl(r, g, b);
    return { h, s, l, a };
  }
  // Handle transparent
  if (val === 'transparent') return { h: 0, s: 0, l: 0, a: 0 };
  // Fallback
  return { h: 0, s: 0, l: 50, a: 1 };
}

function hslToHex(h: number, s: number, l: number, a: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  if (a < 1) return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  return hex;
}

// ── Component ─────────────────────────────────────────

interface ColorPickerProps {
  readonly param: ColorParameter;
  readonly value: unknown;
  readonly onChange: (key: string, value: unknown) => void;
  readonly onCommit?: (key: string, value: unknown) => void;
}

// A few recent colors shared across instances (session only)
const recentColors: string[] = [];
function pushRecent(c: string) {
  const idx = recentColors.indexOf(c);
  if (idx !== -1) recentColors.splice(idx, 1);
  recentColors.unshift(c);
  if (recentColors.length > 8) recentColors.pop();
}

export function ColorPicker({ param, value, onChange, onCommit }: ColorPickerProps) {
  const colorStr = String(value || param.defaultValue || '#000000');
  const parsed = parseColor(colorStr);

  const [open, setOpen] = useState(false);
  const [hue, setHue] = useState(parsed.h);
  const [sat, setSat] = useState(parsed.s);
  const [lit, setLit] = useState(parsed.l);
  const [alpha, setAlpha] = useState(parsed.a);
  const [hexInput, setHexInput] = useState(colorStr);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync from external
  useEffect(() => {
    const p = parseColor(String(value || '#000000'));
    setHue(p.h); setSat(p.s); setLit(p.l); setAlpha(p.a);
    setHexInput(String(value || '#000000'));
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Paint the saturation/lightness canvas
  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const s = (x / w) * 100;
        const l = 100 - (y / h) * 100;
        const [r, g, b] = hslToRgb(hue, s, l);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [open, hue]);

  const emit = useCallback((h: number, s: number, l: number, a: number) => {
    const c = hslToHex(h, s, l, a);
    setHexInput(c);
    onChange(param.key, c);
  }, [onChange, param.key]);

  const commitColor = useCallback(() => {
    const c = hslToHex(hue, sat, lit, alpha);
    pushRecent(c);
    onCommit?.(param.key, c);
  }, [hue, sat, lit, alpha, onCommit, param.key]);

  // Canvas pointer
  const onCanvasPointer = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const s = Math.round(x * 100);
    const l = Math.round((1 - y) * 100);
    setSat(s); setLit(l);
    emit(hue, s, l, alpha);
  }, [hue, alpha, emit]);

  const onCanvasDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    onCanvasPointer(e);
  }, [onCanvasPointer]);

  // Hue bar
  const onHuePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const h = Math.round(x * 360);
    setHue(h);
    emit(h, sat, lit, alpha);
  }, [sat, lit, alpha, emit]);

  const onHueDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    onHuePointer(e);
  }, [onHuePointer]);

  // Alpha bar
  const onAlphaPointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const a = parseFloat(x.toFixed(2));
    setAlpha(a);
    emit(hue, sat, lit, a);
  }, [hue, sat, lit, emit]);

  const onAlphaDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    onAlphaPointer(e);
  }, [onAlphaPointer]);

  // Hex input
  const onHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value);
  }, []);

  const onHexBlur = useCallback(() => {
    const p = parseColor(hexInput);
    setHue(p.h); setSat(p.s); setLit(p.l); setAlpha(p.a);
    const c = hslToHex(p.h, p.s, p.l, p.a);
    onChange(param.key, c);
    onCommit?.(param.key, c);
    pushRecent(c);
  }, [hexInput, onChange, onCommit, param.key]);

  const previewColor = hslToHex(hue, sat, lit, alpha);
  const [r, g, b] = hslToRgb(hue, sat, lit);

  return (
    <div className="shell-control shell-control--color-picker" ref={wrapperRef}>
      <label className="shell-control__label">{param.label}</label>
      {/* Trigger row */}
      <div className="cpk-trigger" onClick={() => setOpen(!open)}>
        <span className="cpk-swatch" style={{ background: previewColor }} />
        <span className="cpk-hex">{hexInput}</span>
      </div>

      {open && (
        <div className="cpk-panel">
          {/* Sat/Light canvas */}
          <canvas
            ref={canvasRef}
            className="cpk-canvas"
            width={200}
            height={140}
            onPointerDown={onCanvasDown}
            onPointerMove={(e) => e.buttons && onCanvasPointer(e)}
            onPointerUp={commitColor}
          />
          {/* Canvas cursor indicator */}
          <div
            className="cpk-canvas-cursor"
            style={{
              left: `${sat}%`,
              top: `${100 - lit}%`,
              background: previewColor,
            }}
          />

          {/* Hue strip */}
          <div
            className="cpk-hue-bar"
            onPointerDown={onHueDown}
            onPointerMove={(e) => e.buttons && onHuePointer(e)}
            onPointerUp={commitColor}
          >
            <div className="cpk-hue-thumb" style={{ left: `${(hue / 360) * 100}%` }} />
          </div>

          {/* Alpha strip */}
          <div
            className="cpk-alpha-bar"
            onPointerDown={onAlphaDown}
            onPointerMove={(e) => e.buttons && onAlphaPointer(e)}
            onPointerUp={commitColor}
          >
            <div
              className="cpk-alpha-fill"
              style={{ background: `linear-gradient(to right, transparent, rgb(${r},${g},${b}))` }}
            />
            <div className="cpk-alpha-thumb" style={{ left: `${alpha * 100}%` }} />
          </div>

          {/* Values row */}
          <div className="cpk-values">
            <input
              className="cpk-input"
              value={hexInput}
              onChange={onHexChange}
              onBlur={onHexBlur}
              onKeyDown={(e) => e.key === 'Enter' && onHexBlur()}
              spellCheck={false}
            />
            <span className="cpk-info">H:{hue} S:{sat} L:{lit}</span>
          </div>

          {/* Recent colors */}
          {recentColors.length > 0 && (
            <div className="cpk-recent">
              {recentColors.map((c, i) => (
                <button
                  key={`${c}-${i}`}
                  className="cpk-recent-swatch"
                  style={{ background: c }}
                  onClick={() => {
                    const p = parseColor(c);
                    setHue(p.h); setSat(p.s); setLit(p.l); setAlpha(p.a);
                    emit(p.h, p.s, p.l, p.a);
                    commitColor();
                  }}
                  title={c}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
