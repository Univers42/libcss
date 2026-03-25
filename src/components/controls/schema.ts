/**
 * @file Schema Builder
 * @description Fluent API for constructing a ParameterSchema.
 *
 * Example
 * ───────
 *   const schema = defineParameters()
 *     .group('appearance', 'Appearance', { icon: '🎨' })
 *       .select('variant', 'Variant', { options: [...], defaultValue: 'primary' })
 *       .range('borderRadius', 'Radius', { min: 0, max: 24, defaultValue: 8 })
 *     .group('content', 'Content')
 *       .text('label', 'Label', { defaultValue: 'Click me' })
 *       .toggle('disabled', 'Disabled', { defaultValue: false })
 *     .build();
 */

import type {
  ParameterSchema,
  ParameterGroupDef,
  ParameterDef,
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
} from './types';

// ─── Option bags per control, omitting type+key+label ──

type Omitted = 'type' | 'key' | 'label';

type TextOpts     = Omit<TextParameter, Omitted>;
type NumberOpts   = Omit<NumberParameter, Omitted>;
type BooleanOpts  = Omit<BooleanParameter, Omitted>;
type ToggleOpts   = Omit<ToggleParameter, Omitted>;
type SelectOpts   = Omit<SelectParameter, Omitted>;
type MultiOpts    = Omit<MultiSelectParameter, Omitted>;
type TagsOpts     = Omit<TagsParameter, Omitted>;
type ColorOpts    = Omit<ColorParameter, Omitted>;
type RangeOpts    = Omit<RangeParameter, Omitted>;
type SliderOpts   = Omit<SliderParameter, Omitted>;

interface GroupOpts {
  description?: string;
  style?: GroupStyle;
  icon?: string;
  collapsed?: boolean;
}

// ─── Builder class ─────────────────────────────────────

class SchemaBuilder {
  private _groups: MutableGroup[] = [];
  private _current: MutableGroup | null = null;

  /** Start a new group.  All subsequent control calls go into this group. */
  group(id: string, label: string, opts: GroupOpts = {}): this {
    const g: MutableGroup = { id, label, ...opts, parameters: [] };
    this._groups.push(g);
    this._current = g;
    return this;
  }

  // ── Control shortcuts (each returns `this` for chaining) ──

  text(key: string, label: string, opts: TextOpts): this {
    return this._push({ type: 'text', key, label, ...opts });
  }

  number(key: string, label: string, opts: NumberOpts): this {
    return this._push({ type: 'number', key, label, ...opts });
  }

  boolean(key: string, label: string, opts: BooleanOpts): this {
    return this._push({ type: 'boolean', key, label, ...opts });
  }

  toggle(key: string, label: string, opts: ToggleOpts): this {
    return this._push({ type: 'toggle', key, label, ...opts });
  }

  select(key: string, label: string, opts: SelectOpts): this {
    return this._push({ type: 'select', key, label, ...opts });
  }

  multiselect(key: string, label: string, opts: MultiOpts): this {
    return this._push({ type: 'multiselect', key, label, ...opts });
  }

  tags(key: string, label: string, opts: TagsOpts): this {
    return this._push({ type: 'tags', key, label, ...opts });
  }

  color(key: string, label: string, opts: ColorOpts): this {
    return this._push({ type: 'color', key, label, ...opts });
  }

  range(key: string, label: string, opts: RangeOpts): this {
    return this._push({ type: 'range', key, label, ...opts });
  }

  slider(key: string, label: string, opts: SliderOpts): this {
    return this._push({ type: 'slider', key, label, ...opts });
  }

  /** Freeze and return the schema. */
  build(): ParameterSchema {
    return {
      groups: this._groups.map((g) => ({
        ...g,
        parameters: Object.freeze([...g.parameters]),
      })),
    };
  }

  // ── internal ──

  private _push(param: ParameterDef): this {
    if (!this._current) {
      // auto-create a default group
      this.group('general', 'General');
    }
    this._current!.parameters.push(param);
    return this;
  }
}

interface MutableGroup extends Omit<ParameterGroupDef, 'parameters'> {
  parameters: ParameterDef[];
}

// ─── Public factory ────────────────────────────────────

/** Create a fluent schema builder for defining parameter groups. */
export function defineParameters(): SchemaBuilder {
  return new SchemaBuilder();
}

// ─── Legacy adapter ────────────────────────────────────

import type { PropControl } from '../../core/types';

/**
 * Convert a legacy `PropControl[]` (with optional `group` strings) into
 * the new `ParameterSchema`.  This lets every existing entry work with
 * the new InspectorPanel without any migration.
 */
export function legacyControlsToSchema(controls: readonly PropControl[]): ParameterSchema {
  const map = new Map<string, ParameterDef[]>();

  for (const ctrl of controls) {
    const groupId = slugify(ctrl.group ?? 'General');
    const list = map.get(groupId) ?? [];
    list.push(legacyToParam(ctrl));
    map.set(groupId, list);
  }

  const groups: ParameterGroupDef[] = [];
  // Keep insertion order
  const seen = new Map<string, string>(); // groupId → label
  for (const ctrl of controls) {
    const label = ctrl.group ?? 'General';
    const id = slugify(label);
    if (!seen.has(id)) {
      seen.set(id, label);
    }
  }
  for (const [id, label] of seen) {
    groups.push({ id, label, parameters: map.get(id) ?? [] });
  }

  return { groups };
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function legacyToParam(ctrl: PropControl): ParameterDef {
  const base = {
    key: ctrl.key,
    label: ctrl.label,
    defaultValue: ctrl.defaultValue as any,
  };

  switch (ctrl.type) {
    case 'text':
      return { type: 'text', ...base, defaultValue: String(base.defaultValue ?? '') };
    case 'number':
      return {
        type: 'number', ...base,
        defaultValue: Number(base.defaultValue ?? 0),
        min: ctrl.min, max: ctrl.max, step: ctrl.step,
      };
    case 'boolean':
      return { type: 'boolean', ...base, defaultValue: Boolean(base.defaultValue) };
    case 'select':
      return {
        type: 'select', ...base,
        defaultValue: String(base.defaultValue ?? ''),
        options: (ctrl.options ?? []) as { label: string; value: string }[],
      };
    case 'color':
      return { type: 'color', ...base, defaultValue: String(base.defaultValue ?? '#000000') };
    case 'range':
      return {
        type: 'range', ...base,
        defaultValue: Number(base.defaultValue ?? 0),
        min: ctrl.min ?? 0, max: ctrl.max ?? 100, step: ctrl.step,
      };
    default:
      return { type: 'text', ...base, defaultValue: String(base.defaultValue ?? '') };
  }
}
