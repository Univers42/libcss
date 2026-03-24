import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry } from '@libcss/studio';
import { InfoPanel } from '../../../src/components';

const DEMO_FEATURES = [
  { text: 'End-to-end encryption' },
  { text: 'Real-time collaboration' },
  { text: 'Unlimited cloud storage' },
];

const DEMO_STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: '50M+', label: 'Users' },
  { value: '120+', label: 'Countries' },
];

const entry: ComponentEntry = {
  id: 'info-panel',
  name: 'Info Panel',
  category: 'molecules',
  description: 'Marketing panel with title, subtitle, feature list, and stats grid.',
  tags: ['info', 'panel', 'features', 'stats', 'marketing', 'hero'],
  defaultProps: {
    title: 'Build faster, ship smarter',
    subtitle: 'Everything you need to create world-class applications.',
    featureCount: 3,
    statCount: 3,
  },
  presets: [
    { id: 'full', label: 'Full Panel', props: { featureCount: 3, statCount: 3 }, group: 'Configurations' },
    { id: 'features-only', label: 'Features Only', props: { featureCount: 3, statCount: 0 }, group: 'Configurations' },
    { id: 'stats-only', label: 'Stats Only', props: { featureCount: 0, statCount: 3 }, group: 'Configurations' },
    { id: 'minimal', label: 'Minimal', props: { featureCount: 1, statCount: 1 }, group: 'Configurations' },
    { id: 'title-only', label: 'Title Only', props: { featureCount: 0, statCount: 0, subtitle: '' }, group: 'Configurations' },
    { id: 'custom-title', label: 'Custom Branding', props: { title: 'Your Brand', subtitle: 'Empowering developers worldwide.', featureCount: 2, statCount: 2 }, group: 'Branding' },
  ],
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Build faster, ship smarter',
    },
    {
      key: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      group: 'Content',
      defaultValue: 'Everything you need to create world-class applications.',
    },
    {
      key: 'featureCount',
      label: 'Features',
      type: 'range',
      group: 'Data',
      defaultValue: 3,
      min: 0,
      max: 3,
      step: 1,
    },
    {
      key: 'statCount',
      label: 'Stats',
      type: 'range',
      group: 'Data',
      defaultValue: 3,
      min: 0,
      max: 3,
      step: 1,
    },
  ],
  render: (props) => {
    const fp = props as any;
    return React.createElement(InfoPanel, {
      title: fp.title,
      subtitle: fp.subtitle,
      features: DEMO_FEATURES.slice(0, fp.featureCount ?? 3),
      stats: DEMO_STATS.slice(0, fp.statCount ?? 3),
    });
  },
};

registry.register(entry.id, entry);
