import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { List } from '../../../src/components';

const LIST_VARIANTS = ['unordered', 'ordered', 'todo'] as const;
const LIST_ITEMS = [
  { id: '1', content: 'First item' },
  { id: '2', content: 'Second item' },
  { id: '3', content: 'Third item', checked: true },
];

const presets: VariantPreset[] = [
  ...LIST_VARIANTS.map((v) => ({
    id: v, label: v[0]!.toUpperCase() + v.slice(1),
    props: { variant: v, items: LIST_ITEMS },
    group: 'Variants',
  })),
  ...LIST_VARIANTS.map((v) => ({
    id: `${v}-compact`, label: `${v[0]!.toUpperCase() + v.slice(1)} Compact`,
    props: { variant: v, compact: true, items: LIST_ITEMS },
    group: 'Compact',
  })),
];

const entry: ComponentEntry = {
  id: 'list',
  name: 'List',
  category: 'atoms',
  description: 'Ordered, unordered, and todo list with nested support.',
  tags: ['list', 'ordered', 'unordered', 'todo', 'checklist', 'bullet'],
  defaultProps: {
    variant: 'unordered',
    compact: false,
    items: LIST_ITEMS,
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...LIST_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'unordered',
      options: [
        { label: 'Unordered', value: 'unordered' },
        { label: 'Ordered', value: 'ordered' },
        { label: 'Todo', value: 'todo' },
      ],
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(List, props as any),
};

registry.register(entry.id, entry);
