import type { Meta, StoryObj } from '@storybook/react';
import { StrengthBar } from './StrengthBar';

const meta: Meta<typeof StrengthBar> = {
  title: 'Shared/Atoms/StrengthBar',
  component: StrengthBar,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StrengthBar>;

export const Empty: Story = {
  args: {
    level: 0,
    label: 'Very Weak',
  },
};

export const Weak: Story = {
  args: {
    level: 1,
    label: 'Weak',
  },
};

export const Medium: Story = {
  args: {
    level: 2,
    label: 'Medium',
  },
};

export const Strong: Story = {
  args: {
    level: 3,
    label: 'Strong',
  },
};

export const VeryStrong: Story = {
  args: {
    level: 4,
    label: 'Very Strong',
  },
};
