import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ReportsPage } from '../Reports';

const meta: Meta<typeof ReportsPage> = {
  title: 'Prototypes/Reports',
  component: ReportsPage,
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
type Story = StoryObj<typeof ReportsPage>;

export const Reports: Story = {};
