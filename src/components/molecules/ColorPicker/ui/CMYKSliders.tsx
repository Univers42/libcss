/**
 * @file CMYKSliders
 * @description C, M, Y, K channel sliders (each 0–100%).
 */

import type { ColorState, CMYK } from '../model/color-engine';
import { ChannelSlider } from './ChannelSlider';

interface CMYKSlidersProps {
  color: ColorState;
  onChange: (cmyk: CMYK) => void;
}

export function CMYKSliders({ color, onChange }: CMYKSlidersProps) {
  const { c, m, y, k } = color.cmyk;
  const { r, g, b } = color.rgb;

  return (
    <div className="cpk-sliders">
      <ChannelSlider
        label="C"
        value={c * 100}
        min={0}
        max={100}
        gradient={`linear-gradient(90deg, rgb(${r},${g},${b}), rgb(0,${g},${b}))`}
        onChange={(v) => onChange({ c: v / 100, m, y, k })}
      />
      <ChannelSlider
        label="M"
        value={m * 100}
        min={0}
        max={100}
        gradient={`linear-gradient(90deg, rgb(${r},${g},${b}), rgb(${r},0,${b}))`}
        onChange={(v) => onChange({ c, m: v / 100, y, k })}
      />
      <ChannelSlider
        label="Y"
        value={y * 100}
        min={0}
        max={100}
        gradient={`linear-gradient(90deg, rgb(${r},${g},${b}), rgb(${r},${g},0))`}
        onChange={(v) => onChange({ c, m, y: v / 100, k })}
      />
      <ChannelSlider
        label="K"
        value={k * 100}
        min={0}
        max={100}
        gradient={`linear-gradient(90deg, rgb(${r},${g},${b}), rgb(0,0,0))`}
        onChange={(v) => onChange({ c, m, y, k: v / 100 })}
      />
    </div>
  );
}
