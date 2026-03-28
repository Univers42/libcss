/**
 * @file ComponentDefinition
 * @description Defines a component type once — schema, defaults, renderer.
 *
 * This is the foundational piece of the maker architecture:
 *   - You define RULES (schema + defaults) → finite
 *   - Users generate VARIANTS (named prop sets) → infinite
 *   - Users place INSTANCES (variant ref + overrides) → infinite
 *
 * "I don't create variations. I create rules that generate variations."
 *
 * Usage
 *   const buttonDef = defineComponentType({
 *     type: 'button',
 *     label: 'Button',
 *     icon: '🔘',
 *     schema: defineParameters().group(...).color(...).build(),
 *     render: (props) => <StylableButton config={props} />,
 *   });
 */

import type { ReactNode } from 'react';
import type { ParameterSchema } from '../components/controls/types';
import { getSchemaDefaults } from '../components/controls/schema';
import { unflatten } from '../common/utils/pathAccess';

/** A named variant — a shared set of props for a component type. */
export interface VariantDef {
  /** Filename slug (no .json). Acts as unique ID within the component type. */
  readonly slug: string;
  /** Display name (e.g. "Primary", "Danger"). */
  readonly name: string;
  /** The flat props map — every key matches a ParameterDef.key from the schema. */
  readonly props: Record<string, unknown>;
}

/** An instance — references a variant, optionally overrides specific props. */
export interface InstanceDef {
  /** Unique instance ID. */
  readonly id: string;
  /** Which variant to inherit from. */
  readonly variant: string;
  /** Per-instance overrides (e.g. different label). */
  readonly overrides?: Record<string, unknown>;
}

/** Input to defineComponentType(). */
export interface ComponentTypeConfig {
  /** Unique type key (e.g. 'button', 'input', 'card'). */
  readonly type: string;
  /** Human label. */
  readonly label: string;
  /** Leading icon/emoji. */
  readonly icon?: string;
  /** Built schema (from defineParameters().build()). */
  readonly schema: ParameterSchema;
  /** Pure render function: props → visual output. */
  readonly render: (props: Record<string, unknown>) => ReactNode;
  /** Optional description for the catalog. */
  readonly description?: string;
}

/** A fully resolved component definition (immutable). */
export interface ComponentType extends ComponentTypeConfig {
  /** Flat defaults extracted from the schema. */
  readonly defaults: Record<string, unknown>;
}

/**
 * Create a ComponentType from a config.
 * Automatically extracts `defaults` from the schema and unflattens
 * them into the canonical nested format.
 */
export function defineComponentType(config: ComponentTypeConfig): ComponentType {
  const flatDefaults = getSchemaDefaults(config.schema);
  return Object.freeze({
    ...config,
    defaults: unflatten(flatDefaults),
  });
}

const _types = new Map<string, ComponentType>();

/** Register a component type so it's discoverable by the maker. */
export function registerComponentType(def: ComponentType): void {
  _types.set(def.type, def);
}

/** Get a registered component type by key. */
export function getComponentType(type: string): ComponentType | undefined {
  return _types.get(type);
}

/** Get all registered component types. */
export function getAllComponentTypes(): ComponentType[] {
  return [..._types.values()];
}
