import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidePanel } from './SidePanel';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel',
  component: SidePanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: '100vh', padding: 32 }}>
        <button onClick={() => setOpen(true)}>Open Panel</button>
        <SidePanel
          open={open}
          onClose={() => setOpen(false)}
          title="Customize Report Categories"
          subtitle="Select which categories you'd like to see on this page."
        >
          <p>Panel body content here</p>
        </SidePanel>
      </div>
    );
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Panel Title',
    children: <p>Content</p>,
  },
};
