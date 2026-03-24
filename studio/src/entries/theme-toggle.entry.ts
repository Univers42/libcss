import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { ThemeToggle } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'light-mode', label: 'Light Mode', props: { isDark: false }, group: 'States' },
  { id: 'dark-mode', label: 'Dark Mode', props: { isDark: true }, group: 'States' },
];

const entry: ComponentEntry = {
  id: 'theme-toggle',
  name: 'Theme Toggle',
  category: 'atoms',
  description: 'Light/dark mode switcher with sun/moon icon transition.',
  tags: ['theme', 'dark', 'light', 'toggle', 'switch', 'mode'],
  defaultProps: {
    isDark: false,
  },
  presets,
  controls: [
    {
      key: 'isDark',
      label: 'Dark Mode',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
  ],
  render: (props) => {
    // ThemeToggle requires onToggle — we provide a no-op here;
    // the playground state handles the actual toggling.
    return React.createElement(ThemeToggle, {
      isDark: props.isDark as boolean,
      onToggle: () => {},
    });
  },
};

registry.register(entry.id, entry);
