import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { FileAttachment } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'pdf', label: 'PDF File', props: { name: 'design-spec.pdf', size: '2.4 MB', icon: '📄', href: '#' }, group: 'File Types' },
  { id: 'image', label: 'Image File', props: { name: 'screenshot.png', size: '1.2 MB', icon: '🖼️', href: '#' }, group: 'File Types' },
  { id: 'archive', label: 'Archive', props: { name: 'project.zip', size: '45.6 MB', icon: '📦', href: '#' }, group: 'File Types' },
  { id: 'compact', label: 'Compact', props: { name: 'notes.txt', size: '4 KB', icon: '📝', href: '#', compact: true }, group: 'Layout' },
  { id: 'large-file', label: 'Large File', props: { name: 'database-backup.sql', size: '1.2 GB', icon: '💾', href: '#' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'file-attachment',
  name: 'File Attachment',
  category: 'media',
  description: 'Downloadable file row with icon, name, size, and download action.',
  tags: ['file', 'attachment', 'download', 'document', 'media'],
  defaultProps: {
    name: 'design-spec.pdf',
    size: '2.4 MB',
    href: '#',
    icon: '📎',
    compact: false,
  },
  presets,
  controls: [
    {
      key: 'name',
      label: 'File Name',
      type: 'text',
      group: 'Content',
      defaultValue: 'design-spec.pdf',
    },
    {
      key: 'size',
      label: 'File Size',
      type: 'text',
      group: 'Content',
      defaultValue: '2.4 MB',
    },
    {
      key: 'icon',
      label: 'Icon',
      type: 'text',
      group: 'Appearance',
      defaultValue: '📎',
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(FileAttachment, props as any),
};

registry.register(entry.id, entry);
