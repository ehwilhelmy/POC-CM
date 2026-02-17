import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    value: 'CM-2024-001',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '360px' }}>
      <TextInput label="Default" placeholder="Enter text..." />
      <TextInput label="With Helper" placeholder="Enter text..." helperText="This is helper text" />
      <TextInput label="Error State" value="bad input" error="This field has an error" />
      <TextInput label="Disabled" value="Can't edit this" disabled />
    </div>
  ),
};
