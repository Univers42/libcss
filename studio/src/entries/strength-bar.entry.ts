import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry } from '@libcss/studio';
import { StrengthBar } from '../../../src/components';

const entry: ComponentEntry = {
  id: 'strength-bar',
  name: 'Strength Bar',
  category: 'atoms',
  description: 'Visual indicator for password or data strength levels.',
  tags: ['strength', 'password', 'indicator', 'progress', 'bar'],
  defaultProps: {
    level: 2,
    maxLevel: 3,
    label: 'Medium',
  },
  presets: [
    { id: 'empty', label: 'Empty', props: { level: 0, maxLevel: 3, label: 'None' }, group: 'Levels' },
    { id: 'weak', label: 'Weak', props: { level: 1, maxLevel: 3, label: 'Weak' }, group: 'Levels' },
    { id: 'medium', label: 'Medium', props: { level: 2, maxLevel: 3, label: 'Medium' }, group: 'Levels' },
    { id: 'strong', label: 'Strong', props: { level: 3, maxLevel: 3, label: 'Strong' }, group: 'Levels' },
    { id: 'scale-5', label: '5-Point Scale', props: { level: 3, maxLevel: 5, label: '3/5' }, group: 'Custom Scales' },
    { id: 'scale-10', label: '10-Point Scale', props: { level: 7, maxLevel: 10, label: '7/10' }, group: 'Custom Scales' },
  ],
  controls: [
    {
      key: 'level',
      label: 'Level',
      type: 'range',
      group: 'Value',
      defaultValue: 2,
      min: 0,
      max: 3,
      step: 1,
    },
    {
      key: 'maxLevel',
      label: 'Max Level',
      type: 'number',
      group: 'Value',
      defaultValue: 3,
      min: 1,
      max: 10,
    },
    {
      key: 'label',
      label: 'Label',
      type: 'text',
      group: 'Content',
      defaultValue: 'Medium',
    },
  ],
  render: (props) => React.createElement(StrengthBar, props as any),
};

registry.register(entry.id, entry);
