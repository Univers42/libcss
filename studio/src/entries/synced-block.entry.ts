import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { SyncedBlock } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'view', label: 'View Mode', props: { sourceId: 'src-001', editing: false, children: 'This synced block is in view mode.' }, group: 'States' },
  { id: 'edit', label: 'Edit Mode', props: { sourceId: 'src-001', editing: true, children: 'This synced block is in edit mode.' }, group: 'States' },
  { id: 'different-source', label: 'Different Source', props: { sourceId: 'src-042', editing: false, children: 'Content from a different source block.' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'synced-block',
  name: 'Synced Block',
  category: 'atoms',
  description: 'Reusable synced content block with visual sync indicator.',
  tags: ['synced', 'reusable', 'block', 'shared', 'reference'],
  defaultProps: {
    sourceId: 'src-001',
    editing: false,
    children: 'This content is synced across multiple pages. Edit it in one place and it updates everywhere.',
  },
  presets,
  controls: [
    {
      key: 'sourceId',
      label: 'Source ID',
      type: 'text',
      group: 'Content',
      defaultValue: 'src-001',
    },
    {
      key: 'children',
      label: 'Content',
      type: 'text',
      group: 'Content',
      defaultValue: 'This content is synced across multiple pages.',
    },
    {
      key: 'editing',
      label: 'Editing',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(SyncedBlock, props as any),
};

registry.register(entry.id, entry);
