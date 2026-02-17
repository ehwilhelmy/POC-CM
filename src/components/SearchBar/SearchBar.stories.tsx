import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search Reports',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder text',
    disabled: true,
  },
};

export const WithResults: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const allResults = [
      { label: 'Result 1', value: '1' },
      { label: 'Result 2', value: '2' },
      { label: 'Result 3', value: '3' },
      { label: 'Result 4', value: '4' },
      { label: 'Result 5', value: '5' },
      { label: 'Result 6', value: '6' },
    ];
    const results = value.length > 0
      ? allResults.filter(r => r.label.toLowerCase().includes(value.toLowerCase()))
      : [];
    return (
      <SearchBar
        placeholder="Search term entered"
        value={value}
        onChange={setValue}
        results={results}
        onSelect={(r) => { setValue(r.label); }}
        onClear={() => setValue('')}
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('Re');
    return (
      <SearchBar
        placeholder="Search..."
        value={value}
        onChange={setValue}
        loading={value.length > 0}
        onClear={() => setValue('')}
      />
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>Default</p>
        <SearchBar placeholder="Placeholder text" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>Disabled</p>
        <SearchBar placeholder="Placeholder text" disabled />
      </div>
    </div>
  ),
};
