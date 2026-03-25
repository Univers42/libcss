/**
 * @file ColorPicker
 * @description Professional multi-mode colour picker.
 * Wraps all sub-views inside a WindowPanel with tabs.
 * Modes: Map, Wheel, RGB, HSL, CMYK, Gradient.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { WindowTab } from '../../WindowPanel/model/WindowPanel.types';
import { WindowPanel } from '../../WindowPanel/ui/WindowPanel';
import type { ColorPickerProps, ColorPickerMode } from '../model/ColorPicker.types';
import { ALL_MODES, MODE_LABELS, DEFAULT_SWATCHES } from '../model/ColorPicker.types';
import type { GradientStop } from '../model/color-engine';
import { colorFromRgba, rgbaToHex, cmykToRgba, colorFromHsva } from '../model/color-engine';
import { useColorState } from '../model/useColorState';

import { SaturationMap } from './SaturationMap';
import { HueStrip } from './HueStrip';
import { AlphaStrip } from './AlphaStrip';
import { ColorWheel } from './ColorWheel';
import { RGBSliders } from './RGBSliders';
import { HSLSliders } from './HSLSliders';
import { CMYKSliders } from './CMYKSliders';
import { GradientPicker } from './GradientPicker';
import { SwatchBar } from './SwatchBar';
import { ColorInput } from './ColorInput';

export function ColorPicker({
  value = '#3b82f6',
  onChange,
  modes = ALL_MODES,
  defaultMode,
  showAlpha = true,
  swatches = DEFAULT_SWATCHES,
  width = 380,
  windowed = true,
  title = 'Colour Picker',
  className,
  gradientStops: externalStops,
  onGradientChange,
}: ColorPickerProps) {
  const { color, setHex, setHsva, setRgba, setHsla, setHue, setAlpha, onChangeRef } =
    useColorState(value);

  // Wire external onChange
  useEffect(() => { onChangeRef.current = onChange; }, [onChange, onChangeRef]);

  // Sync external controlled value
  useEffect(() => { if (value !== color.hex) setHex(value); }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Gradient state ── */
  const [internalStops, setInternalStops] = useState<GradientStop[]>([
    { color: '#000000', position: 0 },
    { color: '#ffffff', position: 100 },
  ]);
  const [gradientSelectedIdx, setGradientSelectedIdx] = useState(0);

  const stops = externalStops ?? internalStops;
  const dispatchStops = useCallback(
    (next: GradientStop[]) => {
      if (onGradientChange) onGradientChange(next);
      else setInternalStops(next);
    },
    [onGradientChange],
  );

  // When user picks a colour in gradient mode, update stop colour
  const handleGradientColorFromPicker = useCallback(
    (hex: string) => {
      const next = stops.map((s, i) => (i === gradientSelectedIdx ? { ...s, color: hex } : s));
      dispatchStops(next);
    },
    [stops, gradientSelectedIdx, dispatchStops],
  );

  /* ── Build view content per mode ── */
  const buildMapView = useMemo(
    (): ReactNode => (
      <div className="cpk-view cpk-view--map">
        <SaturationMap color={color} onChange={setHsva} />
        <HueStrip hue={color.hsv.h} onChange={setHue} />
        {showAlpha && (
          <AlphaStrip
            alpha={color.hsv.a}
            color={rgbaToHex({ ...color.rgb, a: 1 })}
            onChange={setAlpha}
          />
        )}
      </div>
    ),
    [color, setHsva, setHue, setAlpha, showAlpha],
  );

  const buildWheelView = useMemo(
    (): ReactNode => (
      <div className="cpk-view cpk-view--wheel">
        <ColorWheel color={color} onChange={setHsva} />
        {showAlpha && (
          <AlphaStrip
            alpha={color.hsv.a}
            color={rgbaToHex({ ...color.rgb, a: 1 })}
            onChange={setAlpha}
          />
        )}
      </div>
    ),
    [color, setHsva, setAlpha, showAlpha],
  );

  const buildRgbView = useMemo(
    (): ReactNode => (
      <div className="cpk-view cpk-view--rgb">
        <RGBSliders color={color} onChange={setRgba} showAlpha={showAlpha} />
      </div>
    ),
    [color, setRgba, showAlpha],
  );

  const buildHslView = useMemo(
    (): ReactNode => (
      <div className="cpk-view cpk-view--hsl">
        <HSLSliders color={color} onChange={setHsla} showAlpha={showAlpha} />
      </div>
    ),
    [color, setHsla, showAlpha],
  );

  const buildCmykView = useMemo(
    (): ReactNode => {
      const handleCmyk = (cmyk: typeof color.cmyk) => {
        const rgba = cmykToRgba(cmyk, color.rgb.a);
        setRgba(rgba);
      };
      return (
        <div className="cpk-view cpk-view--cmyk">
          <CMYKSliders color={color} onChange={handleCmyk} />
        </div>
      );
    },
    [color, setRgba],
  );

  const buildGradientView = useMemo(
    (): ReactNode => (
      <div className="cpk-view cpk-view--gradient">
        <GradientPicker
          stops={stops}
          onChange={dispatchStops}
          selectedIndex={gradientSelectedIdx}
          onSelect={(idx) => {
            setGradientSelectedIdx(idx);
            const stop = stops[idx];
            if (stop) setHex(stop.color);
          }}
          currentHex={color.hex}
        />
        <SaturationMap color={color} onChange={(hsv) => {
          setHsva(hsv);
          handleGradientColorFromPicker(rgbaToHex({ ...colorFromHsva(hsv).rgb, a: 1 }));
        }} />
        <HueStrip hue={color.hsv.h} onChange={(h) => {
          setHue(h);
          const next = colorFromHsva({ ...color.hsv, h });
          handleGradientColorFromPicker(rgbaToHex({ ...next.rgb, a: 1 }));
        }} />
      </div>
    ),
    [color, stops, gradientSelectedIdx, setHex, setHsva, setHue, dispatchStops, handleGradientColorFromPicker],
  );

  const viewMap: Record<ColorPickerMode, ReactNode> = {
    map: buildMapView,
    wheel: buildWheelView,
    rgb: buildRgbView,
    hsl: buildHslView,
    cmyk: buildCmykView,
    gradient: buildGradientView,
  };

  /* ── Footer ── */
  const footer = (
    <div className="cpk-footer">
      <ColorInput color={color} onHexChange={setHex} />
      {swatches.length > 0 && (
        <SwatchBar swatches={swatches} currentHex={color.hex} onSelect={setHex} />
      )}
    </div>
  );

  /* ── Status bar ── */
  const status = (
    <span className="cpk-status">
      {color.hex} · rgb({color.rgb.r},{color.rgb.g},{color.rgb.b})
    </span>
  );

  /* ── Tabs ── */
  const tabs: WindowTab[] = (modes as ColorPickerMode[]).map((mode) => ({
    id: mode,
    label: MODE_LABELS[mode].label,
    icon: MODE_LABELS[mode].icon,
    content: viewMap[mode],
  }));

  /* ── Render ── */
  if (!windowed) {
    // Headless mode — just render current mode view + footer
    const initial = defaultMode ?? modes[0] ?? 'map';
    return (
      <div className={`cpk${className ? ` ${className}` : ''}`} style={{ width }}>
        {viewMap[initial]}
        {footer}
      </div>
    );
  }

  return (
    <WindowPanel
      title={title}
      icon="🎨"
      tabs={tabs}
      activeTab={defaultMode}
      width={width}
      className={`cpk${className ? ` ${className}` : ''}`}
      compact
      footer={footer}
      statusBar={status}
    />
  );
}
