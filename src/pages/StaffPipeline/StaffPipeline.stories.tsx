import type { Meta, StoryObj } from '@storybook/react-vite';
import { StaffPipeline } from './StaffPipeline';

const meta: Meta<typeof StaffPipeline> = {
  title: 'Prototypes/Staff Pipeline',
  component: StaffPipeline,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof StaffPipeline>;

export const HiringPipeline: Story = {};
