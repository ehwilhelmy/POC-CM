import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNav } from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Components/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    pageTitle: 'Home',
  },
};

export const WithAvatar: Story = {
  args: {
    pageTitle: 'Home',
    avatarUrl: 'https://i.pravatar.cc/48',
  },
};

export const NoPageTitle: Story = {
  args: {},
};
