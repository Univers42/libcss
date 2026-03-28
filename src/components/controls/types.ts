/**
 * @file Control Type System
 * @description Discriminated-union parameter definitions for the polymorphic
 * inspector.  Each control type carries only the fields that make sense for
 * its kind, giving full type-safety to schema authors and control renderers.
 *
 * Usage
 * Import `ParameterDef` for the union, or individual interfaces when you
 * narrow inside a control component.  Import `ParameterSchema` when you
 * build the grouped layout consumed by <InspectorPanel>.
 */

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}

export interface SliderMark {
  readonly value: number;
  readonly label: string;
}

export type ControlType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'toggle'
  | 'select'
  | 'multiselect'
  | 'tags'
  | 'color'
  | 'range'
  | 'slider'
  | 'scrub';

interface ParameterBase<T = unknown> {
  /** Prop key on the component — also used as the event key. */
  readonly key: string;
  /** Human-readable label shown in the inspector. */
  readonly label: string;
  /** Optional tooltip / description. */
  readonly description?: string;
  /** Default value used for reset. */
  readonly defaultValue: T;
  /** Disable the control without hiding it. */
  readonly disabled?: boolean;
  /** Hide the control entirely (e.g. conditionally). */
  readonly hidden?: boolean;
}

export interface TextParameter extends ParameterBase<string> {
  readonly type: 'text';
  readonly placeholder?: string;
  readonly maxLength?: number;
  /** Render a <textarea> instead of <input>. */
  readonly multiline?: boolean;
}

export interface NumberParameter extends ParameterBase<number> {
  readonly type: 'number';
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  /** Display unit, e.g. "px", "%". */
  readonly unit?: string;
}

export interface BooleanParameter extends ParameterBase<boolean> {
  readonly type: 'boolean';
}

export interface ToggleParameter extends ParameterBase<boolean> {
  readonly type: 'toggle';
  readonly onLabel?: string;
  readonly offLabel?: string;
}

export interface SelectParameter extends ParameterBase<string> {
  readonly type: 'select';
  readonly options: readonly SelectOption[];
}

export interface MultiSelectParameter extends ParameterBase<string[]> {
  readonly type: 'multiselect';
  readonly options: readonly SelectOption[];
  readonly maxSelections?: number;
}

export interface TagsParameter extends ParameterBase<string[]> {
  readonly type: 'tags';
  readonly suggestions?: readonly string[];
  readonly maxTags?: number;
  /** Allow arbitrary values not in suggestions. Default true. */
  readonly allowCustom?: boolean;
}

export interface ColorParameter extends ParameterBase<string> {
  readonly type: 'color';
  readonly swatches?: readonly string[];
}

export interface RangeParameter extends ParameterBase<number> {
  readonly type: 'range';
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly unit?: string;
}

export interface SliderParameter extends ParameterBase<number> {
  readonly type: 'slider';
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly marks?: readonly SliderMark[];
  readonly unit?: string;
}

export interface ScrubParameter extends ParameterBase<number> {
  readonly type: 'scrub';
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly unit?: string;
  /** Pixels-to-step ratio.  1 = each pixel = 1 step.  0.1 = fine. */
  readonly sensitivity?: number;
}

export type ParameterDef =
  | TextParameter
  | NumberParameter
  | BooleanParameter
  | ToggleParameter
  | SelectParameter
  | MultiSelectParameter
  | TagsParameter
  | ColorParameter
  | RangeParameter
  | SliderParameter
  | ScrubParameter;

/** Visual style applied to a group container. */
export type GroupStyle = 'default' | 'card' | 'compact' | 'inline';

export interface ParameterGroupDef {
  /** Unique id within the schema (used as React key). */
  readonly id: string;
  /** Heading displayed above the group. */
  readonly label: string;
  /** Optional subtitle. */
  readonly description?: string;
  /** Visual treatment. */
  readonly style?: GroupStyle;
  /** Leading icon/emoji. */
  readonly icon?: string;
  /** Start collapsed. */
  readonly collapsed?: boolean;
  /** The parameters belonging to this group. */
  readonly parameters: readonly ParameterDef[];
}

export interface ParameterSchema {
  readonly groups: readonly ParameterGroupDef[];
}

export interface ParameterChangeEvent {
  /** The prop key that changed. */
  readonly key: string;
  /** New value. */
  readonly value: unknown;
  /** Previous value. */
  readonly previousValue: unknown;
  /** Which group this parameter belongs to. */
  readonly groupId: string;
  /** The control type that produced the change. */
  readonly controlType: ControlType;
}

export type ParameterChangeHandler = (event: ParameterChangeEvent) => void;
