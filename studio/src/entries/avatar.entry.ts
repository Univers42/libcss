import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Avatar } from '../../../src/components/atoms/Avatar';
import { AVATAR_SIZES, AVATAR_SHAPES } from '../../../src/components/atoms/Avatar/Avatar.constants';
import { defineParameters } from '../../../src/components/controls/schema';

const presets: VariantPreset[] = [
  ...AVATAR_SIZES.map((s) => ({
    id: `size-${s}`, label: s.toUpperCase(),
    props: { size: s, initials: 'DL' },
    group: 'Sizes',
  })),
  ...AVATAR_SHAPES.map((sh) => ({
    id: `shape-${sh}`, label: sh,
    props: { shape: sh, initials: 'DL' },
    group: 'Shapes',
  })),
  { id: 'with-status', label: 'Online', props: { initials: 'AB', status: 'online' }, group: 'Status' },
];

const entry: ComponentEntry = {
  id: 'avatar',
  name: 'Avatar',
  category: 'atoms',
  description: 'User avatar with image, initials fallback, and online/offline status indicator.',
  tags: ['avatar', 'user', 'profile', 'image'],
  defaultProps: { size: 'md', shape: 'circle', initials: 'DL' },
  presets,
  controls: [],
  parameters: defineParameters()
    .group('display', 'Display', { icon: '👤' })
      .text('src', 'Image URL', { defaultValue: '', placeholder: 'https://…' })
      .text('initials', 'Initials', { defaultValue: 'DL', placeholder: 'AB' })
    .group('style', 'Style', { icon: '🎨' })
      .select('size', 'Size', { defaultValue: 'md', options: AVATAR_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })) })
      .select('shape', 'Shape', { defaultValue: 'circle', options: AVATAR_SHAPES.map((sh) => ({ label: sh, value: sh })) })
    .build(),
  render: (props) => React.createElement(Avatar, props as any),
};

registry.register(entry.id, entry);
