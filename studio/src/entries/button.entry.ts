import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Button } from '../../../src/components';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../../src/components/atoms/Button/Button.constants';

/* ---------- Presets: Variant × Size (auto from constants) ---------- */
const variantSizePresets: VariantPreset[] = BUTTON_VARIANTS.flatMap((v) =>
  BUTTON_SIZES.map((s) => ({
    id: `${v}-${s}`,
    label: `${v[0]!.toUpperCase() + v.slice(1)} ${s.toUpperCase()}`,
    props: { variant: v, size: s, children: `${v[0]!.toUpperCase() + v.slice(1)} ${s.toUpperCase()}` },
    group: 'Variant × Size',
  })),
);

/* ---------- Presets: States ---------- */
const statePresets: VariantPreset[] = [
  { id: 'loading', label: 'Loading', props: { isLoading: true, children: 'Loading…' }, group: 'States' },
  { id: 'disabled', label: 'Disabled', props: { disabled: true, children: 'Disabled' }, group: 'States' },
  { id: 'full-width', label: 'Full Width', props: { fullWidth: true, children: 'Full Width' }, group: 'States' },
  { id: 'block', label: 'Block', props: { isBlock: true, children: 'Block Button' }, group: 'States' },
  { id: 'danger-loading', label: 'Danger Loading', props: { variant: 'danger', isLoading: true, children: 'Deleting…' }, group: 'States' },
  { id: 'outline-disabled', label: 'Outline Disabled', props: { variant: 'outline', disabled: true, children: 'Unavailable' }, group: 'States' },
  { id: 'ghost-lg', label: 'Ghost Large', props: { variant: 'ghost', size: 'lg', children: 'Ghost Large' }, group: 'States' },
];

/* ---------- Presets: Polymorphic ---------- */
const polymorphicPresets: VariantPreset[] = [
  { id: 'as-button', label: 'As <button>', props: { children: 'Native Button' }, description: 'Default button element', group: 'Polymorphic' },
  { id: 'as-anchor', label: 'As <a>', props: { as: 'a', href: '#', children: 'Anchor Link' }, description: 'Renders as anchor tag', group: 'Polymorphic' },
];

const entry: ComponentEntry = {
  id: 'button',
  name: 'Button',
  category: 'atoms',
  description: 'Primary action trigger with multiple variants, sizes, and states. Polymorphic — renders as button, anchor, or router Link.',
  tags: ['button', 'cta', 'action', 'submit', 'click', 'polymorphic'],
  defaultProps: {
    variant: 'primary',
    size: 'md',
    children: 'Click me',
    fullWidth: false,
    isLoading: false,
    disabled: false,
    isBlock: false,
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...BUTTON_VARIANTS] },
    { prop: 'size', label: 'Size', values: [...BUTTON_SIZES] },
  ],
  presets: [...variantSizePresets, ...statePresets, ...polymorphicPresets],
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'primary',
      options: BUTTON_VARIANTS.map((v) => ({ label: v[0]!.toUpperCase() + v.slice(1), value: v })),
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'md',
      options: BUTTON_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })),
    },
    {
      key: 'children',
      label: 'Label',
      type: 'text',
      group: 'Content',
      defaultValue: 'Click me',
    },
    {
      key: 'fullWidth',
      label: 'Full Width',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
    {
      key: 'isBlock',
      label: 'Block',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
    {
      key: 'isLoading',
      label: 'Loading',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Button, props as any),
};

registry.register(entry.id, entry);
