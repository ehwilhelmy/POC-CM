import type { Meta, StoryObj } from '@storybook/react-vite';
import { CamperDashboard } from './CamperDashboard';

const meta: Meta<typeof CamperDashboard> = {
  title: 'Pages/CamperDashboard',
  component: CamperDashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CamperDashboard>;

export const Default: Story = {};
