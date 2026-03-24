import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Image } from '../../../src/components';

const IMAGE_SIZES = ['sm', 'md', 'full'] as const;

const presets: VariantPreset[] = [
  ...IMAGE_SIZES.map((s) => ({
    id: s, label: s === 'full' ? 'Full' : s.toUpperCase(),
    props: { src: 'https://picsum.photos/800/400', alt: 'Sample', size: s },
    group: 'Sizes',
  })),
  { id: 'rounded', label: 'Rounded', props: { src: 'https://picsum.photos/800/400', alt: 'Rounded', rounded: true }, group: 'Styles' },
  { id: 'borderless', label: 'Borderless', props: { src: 'https://picsum.photos/800/400', alt: 'Borderless', borderless: true }, group: 'Styles' },
  { id: 'captioned', label: 'With Caption', props: { src: 'https://picsum.photos/800/400', alt: 'Captioned', caption: 'A beautiful landscape photo' }, group: 'Content' },
  { id: 'centered-rounded', label: 'Centered Rounded', props: { src: 'https://picsum.photos/800/400', alt: 'Centered', size: 'md', rounded: true, centered: true }, group: 'Combined' },
];

const entry: ComponentEntry = {
  id: 'image',
  name: 'Image',
  category: 'media',
  description: 'Responsive image with caption, size, and border variants.',
  tags: ['image', 'photo', 'picture', 'media', 'figure'],
  defaultProps: {
    src: 'https://picsum.photos/800/400',
    alt: 'Sample image',
    caption: 'A sample image with caption',
    size: 'full',
    rounded: false,
    borderless: false,
    centered: false,
  },
  variantDimensions: [
    { prop: 'size', label: 'Size', values: [...IMAGE_SIZES] },
  ],
  presets,
  controls: [
    {
      key: 'src',
      label: 'Source URL',
      type: 'text',
      group: 'Content',
      defaultValue: 'https://picsum.photos/800/400',
    },
    {
      key: 'alt',
      label: 'Alt Text',
      type: 'text',
      group: 'Content',
      defaultValue: 'Sample image',
    },
    {
      key: 'caption',
      label: 'Caption',
      type: 'text',
      group: 'Content',
      defaultValue: 'A sample image with caption',
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'full',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Full', value: 'full' },
      ],
    },
    {
      key: 'rounded',
      label: 'Rounded',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
    {
      key: 'borderless',
      label: 'Borderless',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
    {
      key: 'centered',
      label: 'Centered',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(Image, props as any),
};

registry.register(entry.id, entry);
