import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with just body content. Use cards to group related information.',
  },
};

export const WithHeader: Story = {
  args: {
    title: 'Camper Details',
    subtitle: 'View and manage camper information',
    children: 'Card body content goes here.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Edit Profile',
    children: 'Form fields would go here...',
    footer: (
      <>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save Changes</Button>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    subtitle: 'This card has a drop shadow instead of a border',
    elevated: true,
    children: 'Elevated cards are great for content that should stand out.',
  },
};

export const StatCard: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card elevated>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary-default)' }}>247</div>
          <div style={{ fontSize: '14px', color: 'var(--color-medium-gray)', marginTop: '4px' }}>Total Campers</div>
        </div>
      </Card>
      <Card elevated>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-success)' }}>12</div>
          <div style={{ fontSize: '14px', color: 'var(--color-medium-gray)', marginTop: '4px' }}>Active Sessions</div>
        </div>
      </Card>
      <Card elevated>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-warning)' }}>34</div>
          <div style={{ fontSize: '14px', color: 'var(--color-medium-gray)', marginTop: '4px' }}>Pending Forms</div>
        </div>
      </Card>
    </div>
  ),
};
