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
      { label: 'Emily Richardson', value: '1', subtitle: 'Superior, CO' },
      { label: 'Emma Thompson', value: '2', subtitle: 'Boulder, CO' },
      { label: 'Ethan Walker', value: '3', subtitle: 'Denver, CO' },
      { label: 'Elena Martinez', value: '4', subtitle: 'Fort Collins, CO' },
      { label: 'Eric Chen', value: '5', subtitle: 'Lakewood, CO' },
      { label: 'Eva Nowak', value: '6', subtitle: 'Arvada, CO' },
    ];
    const results = value.length > 0
      ? allResults.filter(r => r.label.toLowerCase().includes(value.toLowerCase()))
      : [];
    return (
      <SearchBar
        placeholder="Search campers..."
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

/* ── Product options: "Open in new tab" demos ── */

const demoResults = [
  { label: 'Emily Richardson', value: '1', subtitle: 'Superior, CO' },
  { label: 'Emma Thompson', value: '2', subtitle: 'Boulder, CO' },
  { label: 'Ethan Walker', value: '3', subtitle: 'Denver, CO' },
  { label: 'Elena Martinez', value: '4', subtitle: 'Fort Collins, CO' },
  { label: 'Eric Chen', value: '5', subtitle: 'Lakewood, CO' },
];

export const OptionAClickOnly: Story = {
  name: 'Option A: Click Only',
  render: () => {
    const [value, setValue] = useState('Em');
    const filtered = demoResults.filter(r =>
      r.label.toLowerCase().includes(value.toLowerCase()),
    );
    return (
      <div style={{ paddingBottom: 300 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>
          Baseline — click navigates in same window, no new-tab affordance
        </p>
        <SearchBar
          placeholder="Search campers..."
          value={value}
          onChange={setValue}
          results={filtered}
          onSelect={(r) => alert(`Navigate to ${r.label}`)}
          onClear={() => setValue('')}
          newTabMode="none"
        />
      </div>
    );
  },
};

export const OptionBHoverIcon: Story = {
  name: 'Option B: Hover Icon',
  render: () => {
    const [value, setValue] = useState('Em');
    const filtered = demoResults.filter(r =>
      r.label.toLowerCase().includes(value.toLowerCase()),
    );
    return (
      <div style={{ paddingBottom: 300 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>
          Hover a result row to reveal the "open in new tab" icon on the right
        </p>
        <SearchBar
          placeholder="Search campers..."
          value={value}
          onChange={setValue}
          results={filtered}
          onSelect={(r) => alert(`Navigate to ${r.label}`)}
          onOpenNewTab={(r) => alert(`Open ${r.label} in new tab`)}
          onClear={() => setValue('')}
          newTabMode="hover-icon"
        />
      </div>
    );
  },
};

export const OptionDStaticIcon: Story = {
  name: 'Option D: Static Icon',
  render: () => {
    const [value, setValue] = useState('Em');
    const filtered = demoResults.filter(r =>
      r.label.toLowerCase().includes(value.toLowerCase()),
    );
    return (
      <div style={{ paddingBottom: 300 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>
          An always-visible icon on each row — opens the profile in a new tab / external page
        </p>
        <SearchBar
          placeholder="Search campers..."
          value={value}
          onChange={setValue}
          results={filtered}
          onSelect={(r) => alert(`Navigate to ${r.label}`)}
          onOpenNewTab={(r) => alert(`Open ${r.label} in new tab`)}
          onClear={() => setValue('')}
          newTabMode="static-icon"
        />
      </div>
    );
  },
};

export const OptionCRightClickMenu: Story = {
  name: 'Option C: Right-Click Menu',
  render: () => {
    const [value, setValue] = useState('Em');
    const filtered = demoResults.filter(r =>
      r.label.toLowerCase().includes(value.toLowerCase()),
    );
    return (
      <div style={{ paddingBottom: 300 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#808080' }}>
          Right-click a result row to see the custom context menu
        </p>
        <SearchBar
          placeholder="Search campers..."
          value={value}
          onChange={setValue}
          results={filtered}
          onSelect={(r) => alert(`Navigate to ${r.label}`)}
          onOpenNewTab={(r) => alert(`Open ${r.label} in new tab`)}
          onClear={() => setValue('')}
          newTabMode="context-menu"
        />
      </div>
    );
  },
};
