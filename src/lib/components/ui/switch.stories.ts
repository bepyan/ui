import type { Meta, StoryObj } from '@storybook/svelte';

import Switch from './switch.svelte';

const meta = {
  title: 'Design System/ui/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
