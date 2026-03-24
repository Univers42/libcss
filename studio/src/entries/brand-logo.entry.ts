import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { BrandLogo } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'default', label: 'Default', props: { title: 'Prismatica', href: '/' }, group: 'Variants' },
  { id: 'custom-title', label: 'Custom Title', props: { title: 'My App', href: '/' }, group: 'Variants' },
  { id: 'no-link', label: 'No Link', props: { title: 'Prismatica', href: '' }, group: 'Variants' },
];

const entry: ComponentEntry = {
  id: 'brand-logo',
  name: 'Brand Logo',
  category: 'atoms',
  description: 'Application brand logo with icon and title.',
  tags: ['logo', 'brand', 'header', 'identity'],
  defaultProps: {
    title: 'Prismatica',
    href: '/',
  },
  presets,
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Prismatica',
    },
    {
      key: 'href',
      label: 'Link URL',
      type: 'text',
      group: 'Behavior',
      defaultValue: '/',
    },
  ],
  render: (props) => React.createElement(BrandLogo, props as any),
};

registry.register(entry.id, entry);
