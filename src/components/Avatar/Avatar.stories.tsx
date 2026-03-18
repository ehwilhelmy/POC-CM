import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'Jane Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="Jane Doe" size="sm" />
      <Avatar name="Jane Doe" size="md" />
      <Avatar name="Jane Doe" size="lg" />
    </div>
  ),
};

export const ColorShowcase: Story = {
  render: () => {
    const names = [
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'Diana Prince',
      'Eve Torres',
      'Frank Castle',
    ];
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {names.map((name) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Avatar name={name} size="lg" />
            <span style={{ fontSize: 11, color: '#808080' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
