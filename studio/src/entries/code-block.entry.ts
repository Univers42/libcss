import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { CodeBlock } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'typescript', label: 'TypeScript', props: { code: 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}', language: 'typescript', showLineNumbers: true }, group: 'Languages' },
  { id: 'javascript', label: 'JavaScript', props: { code: 'const sum = (a, b) => a + b;\nconsole.log(sum(1, 2));', language: 'javascript', showLineNumbers: true }, group: 'Languages' },
  { id: 'css', label: 'CSS', props: { code: '.button {\n  background: var(--primary);\n  border-radius: 0.5rem;\n  padding: 0.5rem 1rem;\n}', language: 'css', showLineNumbers: true }, group: 'Languages' },
  { id: 'no-lines', label: 'No Line Numbers', props: { code: 'echo "Hello, World!"', language: 'bash', showLineNumbers: false }, group: 'Options' },
  { id: 'compact', label: 'Compact', props: { code: 'npm install libcss', language: 'bash', compact: true }, group: 'Options' },
  { id: 'highlighted', label: 'Highlighted Lines', props: { code: 'function add(a, b) {\n  // This line is highlighted\n  return a + b;\n}', language: 'javascript', showLineNumbers: true, highlightLines: [2] }, group: 'Options' },
];

const entry: ComponentEntry = {
  id: 'code-block',
  name: 'Code Block',
  category: 'atoms',
  description: 'Syntax-highlighted code block with line numbers and copy button.',
  tags: ['code', 'syntax', 'highlight', 'pre', 'snippet', 'programming'],
  defaultProps: {
    code: 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
    language: 'typescript',
    showLineNumbers: true,
    highlightLines: [2],
    mermaid: false,
    compact: false,
  },
  presets,
  controls: [
    {
      key: 'code',
      label: 'Code',
      type: 'text',
      group: 'Content',
      defaultValue: 'function greet(name) {\n  return `Hello, ${name}!`;\n}',
    },
    {
      key: 'language',
      label: 'Language',
      type: 'text',
      group: 'Content',
      defaultValue: 'typescript',
    },
    {
      key: 'showLineNumbers',
      label: 'Line Numbers',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: true,
    },
    {
      key: 'compact',
      label: 'Compact',
      type: 'boolean',
      group: 'Layout',
      defaultValue: false,
    },
    {
      key: 'mermaid',
      label: 'Mermaid',
      type: 'boolean',
      group: 'Appearance',
      defaultValue: false,
    },
  ],
  render: (props) => React.createElement(CodeBlock, props as any),
};

registry.register(entry.id, entry);
