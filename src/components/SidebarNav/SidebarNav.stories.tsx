import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarNav } from './SidebarNav';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import BookIcon from '@mui/icons-material/Book';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';

const meta: Meta<typeof SidebarNav> = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

const defaultItems = [
  { label: 'Home', icon: HomeIcon, href: '#', active: true },
  { label: 'Reports', icon: SummarizeIcon, href: '#' },
  { label: 'Communication', icon: CampaignIcon, href: '#' },
  { label: 'Camper', icon: AccountCircleIcon, href: '#' },
  { label: 'Staff', icon: BadgeIcon, href: '#' },
  { label: 'Alumni', icon: SchoolIcon, href: '#' },
  { label: 'Financial', icon: PaidIcon, href: '#' },
  { label: 'Accounts', icon: BookIcon, href: '#' },
  { label: 'Medical', icon: MedicalServicesIcon, href: '#' },
  { label: 'Travel', icon: DirectionsBusFilledIcon, href: '#' },
  { label: 'Scheduling', icon: EventIcon, href: '#' },
  { label: 'Admin', icon: SettingsIcon, href: '#' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    onToggleCollapse: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    items: defaultItems,
    collapsed: true,
    onToggleCollapse: () => {},
  },
};

export const ActiveCamper: Story = {
  args: {
    items: defaultItems.map(item =>
      item.label === 'Camper'
        ? { ...item, active: true }
        : { ...item, active: false }
    ),
    onToggleCollapse: () => {},
  },
};
