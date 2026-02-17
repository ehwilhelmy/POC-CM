import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryToggle } from './CategoryToggle';

const meta: Meta<typeof CategoryToggle> = {
  title: 'Components/CategoryToggle',
  component: CategoryToggle,
};

export default meta;
type Story = StoryObj<typeof CategoryToggle>;

export const On: Story = {
  args: {
    label: 'Accounts',
    checked: true,
    onChange: () => {},
  },
};

export const Off: Story = {
  args: {
    label: 'Accounts',
    checked: false,
    onChange: () => {},
  },
};

export const AllCategories: Story = {
  render: () => {
    const categories = [
      'Accounts',
      'Administration',
      'Bunk Assignments',
      'Enrollment',
      'Financial',
      'Medical',
      'Parent Emails',
      'Travel',
      'User',
    ];
    const [enabled, setEnabled] = useState<Record<string, boolean>>(
      Object.fromEntries(categories.map(c => [c, true]))
    );
    return (
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {categories.map(cat => (
          <CategoryToggle
            key={cat}
            label={cat}
            checked={enabled[cat]}
            onChange={(val) => setEnabled(prev => ({ ...prev, [cat]: val }))}
          />
        ))}
      </div>
    );
  },
};
