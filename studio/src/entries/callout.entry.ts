import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Callout } from '../../../src/components';

const CALLOUT_VARIANTS = ['info', 'warning', 'error', 'success'] as const;

const presets: VariantPreset[] = [
  ...CALLOUT_VARIANTS.map((v) => ({
    id: `${v}`, label: `${v[0]!.toUpperCase() + v.slice(1)}`,
    props: { variant: v, children: `This is a ${v} callout.` },
    group: 'Variants',
  })),
  ...CALLOUT_VARIANTS.map((v) => ({
    id: `${v}-titled`, label: `${v[0]!.toUpperCase() + v.slice(1)} + Title`,
    props: { variant: v, title: `${v[0]!.toUpperCase() + v.slice(1)} Notice`, children: `This is a titled ${v} callout.` },
    group: 'With Title',
  })),
  { id: 'compact-info', label: 'Compact Info', props: { variant: 'info', compact: true, children: 'Compact callout.' }, group: 'Layout' },
  { id: 'compact-warning', label: 'Compact Warning', props: { variant: 'warning', compact: true, children: 'Compact warning.' }, group: 'Layout' },
];

const entry: ComponentEntry = {
  id: 'callout',
  name: 'Callout',
  category: 'atoms',
  description: 'Colored callout block with icon and content for info, warning, error, success states.',
  tags: ['callout', 'alert', 'notice', 'info', 'warning', 'error', 'success'],
  defaultProps: {
    variant: 'info',
    title: '',
    compact: false,
    children: 'This is an informational callout. Use it to highlight important details.',
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...CALLOUT_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
    },
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: '',
    },
    {
      key: 'children',
      label: 'Content',
      type: 'text',
      group: 'Content',
      defaultValue: 'This is an informational callout.',
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Callout, props as any),
};

registry.register(entry.id, entry);
