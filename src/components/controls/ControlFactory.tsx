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
import { ColorControl } from './ColorControl';
import { RangeControl } from './RangeControl';
import { ToggleControl } from './ToggleControl';
import { MultiSelectControl } from './MultiSelectControl';
import { TagsControl } from './TagsControl';
import { SliderControl } from './SliderControl';

interface ControlFactoryProps {
  param: ParameterDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

/**
 * Map each ControlType to its component. Every component expects
 * `{ param, value, onChange }`.  The discriminated union in `param`
 * narrows the type inside each component automatically.
 */
const CONTROL_MAP: Record<
  ControlType,
  React.FC<{ param: any; value: unknown; onChange: (key: string, value: unknown) => void }>
> = {
  text: TextControl,
  number: NumberControl,
  boolean: BooleanControl,
  toggle: ToggleControl,
  select: SelectControl,
  multiselect: MultiSelectControl,
  tags: TagsControl,
  color: ColorControl,
  range: RangeControl,
  slider: SliderControl,
};

export function ControlFactory({ param, value, onChange }: ControlFactoryProps) {
  if (param.hidden) return null;
  const Comp = CONTROL_MAP[param.type];
  if (!Comp) return null;
  return <Comp param={param} value={value} onChange={onChange} />;
}
