import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Shared/Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    switchSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    id: 'notif-switch',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [isEnabled, setIsEnabled] = useState(false);
    return (
      <Switch
        {...args}
        checked={isEnabled}
        onChange={(e) => setIsEnabled(e.target.checked)}
        label={`System is ${isEnabled ? 'ON' : 'OFF'}`}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch switchSize="sm" label="Small Toggle" id="s1" />
      <Switch switchSize="md" label="Medium Toggle (Default)" id="s2" />
      <Switch switchSize="lg" label="Large Toggle" id="s3" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Checked state" checked readOnly id="s4" />
      <Switch label="Error state" hasError id="s5" />
      <Switch label="Disabled ON" disabled checked id="s6" />
      <Switch label="Disabled OFF" disabled id="s7" />
    </div>
  ),
};
