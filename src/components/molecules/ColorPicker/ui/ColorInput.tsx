/**
 * @file ColorInput
 * @description Hex / RGB / HSL text input with format toggle.
 * Shows the current colour as text in the selected format,
 * and allows keyboard-editing the hex value.
 */

import { memo, useState, useCallback, useEffect } from 'react';
import type { ColorState } from '../model/color-engine';
import { formatRgb, formatHsl, formatCmyk } from '../model/color-engine';

type Format = 'hex' | 'rgb' | 'hsl' | 'cmyk';
const FORMATS: Format[] = ['hex', 'rgb', 'hsl', 'cmyk'];

interface ColorInputProps {
  color: ColorState;
  onHexChange: (hex: string) => void;
}

function displayValue(color: ColorState, fmt: Format): string {
  switch (fmt) {
    case 'hex': return color.hex;
    case 'rgb': return formatRgb(color.rgb);
    case 'hsl': return formatHsl(color.hsl);
    case 'cmyk': return formatCmyk(color.cmyk);
  }
}

export const ColorInput = memo(function ColorInput({ color, onHexChange }: ColorInputProps) {
  const [format, setFormat] = useState<Format>('hex');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!editing) setDraft(displayValue(color, format));
  }, [color, format, editing]);

  const cycleFormat = useCallback(() => {
    setFormat((prev) => {
      const idx = FORMATS.indexOf(prev);
      return FORMATS[(idx + 1) % FORMATS.length]!;
    });
  }, []);

  const commit = useCallback(() => {
    setEditing(false);
    if (format === 'hex') {
      const hex = draft.startsWith('#') ? draft : `#${draft}`;
      if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex)) {
        onHexChange(hex);
      }
    }
    // Non-hex formats are display only — commit silently ignored
  }, [format, draft, onHexChange]);

  return (
    <div className="cpk-input">
      {/* Preview swatch */}
      <div className="cpk-input__preview" style={{ background: color.hex }} />

      {/* Text field */}
      <input
        className="cpk-input__field"
        type="text"
        value={editing ? draft : displayValue(color, format)}
        readOnly={format !== 'hex'}
        onFocus={() => { if (format === 'hex') { setEditing(true); setDraft(color.hex); } }}
        onBlur={commit}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
        spellCheck={false}
      />

      {/* Format toggle */}
      <button
        type="button"
        className="cpk-input__toggle"
        onClick={cycleFormat}
        title={`Switch format (currently ${format.toUpperCase()})`}
      >
        {format.toUpperCase()}
      </button>
    </div>
  );
});
