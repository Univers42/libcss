/**
 * @file Core Types
 * @description Central type definitions for the component explorer system.
 * Every component entry conforms to these types, making the system
 * fully extensible — add a new entry file and it appears everywhere.
 */

import type { ReactNode } from 'react';
import type { ParameterSchema } from '../components/controls/types';

// ─── Categories ────────────────────────────────────────
export type ComponentCategory = 'atoms' | 'molecules' | 'organisms' | 'layouts' | 'media';

export const CATEGORY_META: Record<
  ComponentCategory,
  { label: string; description: string; icon: string }
> = {
  atoms: {
    label: 'Atoms',
    description: 'Fundamental building blocks — buttons, icons, toggles, inputs.',
    icon: '⚛',
  },
  molecules: {
    label: 'Molecules',
    description: 'Composed patterns — form fields, panels, selectors, layouts.',
    icon: '🧬',
  },
  organisms: {
    label: 'Organisms',
    description: 'Complex sections — navigation bars, hero blocks, dashboards.',
    icon: '🏗',
  },
  layouts: {
    label: 'Layouts',
    description: 'Data visualizations — charts, boards, timelines, dashboards.',
    icon: '📊',
  },
  media: {
    label: 'Media',
    description: 'Rich media blocks — images, video, audio, file attachments.',
    icon: '🎬',
  },
};

// ─── Prop Controls ─────────────────────────────────────
export type PropControlType = 'select' | 'text' | 'boolean' | 'number' | 'color' | 'range';

export interface PropControl {
  /** The prop key on the component. */
  readonly key: string;
  /** Display label in the inspector. */
  readonly label: string;
  /** Type of control to render. */
  readonly type: PropControlType;
  /** Options for select controls. */
  readonly options?: readonly { label: string; value: string }[];
  /** Min value for number/range controls. */
  readonly min?: number;
  /** Max value for number/range controls. */
  readonly max?: number;
  /** Step for number/range controls. */
  readonly step?: number;
  /** Default value. */
  readonly defaultValue: unknown;
  /** Optional group label for organizing controls. */
  readonly group?: string;
}

// ─── Variant Presets ───────────────────────────────────

/** A named prop combination showcasing a specific component configuration. */
export interface VariantPreset {
  /** Unique id within this entry (e.g., 'primary-md'). */
  readonly id: string;
  /** Display label (e.g., 'Primary Medium'). */
  readonly label: string;
  /** Props merged onto defaultProps for this preset. */
  readonly props: Record<string, unknown>;
  /** Optional short description. */
  readonly description?: string;
  /** Group for organizing presets (e.g., 'Variant × Size', 'States'). */
  readonly group?: string;
}

/** A dimension of variation discovered by the parser or declared manually. */
export interface VariantDimensionDef {
  /** Prop name on the target component. */
  readonly prop: string;
  /** Display label (defaults to prop). */
  readonly label?: string;
  /** Possible values for this dimension. */
  readonly values: readonly string[];
}

// ─── Component Entry ───────────────────────────────────
export interface ComponentEntry {
  /** Unique identifier (e.g., 'button', 'form-field'). */
  readonly id: string;
  /** Display name (e.g., 'Button', 'Form Field'). */
  readonly name: string;
  /** Category for filtering. */
  readonly category: ComponentCategory;
  /** Short description. */
  readonly description: string;
  /** Search tags. */
  readonly tags: readonly string[];
  /** Default props to render the component. */
  readonly defaultProps: Record<string, unknown>;
  /** Inspector controls for each editable prop (legacy — still supported). */
  readonly controls: readonly PropControl[];
  /**
   * New polymorphic parameter schema.  When provided, the inspector uses this
   * instead of `controls`.  Build with `defineParameters()` from controls/schema.
   */
  readonly parameters?: ParameterSchema;
  /**
   * Render function: receives current props, returns the component.
   * This is the heart of the playground — a pure mapping from
   * props → visual output.
   */
  readonly render: (props: Record<string, unknown>) => ReactNode;
  /**
   * Named preset configurations showcasing different component states.
   * If omitted, the explorer auto-generates presets from variantDimensions.
   */
  readonly presets?: readonly VariantPreset[];
  /**
   * Variant dimensions for auto-generating a matrix grid.
   * E.g. [{ prop: 'variant', values: ['primary','secondary'] }, { prop: 'size', values: ['sm','md','lg'] }]
   */
  readonly variantDimensions?: readonly VariantDimensionDef[];
}

// ─── View State ────────────────────────────────────────
export type StudioView = 'catalog' | 'category' | 'variants' | 'playground';

export interface StudioState {
  view: StudioView;
  category: ComponentCategory | null;
  componentId: string | null;
  searchQuery: string;
}
