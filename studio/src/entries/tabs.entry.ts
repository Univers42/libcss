import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Tabs } from '../../../src/components';

const TABS_DATA = [
  { id: 'tab-1', label: 'Overview', content: 'Overview content goes here.' },
  { id: 'tab-2', label: 'Features', content: 'Features content goes here.' },
  { id: 'tab-3', label: 'Pricing', content: 'Pricing content goes here.' },
];

const presets: VariantPreset[] = [
  { id: 'line', label: 'Line', props: { variant: 'line', tabs: TABS_DATA }, group: 'Variants' },
  { id: 'pills', label: 'Pills', props: { variant: 'pills', tabs: TABS_DATA }, group: 'Variants' },
  { id: 'line-compact', label: 'Line Compact', props: { variant: 'line', compact: true, tabs: TABS_DATA }, group: 'Compact' },
  { id: 'pills-compact', label: 'Pills Compact', props: { variant: 'pills', compact: true, tabs: TABS_DATA }, group: 'Compact' },
];

const entry: ComponentEntry = {
  id: 'tabs',
  name: 'Tabs',
  category: 'atoms',
  description: 'Tabbed content panel with line and pill variants.',
  tags: ['tabs', 'tabbed', 'panel', 'navigation', 'switch'],
  defaultProps: {
    variant: 'line',
    compact: false,
    tabs: TABS_DATA,
  },
  variantDimensions: [
    { prop: 'variant', label: 'Variant', values: ['line', 'pills'] },
  ],
  presets,
  controls: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'line',
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Pills', value: 'pills' },
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
  render: (props) => React.createElement(Tabs, props as any),
};

registry.register(entry.id, entry);
