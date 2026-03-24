import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { SplitLayout } from '../../../src/components';

const LAYOUT_VARIANTS = ['split', 'centered', 'minimal'] as const;

const presets: VariantPreset[] = LAYOUT_VARIANTS.map((v) => ({
  id: v, label: v[0]!.toUpperCase() + v.slice(1),
  props: { variant: v },
  group: 'Variants',
}));

const entry: ComponentEntry = {
  id: 'split-layout',
  name: 'Split Layout',
  category: 'molecules',
  description: 'Two-pane structural layout for auth screens, heroes, or dashboards.',
  tags: ['layout', 'split', 'grid', 'two-column', 'structure'],
  defaultProps: {
    variant: 'split',
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: [...LAYOUT_VARIANTS] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Layout',
      defaultValue: 'split',
      options: [
        { label: 'Split (two panels)', value: 'split' },
        { label: 'Centered (single)', value: 'centered' },
        { label: 'Minimal (narrow)', value: 'minimal' },
      ],
    },
  ],
  render: (props) => {
    const fp = props as any;
    return React.createElement(SplitLayout, {
      variant: fp.variant,
      leftContent: React.createElement(
        'div',
        {
          style: {
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            background: 'var(--prisma-bg-primary)',
          },
        },
        React.createElement('span', { style: { opacity: 0.5 } }, 'Left Panel'),
      ),
      rightContent: React.createElement(
        'div',
        {
          style: {
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            background: 'var(--prisma-bg-secondary)',
          },
        },
        React.createElement('span', { style: { opacity: 0.5 } }, 'Right Panel'),
      ),
    });
  },
};

registry.register(entry.id, entry);
