/**
 * @file RGBSliders
 * @description R, G, B (0-255) + optional A (0-1) channel sliders.
 */

import type { ColorState, RGBA } from '../model/color-engine';
import { ChannelSlider } from './ChannelSlider';

interface RGBSlidersProps {
  color: ColorState;
  onChange: (rgba: RGBA) => void;
  showAlpha?: boolean;
}

function grad(r: number, g: number, b: number, channel: 'r' | 'g' | 'b'): string {
  const from =
    channel === 'r'
      ? `rgb(0,${g},${b})`
      : channel === 'g'
        ? `rgb(${r},0,${b})`
        : `rgb(${r},${g},0)`;
  const to =
    channel === 'r'
      ? `rgb(255,${g},${b})`
      : channel === 'g'
        ? `rgb(${r},255,${b})`
        : `rgb(${r},${g},255)`;
  return `linear-gradient(90deg, ${from}, ${to})`;
}

export function RGBSliders({ color, onChange, showAlpha = true }: RGBSlidersProps) {
  const { r, g, b, a } = color.rgb;

  return (
    <div className="cpk-sliders">
      <ChannelSlider
        label="R"
        value={r}
        min={0}
        max={255}
        gradient={grad(r, g, b, 'r')}
        onChange={(v) => onChange({ r: v, g, b, a })}
      />
      <ChannelSlider
        label="G"
        value={g}
        min={0}
        max={255}
        gradient={grad(r, g, b, 'g')}
        onChange={(v) => onChange({ r, g: v, b, a })}
      />
      <ChannelSlider
        label="B"
        value={b}
        min={0}
        max={255}
        gradient={grad(r, g, b, 'b')}
        onChange={(v) => onChange({ r, g, b: v, a })}
      />
      {showAlpha && (
        <ChannelSlider
          label="A"
          value={a}
          min={0}
          max={1}
          decimals={2}
          gradient={`linear-gradient(90deg, rgba(${r},${g},${b},0), rgb(${r},${g},${b}))`}
          onChange={(v) => onChange({ r, g, b, a: v })}
        />
      )}
    </div>
  );
}
