import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Table } from '../../../src/components';

const TABLE_DATA = {
  headers: ['Name', 'Role', 'Status'],
  rows: [
    ['Alice', 'Engineer', 'Active'],
    ['Bob', 'Designer', 'Active'],
    ['Charlie', 'Manager', 'Away'],
  ],
};

const presets: VariantPreset[] = [
  { id: 'default', label: 'Default', props: { ...TABLE_DATA }, group: 'Styles' },
  { id: 'striped', label: 'Striped', props: { ...TABLE_DATA, striped: true }, group: 'Styles' },
  { id: 'bordered', label: 'Bordered', props: { ...TABLE_DATA, bordered: true }, group: 'Styles' },
  { id: 'hoverable', label: 'Hoverable', props: { ...TABLE_DATA, hoverable: true }, group: 'Styles' },
  { id: 'compact', label: 'Compact', props: { ...TABLE_DATA, compact: true }, group: 'Layout' },
  { id: 'all-options', label: 'All Options', props: { ...TABLE_DATA, striped: true, bordered: true, hoverable: true, compact: true }, group: 'Combined' },
  { id: 'striped-bordered', label: 'Striped + Bordered', props: { ...TABLE_DATA, striped: true, bordered: true }, group: 'Combined' },
];

const entry: ComponentEntry = {
  id: 'table',
  name: 'Table',
  category: 'atoms',
  description: 'Data table with striped, bordered, hoverable, and compact variants.',
  tags: ['table', 'data', 'grid', 'rows', 'columns'],
  defaultProps: {
    ...TABLE_DATA,
    striped: false,
    bordered: false,
    hoverable: true,
    compact: false,
  },
  presets,
  controls: [
    {
      key: 'striped',
      label: 'Striped',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
    {
      key: 'bordered',
      label: 'Bordered',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
    {
      key: 'hoverable',
      label: 'Hoverable',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: true,
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Table, props as any),
};

registry.register(entry.id, entry);
