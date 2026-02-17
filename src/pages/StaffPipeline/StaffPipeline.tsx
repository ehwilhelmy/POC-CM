import React, { useState, useMemo } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BlockIcon from '@mui/icons-material/Block';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarNav } from '../../components/SidebarNav';
import { TopNav } from '../../components/TopNav';
import { DataTable } from '../../components/DataTable';
import type { NavItem } from '../../components/SidebarNav';
import type { Column } from '../../components/DataTable';
import './StaffPipeline.css';

const navItems: NavItem[] = [
  { label: 'Home', icon: HomeIcon, href: '#' },
  { label: 'Reports', icon: SummarizeIcon, href: '#' },
  { label: 'Communication', icon: CampaignIcon, href: '#' },
  { label: 'Camper', icon: AccountCircleIcon, href: '#' },
  { label: 'Staff', icon: BadgeIcon, href: '#', active: true },
  { label: 'Alumni', icon: SchoolIcon, href: '#' },
  { label: 'Financial', icon: PaidIcon, href: '#' },
  { label: 'Accounts', icon: BookIcon, href: '#' },
  { label: 'Medical', icon: MedicalServicesIcon, href: '#' },
  { label: 'Travel', icon: DirectionsBusFilledIcon, href: '#' },
  { label: 'Scheduling', icon: EventIcon, href: '#' },
  { label: 'Admin', icon: SettingsIcon, href: '#' },
];

interface StaffMember {
  name: string;
  status: string;
  assignedTo: string;
  contractDaysOverdue: number;
  referencesChecked: string;
  position: string;
  stage: string;
}

const staffData: StaffMember[] = [
  { name: 'Ken Maynard', status: 'Contract Sent', assignedTo: '', contractDaysOverdue: 8, referencesChecked: '2/3', position: 'Bunk Counselor, Lifeguard', stage: 'Offer' },
  { name: 'Robert Jones', status: 'Contract Sent', assignedTo: '', contractDaysOverdue: 5, referencesChecked: '1/3', position: 'Bunk Counselor, Arts & Crafts', stage: 'Offer' },
  { name: 'Alicia Johnson', status: 'Contract Sent', assignedTo: '', contractDaysOverdue: 3, referencesChecked: '0/3', position: 'Bunk Counselor, Lifeguard', stage: 'Offer' },
  { name: 'John Hamelin', status: 'Contract Signed', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '3/3', position: 'Bunk Counselor, Division Head', stage: 'Offer' },
  { name: 'Anthony Perkins', status: 'Contract Signed', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '3/3', position: 'Bunk Counselor, Golf', stage: 'Offer' },
  { name: 'Sarah Mitchell', status: 'Application Received', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '0/3', position: 'Waterfront Director', stage: 'Review' },
  { name: 'David Chen', status: 'Under Review', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '0/3', position: 'Bunk Counselor, Archery', stage: 'Review' },
  { name: 'Emily Rodriguez', status: 'Under Review', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '1/3', position: 'Bunk Counselor, Swim', stage: 'Review' },
  { name: 'Marcus Williams', status: 'References Pending', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '2/3', position: 'Activity Specialist', stage: 'Review' },
  { name: 'Lisa Park', status: 'Interview Scheduled', assignedTo: '', contractDaysOverdue: 0, referencesChecked: '0/3', position: 'Bunk Counselor, Dance', stage: 'Interview' },
];

const columns: Column[] = [
  { key: 'name', label: 'NAME', sortable: true, linkColumn: true },
  { key: 'status', label: 'STATUS', sortable: true },
  { key: 'assignedTo', label: 'ASSIGNED TO', sortable: true },
  { key: 'contractDaysOverdue', label: 'CONTRACT DAYS OVERDUE', sortable: true },
  { key: 'referencesChecked', label: 'REFERENCES CHECKED', sortable: true },
  { key: 'position', label: 'POSITION', sortable: true },
];

interface StageTab {
  label: string;
  key: string;
  icon: React.ReactNode;
}

const stageTabs: StageTab[] = [
  { label: 'All', key: 'All', icon: null },
  { label: 'Review', key: 'Review', icon: <PersonSearchIcon style={{ fontSize: 16 }} /> },
  { label: 'Interview', key: 'Interview', icon: <VideoCallIcon style={{ fontSize: 16 }} /> },
  { label: 'Offer', key: 'Offer', icon: <LocalOfferIcon style={{ fontSize: 16 }} /> },
  { label: 'Declined', key: 'Declined', icon: <BlockIcon style={{ fontSize: 16 }} /> },
];

export const StaffPipeline: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredStaff = useMemo(() => {
    return staffData.filter(s => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.position.toLowerCase().includes(search.toLowerCase()) ||
        s.status.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'All' || s.stage === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { All: staffData.length };
    staffData.forEach(s => {
      counts[s.stage] = (counts[s.stage] || 0) + 1;
    });
    return counts;
  }, []);

  const tableData = filteredStaff.map(s => ({
    name: s.name,
    status: (
      <div className="cm-pipeline__status-cell">
        <select className="cm-pipeline__select" defaultValue={s.status}>
          <option>Contract Sent</option>
          <option>Contract Signed</option>
          <option>Application Received</option>
          <option>Under Review</option>
          <option>References Pending</option>
          <option>Interview Scheduled</option>
        </select>
      </div>
    ),
    assignedTo: (
      <div className="cm-pipeline__status-cell">
        <select className="cm-pipeline__select cm-pipeline__select--placeholder" defaultValue="">
          <option value="" disabled>Select a user</option>
          <option>Jane Smith</option>
          <option>Mike Johnson</option>
          <option>Sarah Davis</option>
        </select>
      </div>
    ),
    contractDaysOverdue: s.contractDaysOverdue,
    referencesChecked: s.referencesChecked,
    position: s.position,
  }));

  return (
    <div className="cm-app">
      <SidebarNav items={navItems} />
      <div className="cm-app__body">
        <TopNav pageTitle="Staff" />
        <main className="cm-app__main">
          {/* Breadcrumb */}
          <nav className="cm-pipeline__breadcrumb">
            <a href="#" className="cm-pipeline__breadcrumb-link">
              <HomeIcon style={{ fontSize: 16 }} />
            </a>
            <ChevronRightIcon style={{ fontSize: 14 }} className="cm-pipeline__breadcrumb-sep" />
            <a href="#" className="cm-pipeline__breadcrumb-link">Hiring Pipelines</a>
            <ChevronRightIcon style={{ fontSize: 14 }} className="cm-pipeline__breadcrumb-sep" />
            <span className="cm-pipeline__breadcrumb-current">Lifeguards</span>
          </nav>

          {/* Page header */}
          <div className="cm-pipeline__header">
            <div>
              <h1 className="cm-pipeline__title">Lifeguards</h1>
              <p className="cm-pipeline__description">
                Overview your hiring process tracking your candidates by stages and statuses.
              </p>
            </div>
          </div>

          {/* Search + actions */}
          <div className="cm-pipeline__toolbar">
            <div className="cm-pipeline__search">
              <input
                type="text"
                className="cm-pipeline__search-input"
                placeholder="Search by Name, Position or Status"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="cm-pipeline__search-icon" />
            </div>
            <button className="cm-pipeline__icon-btn" aria-label="Download">
              <FileDownloadIcon />
            </button>
          </div>

          {/* Stage tabs */}
          <div className="cm-pipeline__stages">
            {stageTabs.map(tab => (
              <button
                key={tab.key}
                className={`cm-pipeline__stage ${activeTab === tab.key ? 'cm-pipeline__stage--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon && <span className="cm-pipeline__stage-icon">{tab.icon}</span>}
                <span className="cm-pipeline__stage-count">{stageCounts[tab.key] || 0}</span>
                <span className="cm-pipeline__stage-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Table toolbar */}
          <div className="cm-pipeline__table-toolbar">
            <div className="cm-pipeline__table-actions">
              <button className="cm-pipeline__tool-btn" aria-label="Edit">
                <EditIcon style={{ fontSize: 18 }} />
              </button>
              <button className="cm-pipeline__tool-btn cm-pipeline__tool-btn--active" aria-label="Filter">
                <FilterListIcon style={{ fontSize: 18 }} />
              </button>
              <button className="cm-pipeline__tool-btn" aria-label="Columns">
                <ViewColumnIcon style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>

          {/* Data table */}
          <DataTable
            columns={columns}
            data={tableData}
            pageSize={25}
            showActions={false}
          />
        </main>
      </div>
    </div>
  );
};
