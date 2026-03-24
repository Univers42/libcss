import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { CitationReferences } from '../../../src/components';

const REFS_FULL = [
  { id: 'ref-1', number: 1, content: 'Smith, J. (2024). Introduction to Design Systems. O\'Reilly Media.' },
  { id: 'ref-2', number: 2, content: 'Johnson, A. (2023). CSS Architecture. A Book Apart.', url: 'https://example.com' },
  { id: 'ref-3', number: 3, content: 'Williams, R. (2022). Component-Driven Development. Manning.' },
];

const presets: VariantPreset[] = [
  { id: 'full', label: 'Full References', props: { title: 'References', references: REFS_FULL }, group: 'Variants' },
  { id: 'single', label: 'Single Reference', props: { title: 'Reference', references: [REFS_FULL[0]] }, group: 'Variants' },
  { id: 'bibliography', label: 'Bibliography', props: { title: 'Bibliography', references: REFS_FULL }, group: 'Content' },
];

const entry: ComponentEntry = {
  id: 'citation',
  name: 'Citation',
  category: 'atoms',
  description: 'Academic-style citation references with numbered markers.',
  tags: ['citation', 'reference', 'footnote', 'academic', 'bibliography'],
  defaultProps: {
    title: 'References',
    references: REFS_FULL,
  },
  presets,
  controls: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'References',
    },
  ],
  render: (props) => React.createElement(CitationReferences, props as any),
};

registry.register(entry.id, entry);
