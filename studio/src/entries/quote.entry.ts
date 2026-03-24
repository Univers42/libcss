import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Quote } from '../../../src/components';

const QUOTE_VARIANTS = ['default', 'lg', 'accent'] as const;

const presets: VariantPreset[] = [
  ...QUOTE_VARIANTS.map((v) => ({
    id: v, label: v === 'lg' ? 'Large' : v[0]!.toUpperCase() + v.slice(1),
    props: { variant: v, children: 'Imagination is more important than knowledge.', author: 'Albert Einstein' },
    group: 'Variants',
  })),
  { id: 'no-author', label: 'No Author', props: { variant: 'default', children: 'A quote without attribution.', author: '' }, group: 'Content' },
  { id: 'long-accent', label: 'Long Accent', props: { variant: 'accent', children: 'The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle.', author: 'Steve Jobs' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'quote',
  name: 'Quote',
  category: 'atoms',
  description: 'Blockquote with accent bar, author attribution, and variant styles.',
  tags: ['quote', 'blockquote', 'citation', 'testimonial'],
  defaultProps: {
    variant: 'default',
    author: 'Albert Einstein',
    children: 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.',
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...QUOTE_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'lg' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    {
      key: 'children',
      label: 'Text',
      type: 'text',
      group: 'Content',
      defaultValue: 'Imagination is more important than knowledge.',
    },
    {
      key: 'author',
      label: 'Author',
      type: 'text',
      group: 'Content',
      defaultValue: 'Albert Einstein',
    },
  ],
  render: (props) => React.createElement(Quote, props as any),
};

registry.register(entry.id, entry);
