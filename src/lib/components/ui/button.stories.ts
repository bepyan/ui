import type { Meta, StoryObj } from '@storybook/svelte';

import Button from './button.svelte';

const meta = {
  title: 'Design System/ui/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
