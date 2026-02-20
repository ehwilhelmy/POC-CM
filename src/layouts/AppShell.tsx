import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import { SidebarNav } from '../components/SidebarNav';
import { TopNav } from '../components/TopNav';
import type { NavItem } from '../components/SidebarNav';
import './AppShell.css';

const routeMap: Record<string, string> = {
  'Home': '/',
  'Reports': '/reports',
  'Communication': '/communication',
  'Camper': '/camper',
  'Staff': '/staff/pipeline',
  'Alumni': '/alumni',
  'Financial': '/financial',
  'Accounts': '/accounts',
  'Medical': '/medical',
  'Travel': '/travel',
  'Scheduling': '/scheduling',
  'Admin': '/admin',
};

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/reports': 'Reports',
  '/staff/pipeline': 'Staff',
  '/communication': 'Communication',
  '/camper': 'Camper',
  '/alumni': 'Alumni',
  '/financial': 'Financial',
  '/accounts': 'Accounts',
  '/medical': 'Medical',
  '/travel': 'Travel',
  '/scheduling': 'Scheduling',
  '/admin': 'Admin',
};

const baseNavItems: Omit<NavItem, 'active' | 'href'>[] = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Reports', icon: SummarizeIcon },
  { label: 'Communication', icon: CampaignIcon },
  { label: 'Camper', icon: AccountCircleIcon },
  { label: 'Staff', icon: BadgeIcon },
  { label: 'Alumni', icon: SchoolIcon },
  { label: 'Financial', icon: PaidIcon },
  { label: 'Accounts', icon: BookIcon },
  { label: 'Medical', icon: MedicalServicesIcon },
  { label: 'Travel', icon: DirectionsBusFilledIcon },
  { label: 'Scheduling', icon: EventIcon },
  { label: 'Admin', icon: SettingsIcon },
];

export const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = baseNavItems.map(item => {
    const route = routeMap[item.label] || '#';
    const isActive = location.pathname === route ||
      (route !== '/' && location.pathname.startsWith(route));
    return {
      ...item,
      href: route,
      active: isActive,
    };
  });

  const pageTitle = pageTitles[location.pathname] || 'CampMinder';

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div className="cm-app">
      <SidebarNav
        items={navItems}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onNavigate={handleNavigate}
      />
      <div className="cm-app__body">
        <TopNav pageTitle={pageTitle} />
        <main className="cm-app__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
