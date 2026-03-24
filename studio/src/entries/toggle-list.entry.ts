import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { ToggleList } from '../../../src/components';

const TL_VARIANTS = ['default', 'borderless', 'filled'] as const;

const presets: VariantPreset[] = [
  ...TL_VARIANTS.map((v) => ({
    id: v, label: v[0]!.toUpperCase() + v.slice(1),
    props: { variant: v, title: `${v[0]!.toUpperCase() + v.slice(1)} Toggle`, defaultOpen: true, children: 'Revealed content goes here.' },
    group: 'Variants',
  })),
  ...TL_VARIANTS.map((v) => ({
    id: `${v}-closed`, label: `${v[0]!.toUpperCase() + v.slice(1)} Closed`,
    props: { variant: v, title: `${v[0]!.toUpperCase() + v.slice(1)} Collapsed`, defaultOpen: false, children: 'Hidden content.' },
    group: 'Collapsed',
  })),
];

const entry: ComponentEntry = {
  id: 'toggle-list',
  name: 'Toggle List',
  category: 'atoms',
  description: 'Collapsible content block with disclosure triangle.',
  tags: ['toggle', 'collapse', 'expand', 'details', 'accordion'],
  defaultProps: {
    title: 'Click to expand',
    defaultOpen: false,
    variant: 'default',
    children: 'This content is revealed when the toggle is open. It can contain any nested blocks.',
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...TL_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Click to expand',
    },
    {
      key: 'children',
      label: 'Content',
      type: 'text',
      group: 'Content',
      defaultValue: 'This content is revealed when the toggle is open.',
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Borderless', value: 'borderless' },
        { label: 'Filled', value: 'filled' },
      ],
    },
    {
      key: 'defaultOpen',
      label: 'Default Open',
      type: 'boolean',
      group: 'Behavior',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(ToggleList, props as any),
};

registry.register(entry.id, entry);
