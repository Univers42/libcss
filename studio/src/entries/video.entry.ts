import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Video } from '../../../src/components';

const ASPECT_RATIOS = ['16:9', '4:3', '1:1', '21:9'] as const;

const presets: VariantPreset[] = [
  ...ASPECT_RATIOS.map((a) => ({
    id: `aspect-${a.replace(':', 'x')}`, label: a,
    props: { aspect: a, caption: `${a} aspect ratio` },
    group: 'Aspect Ratios',
  })),
  { id: 'borderless', label: 'Borderless', props: { aspect: '16:9', borderless: true, caption: 'No border' }, group: 'Styles' },
  { id: 'captioned', label: 'With Caption', props: { aspect: '16:9', caption: 'An embedded video player' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'video',
  name: 'Video',
  category: 'media',
  description: 'Responsive video player with aspect ratio and caption support.',
  tags: ['video', 'player', 'media', 'embed', 'responsive'],
  defaultProps: {
    src: '',
    caption: 'Sample video caption',
    aspect: '16:9',
    borderless: false,
  },
  variantDimensions: [
    { prop: 'aspect', label: 'Aspect Ratio', values: [...ASPECT_RATIOS] },
  ],
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
      key: 'caption',
      label: 'Caption',
      type: 'text',
      group: 'Content',
      defaultValue: 'Sample video caption',
    },
    {
      key: 'aspect',
      label: 'Aspect Ratio',
      type: 'select',
      group: 'Appearance',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
        { label: '21:9', value: '21:9' },
      ],
    },
    {
      key: 'borderless',
      label: 'Borderless',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Video, props as any),
};

registry.register(entry.id, entry);
