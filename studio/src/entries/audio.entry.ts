import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Audio } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'default', label: 'Default', props: { title: 'Audio Track', artist: 'Unknown Artist' }, group: 'Variants' },
  { id: 'compact', label: 'Compact', props: { title: 'Audio Track', artist: 'Unknown Artist', compact: true }, group: 'Variants' },
  { id: 'podcast', label: 'Podcast', props: { title: 'Episode 42: Design Systems', artist: 'Tech Talk Podcast' }, group: 'Content' },
  { id: 'music', label: 'Music Track', props: { title: 'Midnight City', artist: 'M83' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'audio',
  name: 'Audio',
  category: 'media',
  description: 'Compact audio player bar with title, artist, and playback controls.',
  tags: ['audio', 'player', 'music', 'podcast', 'sound', 'media'],
  defaultProps: {
    src: '',
    title: 'Audio Track',
    artist: 'Unknown Artist',
    compact: false,
  },
  presets,
  controls: [
    {
      key: 'src',
      label: 'Source URL',
      type: 'text',
      group: 'Content',
      defaultValue: '',
    },
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Audio Track',
    },
    {
      key: 'artist',
      label: 'Artist',
      type: 'text',
      group: 'Content',
      defaultValue: 'Unknown Artist',
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Audio, props as any),
};

registry.register(entry.id, entry);
