import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { TableOfContents } from '../../../src/components';

const TOC_VARIANTS = ['default', 'flat', 'sticky'] as const;
const TOC_ITEMS = [
  { id: 'item-1', label: 'Introduction', depth: 1 },
  { id: 'item-2', label: 'Getting Started', depth: 1 },
  { id: 'item-3', label: 'Installation', depth: 2 },
  { id: 'item-4', label: 'Configuration', depth: 2 },
  { id: 'item-5', label: 'Advanced Usage', depth: 1 },
  { id: 'item-6', label: 'API Reference', depth: 2 },
];

const presets: VariantPreset[] = [
  ...TOC_VARIANTS.map((v) => ({
    id: v, label: v[0]!.toUpperCase() + v.slice(1),
    props: { variant: v, items: TOC_ITEMS, activeId: 'item-2' },
    group: 'Variants',
  })),
  { id: 'no-active', label: 'No Active', props: { variant: 'default', items: TOC_ITEMS, activeId: '' }, group: 'States' },
  { id: 'custom-title', label: 'Custom Title', props: { variant: 'default', title: 'Contents', items: TOC_ITEMS, activeId: 'item-5' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'table-of-contents',
  name: 'Table of Contents',
  category: 'atoms',
  description: 'Auto-generated table of contents with depth indentation and active tracking.',
  tags: ['toc', 'table-of-contents', 'navigation', 'outline', 'headings'],
  defaultProps: {
    title: 'Table of Contents',
    variant: 'default',
    activeId: 'item-2',
    items: TOC_ITEMS,
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...TOC_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Table of Contents',
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Flat', value: 'flat' },
        { label: 'Sticky', value: 'sticky' },
      ],
    },
  ],
  render: (props) => React.createElement(TableOfContents, props as any),
};

registry.register(entry.id, entry);
