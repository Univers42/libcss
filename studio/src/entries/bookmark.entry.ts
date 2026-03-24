import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Bookmark } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'basic', label: 'Basic', props: { url: 'https://example.com', title: 'Example Website', description: 'A simple bookmark.' }, group: 'Variants' },
  { id: 'full', label: 'Full Content', props: { url: 'https://github.com', title: 'GitHub', description: 'Where the world builds software. Millions of developers use GitHub.' }, group: 'Variants' },
  { id: 'minimal', label: 'Minimal', props: { url: 'https://example.com', title: 'Example', description: '' }, group: 'Variants' },
];

const entry: ComponentEntry = {
  id: 'bookmark',
  name: 'Bookmark',
  category: 'atoms',
  description: 'Web bookmark card with title, description, thumbnail, and favicon.',
  tags: ['bookmark', 'link', 'embed', 'preview', 'card', 'url'],
  defaultProps: {
    url: 'https://example.com',
    title: 'Example Website',
    description: 'This is a saved bookmark to an external resource with preview.',
    favicon: '',
    thumbnail: '',
  },
  presets,
  controls: [
    {
      key: 'url',
      label: 'URL',
      type: 'text',
      group: 'Content',
      defaultValue: 'https://example.com',
    },
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Example Website',
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      group: 'Content',
      defaultValue: 'This is a saved bookmark to an external resource.',
    },
  ],
  render: (props) => React.createElement(Bookmark, props as any),
};

registry.register(entry.id, entry);
