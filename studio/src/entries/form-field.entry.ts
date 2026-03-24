import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { FormField } from '../../../src/components';

const presets: VariantPreset[] = [
  { id: 'default', label: 'Default', props: { label: 'Email address', placeholder: 'user@example.com' }, group: 'States' },
  { id: 'required', label: 'Required', props: { label: 'Password', required: true, placeholder: '••••••••' }, group: 'States' },
  { id: 'error', label: 'With Error', props: { label: 'Username', error: 'Username is already taken', required: true, placeholder: 'john_doe' }, group: 'States' },
  { id: 'filled', label: 'Filled', props: { label: 'Full Name', placeholder: 'John Doe' }, group: 'Content' },
  { id: 'long-error', label: 'Long Error', props: { label: 'Email', error: 'Please enter a valid email address with a domain name', required: true, placeholder: 'user@example.com' }, group: 'States' },
];

const entry: ComponentEntry = {
  id: 'form-field',
  name: 'Form Field',
  category: 'molecules',
  description: 'Labeled input wrapper with error state and required marker.',
  tags: ['form', 'field', 'input', 'label', 'error', 'validation'],
  defaultProps: {
    label: 'Email address',
    error: '',
    required: false,
    placeholder: 'user@example.com',
  },
  presets,
  controls: [
    {
      key: 'label',
      label: 'Label',
      type: 'text',
      group: 'Content',
      defaultValue: 'Email address',
    },
    {
      key: 'error',
      label: 'Error Message',
      type: 'text',
      group: 'State',
      defaultValue: '',
    },
    {
      key: 'required',
      label: 'Required',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      group: 'Content',
      defaultValue: 'user@example.com',
    },
  ],
  render: (props) => {
    const { placeholder, ...fieldProps } = props as any;
    return React.createElement(
      FormField,
      { ...fieldProps, id: 'demo-field' },
      React.createElement('input', {
        type: 'text',
        id: 'demo-field',
        placeholder,
        className: 'prisma-auth-input',
      }),
    );
  },
};

registry.register(entry.id, entry);
