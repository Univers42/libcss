// ─── Type system ───────────────────────────────────────
export type {
  ControlType,
  ParameterDef,
  ParameterSchema,
  ParameterGroupDef,
  ParameterChangeEvent,
  ParameterChangeHandler,
  GroupStyle,
  SelectOption,
  SliderMark,
  TextParameter,
  NumberParameter,
  BooleanParameter,
  ToggleParameter,
  SelectParameter,
  MultiSelectParameter,
  TagsParameter,
  ColorParameter,
  RangeParameter,
  SliderParameter,
  ScrubParameter,
} from './types';

// ─── Schema builder ────────────────────────────────────
export { defineParameters, legacyControlsToSchema, getSchemaDefaults } from './schema';

// ─── Factory + group ───────────────────────────────────
export { ControlFactory } from './ControlFactory';
export { ParameterGroup } from './ParameterGroup';

// ─── Individual controls (for standalone use) ──────────
export { TextControl } from './TextControl';
export { NumberControl } from './NumberControl';
export { BooleanControl } from './BooleanControl';
export { ToggleControl } from './ToggleControl';
export { SelectControl } from './SelectControl';
export { MultiSelectControl } from './MultiSelectControl';
export { TagsControl } from './TagsControl';
export { ColorControl } from './ColorControl';
export { ColorPicker } from './ColorPicker';
export { RangeControl } from './RangeControl';
export { SliderControl } from './SliderControl';
export { ScrubControl } from './ScrubControl';
