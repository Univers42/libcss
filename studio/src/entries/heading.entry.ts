import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Heading } from '../../../src/components';

const HEADING_LEVELS = ['1', '2', '3', '4', '5'] as const;

const presets: VariantPreset[] = [
  ...HEADING_LEVELS.map((l) => ({
    id: `h${l}`, label: `H${l}`,
    props: { level: l, children: `Heading Level ${l}` },
    group: 'Levels',
  })),
  { id: 'toggleable-open', label: 'Toggleable Open', props: { level: '2', toggleable: true, defaultOpen: true, children: 'Toggleable Heading' }, group: 'Behavior' },
  { id: 'toggleable-closed', label: 'Toggleable Closed', props: { level: '2', toggleable: true, defaultOpen: false, children: 'Collapsed Heading' }, group: 'Behavior' },
];

const entry: ComponentEntry = {
  id: 'heading',
  name: 'Heading',
  category: 'atoms',
  description: 'Page heading with five levels and optional toggle behavior.',
  tags: ['heading', 'title', 'h1', 'h2', 'h3', 'toggle', 'typography'],
  defaultProps: {
    level: 2,
    toggleable: false,
    defaultOpen: true,
    children: 'Sample Heading',
  },
  variantDimensions: [
    { prop: 'level', label: 'Level', values: [...HEADING_LEVELS] },
  ],
  presets,
  controls: [
    {
      key: 'level',
      label: 'Level',
      type: 'select',
      group: 'Appearance',
      defaultValue: '2',
      options: [
        { label: 'H1', value: '1' },
        { label: 'H2', value: '2' },
        { label: 'H3', value: '3' },
        { label: 'H4', value: '4' },
        { label: 'H5', value: '5' },
      ],
    },
    {
      key: 'children',
      label: 'Text',
      type: 'text',
      group: 'Content',
      defaultValue: 'Sample Heading',
    },
    {
      key: 'toggleable',
      label: 'Toggleable',
      type: 'boolean',
      group: 'Behavior',
      defaultValue: false,
    },
    {
      key: 'defaultOpen',
      label: 'Default Open',
      type: 'boolean',
      group: 'Behavior',
      defaultValue: true,
    },
  ],
  render: (props) => React.createElement(Heading, { ...props, level: Number(props.level) } as any),
};

registry.register(entry.id, entry);
