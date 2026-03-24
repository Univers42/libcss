import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Equation } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'emc2', label: 'E=mc²', props: { expression: 'E = mc²', inline: false }, group: 'Famous' },
  { id: 'quadratic', label: 'Quadratic', props: { expression: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}', inline: false }, group: 'Famous' },
  { id: 'euler', label: "Euler's Identity", props: { expression: 'e^{i\\pi} + 1 = 0', inline: false }, group: 'Famous' },
  { id: 'inline', label: 'Inline', props: { expression: 'a^2 + b^2 = c^2', inline: true }, group: 'Layout' },
  { id: 'numbered', label: 'Numbered', props: { expression: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}', inline: false, number: 1, label: 'Gauss Sum' }, group: 'Layout' },
];

const entry: ComponentEntry = {
  id: 'equation',
  name: 'Equation',
  category: 'atoms',
  description: 'Mathematical equation block with inline and numbered modes.',
  tags: ['equation', 'math', 'formula', 'latex', 'katex'],
  defaultProps: {
    expression: 'E = mc²',
    inline: false,
    label: '',
  },
  presets,
  controls: [
    {
      key: 'expression',
      label: 'Expression',
      type: 'text',
      group: 'Content',
      defaultValue: 'E = mc²',
    },
    {
      key: 'inline',
      label: 'Inline',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
    {
      key: 'number',
      label: 'Number',
      type: 'number',
      group: 'Content',
      defaultValue: 0,
      min: 0,
      max: 999,
    },
    {
      key: 'label',
      label: 'Label',
      type: 'text',
      group: 'Content',
      defaultValue: '',
    },
  ],
  render: (props) => {
    const p = { ...props };
    if (p.number === 0) delete p.number;
    return React.createElement(Equation, p as any);
  },
};

registry.register(entry.id, entry);
