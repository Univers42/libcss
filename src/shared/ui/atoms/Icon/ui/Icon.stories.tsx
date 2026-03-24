import type { Meta, StoryObj } from '@storybook/react';
import { GitHubIcon } from './GitHubIcon';
import { GoogleIcon } from './GoogleIcon';
import { BaseIcon } from './BaseIcon';

const meta: Meta<typeof BaseIcon> = {
  title: 'Shared/Atoms/Icon',
  component: BaseIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

export const GitHub: StoryObj<typeof GitHubIcon> = {
  render: (args) => <GitHubIcon {...args} />,
  args: {
    size: 'md',
  },
};

export const Google: StoryObj<typeof GoogleIcon> = {
  render: (args) => <GoogleIcon {...args} />,
  args: {
    size: 'md',
  },
};

export const AllSizes: StoryObj<typeof GitHubIcon> = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <GitHubIcon size="sm" />
      <GitHubIcon size="md" />
      <GitHubIcon size="lg" />
      <GitHubIcon size="xl" />
    </div>
  ),
};
