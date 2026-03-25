/**
 * @file HSLSliders
 * @description H (0-360°), S (0-100%), L (0-100%) + optional A (0-1) channel sliders.
 */

import type { ColorState, HSLA } from '../model/color-engine';
import { ChannelSlider } from './ChannelSlider';

interface HSLSlidersProps {
  color: ColorState;
  onChange: (hsl: HSLA) => void;
  showAlpha?: boolean;
}

export function HSLSliders({ color, onChange, showAlpha = true }: HSLSlidersProps) {
  const { h, s, l, a } = color.hsl;

  const hueGrad =
    'linear-gradient(90deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))';

  const satGrad = `linear-gradient(90deg, hsl(${h},0%,${l * 100}%), hsl(${h},100%,${l * 100}%))`;
  const litGrad = `linear-gradient(90deg, hsl(${h},${s * 100}%,0%), hsl(${h},${s * 100}%,50%), hsl(${h},${s * 100}%,100%))`;

  return (
    <div className="cpk-sliders">
      <ChannelSlider
        label="H" value={h} min={0} max={360}
        gradient={hueGrad}
        onChange={(v) => onChange({ h: v, s, l, a })}
      />
      <ChannelSlider
        label="S" value={s * 100} min={0} max={100}
        gradient={satGrad}
        onChange={(v) => onChange({ h, s: v / 100, l, a })}
      />
      <ChannelSlider
        label="L" value={l * 100} min={0} max={100}
        gradient={litGrad}
        onChange={(v) => onChange({ h, s, l: v / 100, a })}
      />
      {showAlpha && (
        <ChannelSlider
          label="A" value={a} min={0} max={1} decimals={2}
          gradient={`linear-gradient(90deg, hsla(${h},${s * 100}%,${l * 100}%,0), hsl(${h},${s * 100}%,${l * 100}%))`}
          onChange={(v) => onChange({ h, s, l, a: v })}
        />
      )}
    </div>
  );
}
