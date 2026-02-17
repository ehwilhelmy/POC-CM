import React, { useState } from 'react';
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
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { SidebarNav } from '../../components/SidebarNav';
import { TopNav } from '../../components/TopNav';
import { SidePanel } from '../../components/SidePanel';
import { CategoryToggle } from '../../components/CategoryToggle';
import type { NavItem } from '../../components/SidebarNav';
import './Campminder.css';

const navItems: NavItem[] = [
  { label: 'Home', icon: HomeIcon, href: '#' },
  { label: 'Reports', icon: SummarizeIcon, href: '#', active: true },
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

const tabs = [
  'All',
  'Favorites',
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

interface ReportItem {
  name: string;
  favorited: boolean;
  category: string;
}

const allReports: ReportItem[] = [
  { name: 'Customer Feedback Form', favorited: false, category: 'Accounts' },
  { name: 'Inventory', favorited: false, category: 'Accounts' },
  { name: 'Statements', favorited: false, category: 'Accounts' },
  { name: 'Status', favorited: false, category: 'Accounts' },
  { name: 'Tally Sheet', favorited: false, category: 'Accounts' },
  { name: 'Transaction Summary', favorited: false, category: 'Accounts' },
  { name: 'Transactions', favorited: false, category: 'Accounts' },
  { name: 'Hired Staff', favorited: false, category: 'Administration' },
  { name: 'Missing Photos', favorited: false, category: 'Administration' },
  { name: 'Notes', favorited: false, category: 'Administration' },
  { name: 'Staff Activity', favorited: false, category: 'Administration' },
  { name: 'Staff Lead/Assist', favorited: false, category: 'Administration' },
  { name: 'Summer Birthdays', favorited: true, category: 'Administration' },
  { name: 'Tagged Photos', favorited: false, category: 'Administration' },
  { name: 'Bunk Assignment Changes', favorited: false, category: 'Bunk Assignments' },
  { name: 'Bunk Assignments', favorited: true, category: 'Bunk Assignments' },
  { name: 'Bunk Photos', favorited: false, category: 'Bunk Assignments' },
  { name: 'Bunk Summary', favorited: false, category: 'Bunk Assignments' },
  { name: 'Camper/Staff Bunk Request', favorited: false, category: 'Bunk Assignments' },
  { name: 'Canteen Tally Sheets', favorited: false, category: 'Bunk Assignments' },
  { name: 'Missing Bunk Assignments', favorited: false, category: 'Bunk Assignments' },
  { name: 'Staff Housing List', favorited: false, category: 'Bunk Assignments' },
  { name: 'Table Assignments', favorited: false, category: 'Bunk Assignments' },
];

const categoryNames = [
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

export const Campminder: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [reports, setReports] = useState(allReports);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categoryNames.map(c => [c, true]))
  );

  const toggleFavorite = (name: string) => {
    setReports(prev =>
      prev.map(r => r.name === name ? { ...r, favorited: !r.favorited } : r)
    );
  };

  const toggleCategory = (category: string, checked: boolean) => {
    setEnabledCategories(prev => ({ ...prev, [category]: checked }));
  };

  const favoriteCount = reports.filter(r => r.favorited).length;

  const filteredReports = reports.filter(r => {
    if (!enabledCategories[r.category]) return false;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Favorites') return matchesSearch && r.favorited;
    return matchesSearch && r.category === activeTab;
  });

  const categories = activeTab === 'Favorites'
    ? [...new Set(filteredReports.map(r => r.category))]
    : activeTab === 'All'
      ? [...new Set(filteredReports.map(r => r.category))]
      : [activeTab];

  return (
    <div className="cm-app">
      <SidebarNav items={navItems} />
      <div className="cm-app__body">
        <TopNav pageTitle="Reports" />
        <main className="cm-app__main">
          {/* Toolbar */}
          <div className="cm-reports__toolbar">
            <div className="cm-reports__search">
              <input
                type="text"
                className="cm-reports__search-input"
                placeholder="Search Reports"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="cm-reports__search-icon" />
            </div>
            <button className="cm-reports__customize-btn" onClick={() => setCustomizeOpen(true)}>
              <TuneIcon fontSize="small" />
              Customize
            </button>
          </div>

          {/* Tabs */}
          <div className="cm-reports__tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`cm-reports__tab ${activeTab === tab ? 'cm-reports__tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === 'Favorites' && (
                  <span className="cm-reports__tab-badge">{favoriteCount}</span>
                )}
              </button>
            ))}
          </div>

          {/* Report sections */}
          <div className="cm-reports__sections">
            {categories.map(category => {
              const categoryReports = filteredReports.filter(r => r.category === category);
              if (categoryReports.length === 0) return null;
              return (
                <section key={category} className="cm-reports__section">
                  <h2 className="cm-reports__section-title">{category}</h2>
                  <div className="cm-reports__grid">
                    {categoryReports.map(report => (
                      <div key={report.name} className="cm-reports__card">
                        <div className="cm-reports__card-header">
                          <span className="cm-reports__card-name">{report.name}</span>
                          <button
                            className="cm-reports__star-btn"
                            onClick={() => toggleFavorite(report.name)}
                            aria-label={report.favorited ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {report.favorited
                              ? <StarIcon className="cm-reports__star--filled" fontSize="small" />
                              : <StarBorderIcon className="cm-reports__star--empty" fontSize="small" />
                            }
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>

      <SidePanel
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        title="Customize Report Categories"
        subtitle="Select which categories you'd like to see on this page."
      >
        <div className="cm-reports__category-list">
          {categoryNames.map(cat => (
            <CategoryToggle
              key={cat}
              label={cat}
              checked={enabledCategories[cat]}
              onChange={(checked) => toggleCategory(cat, checked)}
            />
          ))}
        </div>
      </SidePanel>
    </div>
  );
};
