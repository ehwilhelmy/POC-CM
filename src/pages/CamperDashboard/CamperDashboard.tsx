import React, { useState } from 'react';
import { Search } from 'lucide-react';
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
import { SidebarNav } from '../../components/SidebarNav';
import { TopNav } from '../../components/TopNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { DataTable } from '../../components/DataTable';
import type { NavItem } from '../../components/SidebarNav';
import './CamperDashboard.css';

const navItems: NavItem[] = [
  { label: 'Home', icon: HomeIcon, href: '#' },
  { label: 'Reports', icon: SummarizeIcon, href: '#' },
  { label: 'Communication', icon: CampaignIcon, href: '#' },
  { label: 'Camper', icon: AccountCircleIcon, href: '#', active: true },
  { label: 'Staff', icon: BadgeIcon, href: '#' },
  { label: 'Alumni', icon: SchoolIcon, href: '#' },
  { label: 'Financial', icon: PaidIcon, href: '#' },
  { label: 'Accounts', icon: BookIcon, href: '#' },
  { label: 'Medical', icon: MedicalServicesIcon, href: '#' },
  { label: 'Travel', icon: DirectionsBusFilledIcon, href: '#' },
  { label: 'Scheduling', icon: EventIcon, href: '#' },
  { label: 'Admin', icon: SettingsIcon, href: '#' },
];

const columns = [
  { key: 'name', label: 'Camper Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'cabin', label: 'Cabin', sortable: true },
  { key: 'session', label: 'Session', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'var(--color-green-100)', text: 'var(--color-green-800)' },
    Registered: { bg: 'var(--color-blue-100)', text: 'var(--color-blue-800)' },
    Waitlisted: { bg: 'var(--color-orange-100)', text: 'var(--color-orange-800)' },
    Cancelled: { bg: 'var(--color-red-100)', text: 'var(--color-red-800)' },
  };
  const c = colors[status] || { bg: 'var(--color-neutral-200)', text: 'var(--color-neutral-800)' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      background: c.bg,
      color: c.text,
    }}>
      {status}
    </span>
  );
};

const camperData = [
  { name: 'Emma Johnson', age: 12, cabin: 'Pine', session: 'Summer A', status: <StatusBadge status="Active" /> },
  { name: 'Liam Smith', age: 11, cabin: 'Oak', session: 'Summer A', status: <StatusBadge status="Active" /> },
  { name: 'Olivia Williams', age: 13, cabin: 'Birch', session: 'Summer B', status: <StatusBadge status="Registered" /> },
  { name: 'Noah Brown', age: 10, cabin: 'Cedar', session: 'Summer A', status: <StatusBadge status="Active" /> },
  { name: 'Ava Davis', age: 12, cabin: 'Pine', session: 'Summer B', status: <StatusBadge status="Waitlisted" /> },
  { name: 'Ethan Wilson', age: 11, cabin: 'Oak', session: 'Summer A', status: <StatusBadge status="Active" /> },
  { name: 'Sophia Martinez', age: 14, cabin: 'Maple', session: 'Summer B', status: <StatusBadge status="Registered" /> },
  { name: 'Mason Anderson', age: 10, cabin: 'Cedar', session: 'Summer A', status: <StatusBadge status="Cancelled" /> },
  { name: 'Isabella Thomas', age: 13, cabin: 'Birch', session: 'Summer B', status: <StatusBadge status="Active" /> },
  { name: 'James Taylor', age: 12, cabin: 'Pine', session: 'Summer A', status: <StatusBadge status="Active" /> },
  { name: 'Mia Jackson', age: 11, cabin: 'Oak', session: 'Summer B', status: <StatusBadge status="Registered" /> },
  { name: 'Benjamin White', age: 14, cabin: 'Maple', session: 'Summer A', status: <StatusBadge status="Active" /> },
];

export const CamperDashboard: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="cm-dashboard">
      <SidebarNav items={navItems} />
      <div className="cm-dashboard__body">
        <TopNav pageTitle="Camper Management" />
        <main className="cm-dashboard__main">
        {/* Page Header */}
        <div className="cm-dashboard__header">
          <h1 className="cm-dashboard__title">Camper Management</h1>
          <Button variant="primary">Add Camper</Button>
        </div>

        {/* Stats Row */}
        <div className="cm-dashboard__stats">
          <Card elevated>
            <div className="cm-dashboard__stat">
              <div className="cm-dashboard__stat-value" style={{ color: 'var(--color-primary-default)' }}>247</div>
              <div className="cm-dashboard__stat-label">Total Campers</div>
            </div>
          </Card>
          <Card elevated>
            <div className="cm-dashboard__stat">
              <div className="cm-dashboard__stat-value" style={{ color: 'var(--color-success)' }}>12</div>
              <div className="cm-dashboard__stat-label">Active Sessions</div>
            </div>
          </Card>
          <Card elevated>
            <div className="cm-dashboard__stat">
              <div className="cm-dashboard__stat-value" style={{ color: 'var(--color-warning)' }}>34</div>
              <div className="cm-dashboard__stat-label">Pending Forms</div>
            </div>
          </Card>
        </div>

        {/* Search/Filter Bar */}
        <div className="cm-dashboard__toolbar">
          <div className="cm-dashboard__search">
            <Search size={18} className="cm-dashboard__search-icon" />
            <TextInput
              placeholder="Search campers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={camperData} pageSize={10} />
      </main>
      </div>
    </div>
  );
};
