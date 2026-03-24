import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry } from '@libcss/studio';
import { BaseIcon, GitHubIcon, GoogleIcon } from '../../../src/components';

const ICON_COMPONENTS: Record<string, React.FC<any>> = {
  base: BaseIcon,
  github: GitHubIcon,
  google: GoogleIcon,
};

const ICON_TYPES = ['github', 'google', 'base'] as const;
const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const entry: ComponentEntry = {
  id: 'icon',
  name: 'Icon',
  category: 'atoms',
  description: 'Scalable icon wrapper with preset sizes and custom color support.',
  tags: ['icon', 'svg', 'graphic', 'symbol'],
  defaultProps: {
    size: 'md',
    color: '',
    iconType: 'github',
  },
  variantDimensions: [
    { prop: 'iconType', label: 'Icon', values: [...ICON_TYPES] },
    { prop: 'size', label: 'Size', values: [...ICON_SIZES] },
  ],
  presets: [
    // Icons × sizes auto-generated from variantDimensions
    // Additional state presets:
    { id: 'github-colored', label: 'GitHub Colored', props: { iconType: 'github', size: 'lg', color: '#333' }, group: 'Colored' },
    { id: 'google-colored', label: 'Google Colored', props: { iconType: 'google', size: 'lg', color: '#EA4335' }, group: 'Colored' },
    { id: 'base-accent', label: 'Base Accent', props: { iconType: 'base', size: 'lg', color: '#3b82f6' }, group: 'Colored' },
  ],
  controls: [
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'md',
      options: ICON_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })),
    },
    {
      key: 'iconType',
      label: 'Icon',
      type: 'select',
      group: 'Content',
      defaultValue: 'github',
      options: [
        { label: 'GitHub', value: 'github' },
        { label: 'Google', value: 'google' },
        { label: 'Base (placeholder)', value: 'base' },
      ],
    },
    {
      key: 'color',
      label: 'Color',
      type: 'color',
      group: 'Appearance',
      defaultValue: '',
    },
  ],
  render: (props) => {
    const { iconType, ...rest } = props as any;
    const Comp = ICON_COMPONENTS[iconType] ?? GitHubIcon;
    return React.createElement(Comp, rest);
  },
};

registry.register(entry.id, entry);
