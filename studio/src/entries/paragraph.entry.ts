import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Paragraph } from '../../../src/components';

const PARAGRAPH_SIZES = ['sm', 'md', 'lg'] as const;

const presets: VariantPreset[] = [
  ...PARAGRAPH_SIZES.map((s) => ({
    id: s, label: s.toUpperCase(),
    props: { size: s, children: 'The quick brown fox jumps over the lazy dog.' },
    group: 'Sizes',
  })),
  ...PARAGRAPH_SIZES.map((s) => ({
    id: `${s}-muted`, label: `${s.toUpperCase()} Muted`,
    props: { size: s, muted: true, children: 'The quick brown fox jumps over the lazy dog.' },
    group: 'Muted',
  })),
];

const entry: ComponentEntry = {
  id: 'paragraph',
  name: 'Paragraph',
  category: 'atoms',
  description: 'Text paragraph with size and muted variants, inline marks support.',
  tags: ['paragraph', 'text', 'body', 'content', 'typography'],
  defaultProps: {
    size: 'md',
    muted: false,
    children: 'The quick brown fox jumps over the lazy dog. This is a sample paragraph with enough text to show line wrapping and spacing behavior.',
  },
  variantDimensions: [
    { prop: 'size', label: 'Size', values: [...PARAGRAPH_SIZES] },
  ],
  presets,
  controls: [
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    {
      key: 'children',
      label: 'Text',
      type: 'text',
      group: 'Content',
      defaultValue: 'The quick brown fox jumps over the lazy dog.',
    },
    {
      key: 'muted',
      label: 'Muted',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Paragraph, props as any),
};

registry.register(entry.id, entry);
