import type { CellValue, PropertyDef } from '@libcss/common';

export interface InlineEditorProps {
  /** The current cell value. */
  value: CellValue;
  /** Property definition — drives which input type to render. */
  property: PropertyDef;
  /** Fires on commit (Enter / blur). */
  onCommit: (value: CellValue) => void;
  /** Fires on cancel (Escape). */
  onCancel?: () => void;
  /** Additional class names. */
  className?: string;
}
