import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Shared/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Username',
    id: 'username',
    children: <input id="username" type="text" placeholder="Enter username..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    id: 'email',
    required: true,
    children: <input id="email" type="email" placeholder="example@mail.com" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    id: 'password',
    error: 'Password must be at least 8 characters long.',
    children: <input id="password" type="password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #f87171' }} />,
  },
};
