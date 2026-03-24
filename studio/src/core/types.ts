/**
 * @file Studio Core Types
 * @description Central type definitions for the component playground.
 * Every component entry conforms to these types, making the system
 * fully extensible — add a new entry file and it appears everywhere.
 */

import type { ReactNode } from 'react';

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
export type PropControlType =
  | 'select'
  | 'text'
  | 'boolean'
  | 'number'
  | 'color'
  | 'range';

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
  /** Inspector controls for each editable prop. */
  readonly controls: readonly PropControl[];
  /**
   * Render function: receives current props, returns the component.
   * This is the heart of the playground — a pure mapping from
   * props → visual output.
   */
  readonly render: (props: Record<string, unknown>) => ReactNode;
}

// ─── View State ────────────────────────────────────────
export type StudioView = 'catalog' | 'category' | 'playground';

export interface StudioState {
  view: StudioView;
  category: ComponentCategory | null;
  componentId: string | null;
  searchQuery: string;
}
