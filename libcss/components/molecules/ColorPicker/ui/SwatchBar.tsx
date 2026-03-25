/**
 * @file SwatchBar
 * @description Grid of preset colour swatches for quick selection.
 */

import { memo } from 'react';

interface SwatchBarProps {
  swatches: readonly string[];
  currentHex: string;
  onSelect: (hex: string) => void;
}

export const SwatchBar = memo(function SwatchBar({
  swatches,
  currentHex,
  onSelect,
}: SwatchBarProps) {
  return (
    <div className="cpk-swatches">
      {swatches.map((hex) => (
        <button
          key={hex}
          type="button"
          className={`cpk-swatches__swatch${hex.toLowerCase() === currentHex.toLowerCase() ? ' cpk-swatches__swatch--active' : ''}`}
          style={{ background: hex }}
          onClick={() => onSelect(hex)}
          title={hex}
          aria-label={`Swatch ${hex}`}
        />
      ))}
    </div>
  );
});
