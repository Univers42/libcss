import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Breadcrumb } from '../../../src/components';

const BC_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Components' },
];

const presets: VariantPreset[] = [
  { id: 'slash', label: 'Slash Separator', props: { separator: '/', items: BC_ITEMS }, group: 'Separators' },
  { id: 'arrow', label: 'Arrow Separator', props: { separator: '\u203A', items: BC_ITEMS }, group: 'Separators' },
  { id: 'dot', label: 'Dot Separator', props: { separator: '\u00B7', items: BC_ITEMS }, group: 'Separators' },
  { id: 'compact', label: 'Compact', props: { separator: '/', compact: true, items: BC_ITEMS }, group: 'Layout' },
  { id: 'long-path', label: 'Long Path', props: { separator: '/', items: [{ label: 'Home', href: '#' }, { label: 'Products', href: '#' }, { label: 'Category', href: '#' }, { label: 'Sub-Category', href: '#' }, { label: 'Item' }] }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'atoms',
  description: 'Navigation breadcrumb trail with separator and icons.',
  tags: ['breadcrumb', 'navigation', 'path', 'trail'],
  defaultProps: {
    separator: '/',
    compact: false,
    items: BC_ITEMS,
  },
  presets,
  controls: [
    {
      key: 'separator',
      label: 'Separator',
      type: 'text',
      group: 'Appearance',
      defaultValue: '/',
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Breadcrumb, props as any),
};

registry.register(entry.id, entry);
