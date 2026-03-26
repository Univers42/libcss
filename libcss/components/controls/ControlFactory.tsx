/**
 * @file ControlFactory
 * @description Polymorphic control renderer — given a ParameterDef,
 * renders the correct control component.  Acts as the heart of the
 * dynamic inspector: the caller only needs to pass a schema item and
 * this factory resolves the right widget.
 */

import type { ParameterDef, ControlType } from './types';
import { SelectControl } from './SelectControl';
import { TextControl } from './TextControl';
import { BooleanControl } from './BooleanControl';
import { NumberControl } from './NumberControl';
import { ColorPicker } from './ColorPicker';
import { RangeControl } from './RangeControl';
import { ToggleControl } from './ToggleControl';
import { MultiSelectControl } from './MultiSelectControl';
import { TagsControl } from './TagsControl';
import { SliderControl } from './SliderControl';
import { ScrubControl } from './ScrubControl';

interface ControlFactoryProps {
  param: ParameterDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  /** Called when the interaction is complete (pointer-up, blur, etc.). */
  onCommit?: (key: string, value: unknown) => void;
}

/**
 * Map each ControlType to its component. Every component expects
 * `{ param, value, onChange }`.  The discriminated union in `param`
 * narrows the type inside each component automatically.
 */
const CONTROL_MAP: Record<
  ControlType,
  React.FC<{ param: any; value: unknown; onChange: (key: string, value: unknown) => void; onCommit?: (key: string, value: unknown) => void }>
> = {
  text: TextControl,
  number: NumberControl,
  boolean: BooleanControl,
  toggle: ToggleControl,
  select: SelectControl,
  multiselect: MultiSelectControl,
  tags: TagsControl,
  color: ColorPicker,
  range: RangeControl,
  slider: SliderControl,
  scrub: ScrubControl,
};

/** Controls that manage their own onCommit timing (pointer-up, blur, etc.). */
const COMMIT_AWARE: ReadonlySet<string> = new Set(['range', 'slider', 'scrub', 'text', 'number', 'color']);

export function ControlFactory({ param, value, onChange, onCommit }: ControlFactoryProps) {
  if (param.hidden) return null;
  const Comp = CONTROL_MAP[param.type];
  if (!Comp) return null;

  // Commit-aware controls handle onCommit internally (on pointer-up / blur)
  if (COMMIT_AWARE.has(param.type)) {
    return <Comp param={param} value={value} onChange={onChange} onCommit={onCommit} />;
  }

  // Discrete controls: onChange implies immediate commit
  const effectiveOnChange = onCommit
    ? (key: string, val: unknown) => { onChange(key, val); onCommit(key, val); }
    : onChange;

  return <Comp param={param} value={value} onChange={effectiveOnChange} />;
}
