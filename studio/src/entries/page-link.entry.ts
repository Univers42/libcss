import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { PageLink } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'default', label: 'Default', props: { title: 'Getting Started', icon: '📄', href: '#' }, group: 'Variants' },
  { id: 'compact', label: 'Compact', props: { title: 'Quick Start', icon: '⚡', href: '#', compact: true }, group: 'Variants' },
  { id: 'docs', label: 'Documentation', props: { title: 'API Reference', icon: '📚', href: '#' }, group: 'Content' },
  { id: 'settings', label: 'Settings', props: { title: 'Configuration', icon: '⚙️', href: '#' }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'page-link',
  name: 'Page Link',
  category: 'atoms',
  description: 'Sub-page navigation link with icon and hover arrow.',
  tags: ['page', 'link', 'subpage', 'navigation', 'reference'],
  defaultProps: {
    title: 'Getting Started',
    icon: '📄',
    href: '#',
    compact: false,
  },
  presets,
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'Getting Started',
    },
    {
      key: 'icon',
      label: 'Icon',
      type: 'text',
      group: 'Appearance',
      defaultValue: '📄',
    },
    {
      key: 'href',
      label: 'Href',
      type: 'text',
      group: 'Content',
      defaultValue: '#',
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(PageLink, props as any),
};

registry.register(entry.id, entry);
