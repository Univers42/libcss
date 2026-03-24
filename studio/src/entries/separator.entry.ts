import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Separator } from '../../../src/components';

const SEP_VARIANTS = ['solid', 'dashed', 'dotted', 'gradient', 'accent'] as const;
const SEP_SPACINGS = ['compact', 'default', 'wide'] as const;

const presets: VariantPreset[] = [
  ...SEP_VARIANTS.map((v) => ({
    id: v, label: v[0]!.toUpperCase() + v.slice(1),
    props: { variant: v },
    group: 'Variants',
  })),
  ...SEP_SPACINGS.map((s) => ({
    id: `spacing-${s}`, label: `Spacing ${s[0]!.toUpperCase() + s.slice(1)}`,
    props: { spacing: s },
    group: 'Spacing',
  })),
  { id: 'thick-gradient', label: 'Thick Gradient', props: { variant: 'gradient', thick: true }, group: 'Special' },
  { id: 'thick-accent', label: 'Thick Accent', props: { variant: 'accent', thick: true }, group: 'Special' },
];

const entry: ComponentEntry = {
  id: 'separator',
  name: 'Separator',
  category: 'atoms',
  description: 'Horizontal divider with style variants and spacing options.',
  tags: ['separator', 'divider', 'hr', 'line', 'break'],
  defaultProps: {
    variant: 'solid',
    spacing: 'default',
    thick: false,
  },
  variantDimensions: [
    { prop: 'variant', label: 'Style', values: [...SEP_VARIANTS] },
    { prop: 'spacing', label: 'Spacing', values: [...SEP_SPACINGS] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'solid',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    {
      key: 'spacing',
      label: 'Spacing',
      type: 'select',
      group: 'Layout',
      defaultValue: 'default',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Default', value: 'default' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    {
      key: 'thick',
      label: 'Thick',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Separator, props as any),
};

registry.register(entry.id, entry);
