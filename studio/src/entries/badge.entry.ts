import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Badge } from '../../../src/components/atoms/Badge';
import { BADGE_VARIANTS, BADGE_SIZES } from '../../../src/components/atoms/Badge/Badge.constants';
import { defineParameters } from '../../../src/components/controls/schema';

const presets: VariantPreset[] = [
  ...BADGE_VARIANTS.flatMap((v) => BADGE_SIZES.map((s) => ({
    id: `${v}-${s}`, label: `${v} ${s}`,
    props: { variant: v, size: s, children: `${v} ${s}` },
    group: 'Variant × Size',
  }))),
  { id: 'pill', label: 'Pill', props: { pill: true, children: 'Pill Badge' }, group: 'Styles' },
  { id: 'outline', label: 'Outline', props: { variant: 'primary', outline: true, children: 'Outline' }, group: 'Styles' },
  { id: 'dot', label: 'With Dot', props: { dot: true, children: 'Notification' }, group: 'Styles' },
];

const entry: ComponentEntry = {
  id: 'badge',
  name: 'Badge',
  category: 'atoms',
  description: 'Inline status badge with variant, size, pill, outline, and dot indicator support.',
  tags: ['badge', 'tag', 'label', 'status'],
  defaultProps: { variant: 'default', size: 'md', children: 'Badge' },
  presets,
  controls: [],
  parameters: defineParameters()
    .group('appearance', 'Appearance', { icon: '🎨' })
      .select('variant', 'Variant', {
        defaultValue: 'default',
        options: BADGE_VARIANTS.map((v) => ({ label: v[0]!.toUpperCase() + v.slice(1), value: v })),
      })
      .select('size', 'Size', {
        defaultValue: 'md',
        options: BADGE_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })),
      })
    .group('style', 'Style', { icon: '✨' })
      .boolean('pill', 'Pill', { defaultValue: false })
      .boolean('outline', 'Outline', { defaultValue: false })
      .boolean('dot', 'Dot', { defaultValue: false })
    .group('content', 'Content', { icon: '📝' })
      .text('children', 'Label', { defaultValue: 'Badge', placeholder: 'Badge text…' })
    .build(),
  render: (props) => React.createElement(Badge, props as any),
};

registry.register(entry.id, entry);
