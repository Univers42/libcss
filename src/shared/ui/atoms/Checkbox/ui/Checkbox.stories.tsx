import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Shared/Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checkboxSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I accept the terms and conditions',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label={`Checkbox is ${checked ? 'Checked' : 'Unchecked'}`}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox checkboxSize="sm" label="Small Checkbox" />
      <Checkbox checkboxSize="md" label="Medium Checkbox" />
      <Checkbox checkboxSize="lg" label="Large Checkbox" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Accept terms (Required)',
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cannot change this',
    disabled: true,
    checked: true,
  },
};
