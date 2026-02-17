import type { Meta, StoryObj } from '@storybook/react-vite';
import { Campminder } from './Campminder';

const meta: Meta<typeof Campminder> = {
  title: 'Prototypes/Reports',
  component: Campminder,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Campminder>;

export const Reports: Story = {};
