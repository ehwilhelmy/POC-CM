import React from 'react';
import {
  Description,
  People,
  ContentPaste,
  LocalOffer,
  MedicalServices,
  Person,
  Phone,
  Contacts,
  AttachMoney,
  AccountBalance,
  EmojiEvents,
  VolunteerActivism,
  Email,
  Article,
  Videocam,
  PhotoLibrary,
  ShoppingCart,
  PeopleAlt,
  CreditCard,
  ChevronRight,
} from '@mui/icons-material';
import campBg from '@/assets/camp-bg.jpeg';
import campLogo from '@/assets/camp-tall-pines-logo.svg';
import './CampInTouchDashboard.css';

interface DashboardLink {
  icon: typeof Description;
  iconColor: string;
  label: string;
}

interface DashboardSection {
  title: string;
  links: DashboardLink[];
}

const SECTIONS: DashboardSection[] = [
  {
    title: 'Forms Dashboard',
    links: [
      { icon: Description, iconColor: '#2d6a4f', label: 'Forms & Documents' },
      { icon: People, iconColor: '#2d6a4f', label: 'Camper Referral Form' },
    ],
  },
  {
    title: 'Your Camper',
    links: [
      { icon: ContentPaste, iconColor: '#5a7d9a', label: 'Camper Application' },
      { icon: LocalOffer, iconColor: '#c2782a', label: 'Camper Clothing Labels' },
      { icon: MedicalServices, iconColor: '#b0413e', label: 'Camper Medication Review' },
      { icon: Person, iconColor: '#c2782a', label: 'Camper Information' },
      { icon: Phone, iconColor: '#2d6a4f', label: 'Phone Reservation System' },
    ],
  },
  {
    title: 'Your Family',
    links: [
      { icon: Contacts, iconColor: '#5a7d9a', label: 'Contact Information' },
      { icon: AttachMoney, iconColor: '#b0413e', label: 'Financial Management' },
      { icon: AccountBalance, iconColor: '#2d6a4f', label: 'View Accounts' },
    ],
  },
  {
    title: 'Your Account',
    links: [
      { icon: EmojiEvents, iconColor: '#c2782a', label: 'CampStamps (20 remaining)' },
      { icon: VolunteerActivism, iconColor: '#b0413e', label: 'Online Donations' },
    ],
  },
  {
    title: 'Online Community',
    links: [
      { icon: Email, iconColor: '#5a7d9a', label: 'Email' },
      { icon: Article, iconColor: '#5a7d9a', label: 'News' },
      { icon: Videocam, iconColor: '#5a7d9a', label: 'Video' },
      { icon: PhotoLibrary, iconColor: '#5a7d9a', label: 'Photos' },
      { icon: ShoppingCart, iconColor: '#5a7d9a', label: 'Cart' },
      { icon: PeopleAlt, iconColor: '#5a7d9a', label: 'Guest Accounts' },
      { icon: CreditCard, iconColor: '#5a7d9a', label: 'CampStamps Payment' },
    ],
  },
];

interface CampInTouchDashboardProps {
  firstName?: string;
  onHome?: () => void;
  onRestart?: () => void;
  onBackToFlows?: () => void;
}

export const CampInTouchDashboard: React.FC<CampInTouchDashboardProps> = ({
  firstName = 'Jane',
  onHome,
  onRestart,
  onBackToFlows,
}) => {
  return (
    <div className="cm-cit-dash">
      {/* Top branded nav bar */}
      <header className="cm-cit-dash__topbar">
        <div className="cm-cit-dash__topbar-inner">
          <div className="cm-cit-dash__topbar-brand">
            <img src={campLogo} alt="Camp Tall Pines" className="cm-cit-dash__topbar-logo" />
            <div className="cm-cit-dash__topbar-name">
              <span className="cm-cit-dash__topbar-name-sub">Camp</span>
              <span className="cm-cit-dash__topbar-name-main">Tall Pines</span>
            </div>
          </div>
          <div className="cm-cit-dash__topbar-right">
            <span className="cm-cit-dash__topbar-phone">(518) 555-0142</span>
            <button
              className="cm-cit-dash__topbar-home"
              onClick={onHome}
              type="button"
            >
              Home
            </button>
          </div>
        </div>
      </header>

      <div
        className="cm-cit-dash__body"
        style={{ backgroundImage: `url(${campBg})` }}
      >
      <div className="cm-cit-dash__card">
        {/* Top nav */}
        <nav className="cm-cit-dash__nav">
          <div className="cm-cit-dash__nav-left">
            <span className="cm-cit-dash__nav-link">Email</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">News</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">Videos</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">Photos</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">Cart</span>
          </div>
          <div className="cm-cit-dash__nav-right">
            <span className="cm-cit-dash__nav-link">My Account</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">Help</span>
            <span className="cm-cit-dash__nav-sep">|</span>
            <span className="cm-cit-dash__nav-link">Log Out</span>
          </div>
        </nav>

        <div className="cm-cit-dash__not-you">
          Not {firstName}? <span className="cm-cit-dash__nav-link">Click here</span>
        </div>

        {/* Welcome */}
        <h1 className="cm-cit-dash__welcome">
          Hi {firstName}, welcome to your Camp Tall Pines account!
        </h1>

        {/* Forms alert */}
        <div className="cm-cit-dash__alert">
          <div className="cm-cit-dash__alert-header">Forms</div>
          <div className="cm-cit-dash__alert-body">
            Don&rsquo;t forget to fill out your forms; they are due may 31.
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div className="cm-cit-dash__section" key={section.title}>
            <h2 className="cm-cit-dash__section-title">{section.title}</h2>
            <div className="cm-cit-dash__link-group">
              {section.links.map((link) => (
                <div className="cm-cit-dash__link-row" key={link.label}>
                  <link.icon
                    className="cm-cit-dash__link-icon"
                    style={{ color: link.iconColor }}
                    fontSize="small"
                  />
                  <span className="cm-cit-dash__link-label">{link.label}</span>
                  <ChevronRight className="cm-cit-dash__link-chevron" fontSize="small" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Prototype nav */}
        {(onRestart || onBackToFlows) && (
          <div className="cm-cit-dash__proto-nav">
            {onRestart && (
              <button className="cm-cit-dash__proto-link" onClick={onRestart}>
                Restart flow
              </button>
            )}
            {onBackToFlows && (
              <button className="cm-cit-dash__proto-link" onClick={onBackToFlows}>
                &larr; Back to all flows
              </button>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
