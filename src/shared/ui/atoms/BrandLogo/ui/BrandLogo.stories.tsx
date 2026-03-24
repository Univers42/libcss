import type { Meta, StoryObj } from '@storybook/react';
import { BrandLogo } from './BrandLogo';

const meta: Meta<typeof BrandLogo> = {
  title: 'Shared/Atoms/BrandLogo',
  component: BrandLogo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BrandLogo>;

export const Default: Story = {
  args: {
    title: 'Prismatica',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'My Custom App',
  },
};
