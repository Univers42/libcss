import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Shared/Atoms/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Interactive: Story = {
  render: (args) => {
    const [isDark, setIsDark] = useState(false);
    return (
      <ThemeToggle
        {...args}
        isDark={isDark}
        onToggle={() => setIsDark(!isDark)}
      />
    );
  },
};

export const Dark: Story = {
  args: {
    isDark: true,
  },
};

export const Light: Story = {
  args: {
    isDark: false,
  },
};
