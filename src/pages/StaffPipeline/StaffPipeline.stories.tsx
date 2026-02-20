import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { StaffPipelinePage } from './StaffPipeline';

const meta: Meta<typeof StaffPipelinePage> = {
  title: 'Prototypes/Staff Pipeline',
  component: StaffPipelinePage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '24px 32px', fontFamily: 'var(--font-family-body)' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StaffPipelinePage>;

export const HiringPipeline: Story = {};
