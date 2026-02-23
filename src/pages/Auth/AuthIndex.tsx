import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-color.svg';
import './AuthIndex.css';

interface FlowCard {
  id: number;
  title: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  tag: string;
}

const journeys: FlowCard[] = [
  {
    id: 1,
    title: 'New Caretaker',
    description:
      'Gets invite from camp, visits camp website, registers, creates account, gets verified, lands in portal.',
    route: '/auth/new-parent',
    icon: <PersonAddIcon />,
    tag: 'Multi-Step Friction',
  },
  {
    id: 2,
    title: 'Returning Caretaker',
    description:
      'Returns to camp site, signs in. Success path + error paths (wrong password, confusion).',
    route: '/auth/returning-parent',
    icon: <LoginIcon />,
    tag: 'Branding & Identity',
  },
  {
    id: 3,
    title: 'Forgot Password',
    description:
      'Can\'t remember password, reset flow, branded emails, back to login.',
    route: '/auth/forgot-password',
    icon: <LockResetIcon />,
    tag: 'Account Status Confusion',
  },
  // Migrated Caretaker hidden — backend concern, not a user-facing flow for testing
  // Route still exists at /auth/migrated if needed
  {
    id: 4,
    title: 'Guest Account',
    description:
      'Non-primary caretaker (grandparent, co-parent) gets an invite. Different flow, different confusion.',
    route: '/auth/guest',
    icon: <SupervisorAccountIcon />,
    tag: 'Broken Messages',
  },
{
    id: 5,
    title: 'Campanion App',
    description:
      'Parent opens the Campanion mobile app and logs in via Auth0. One login, all their camps — Campanion branding gives multi-camp context.',
    route: '/auth/campanion',
    icon: <PhoneIphoneIcon />,
    tag: 'Branding & Identity',
  },
];

const tools: FlowCard[] = [
  {
    id: 6,
    title: 'Branded Emails',
    description: 'Preview camp-branded transactional emails: verification, password reset, invitation.',
    route: '/auth/emails',
    icon: <EmailIcon />,
    tag: 'Reference',
  },
  {
    id: 7,
    title: 'Account Lookup',
    description: 'Camp staff tool to search parent email and see account status.',
    route: '/auth/account-lookup',
    icon: <ManageSearchIcon />,
    tag: 'Reference',
  },
  {
    id: 8,
    title: 'Expired Link',
    description: 'What parents see when a verification or reset link has expired. Clear recovery, no dead ends.',
    route: '/auth/expired-link',
    icon: <LinkOffIcon />,
    tag: 'Reference',
  },
];

export const AuthIndex: React.FC = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<'camp' | 'default'>('camp');

  const handleNavigate = (route: string) => {
    const url = brand === 'default' ? `${route}?brand=default` : route;
    navigate(url);
  };

  return (
    <div className="cm-auth-index">
      <div className="cm-auth-index__container">
        <div className="cm-auth-index__header">
          <img src={logoSrc} alt="campminder" className="cm-auth-index__logo" />
          <h1 className="cm-auth-index__title">Auth Flow Prototypes</h1>
          <p className="cm-auth-index__subtitle">
            Caretaker journey prototypes for user testing. Each flow walks through
            a real scenario camp staff are dealing with after the Auth0 migration.
          </p>
          <div className="cm-auth-index__brand-toggle">
            <button
              className={`cm-auth-index__brand-pill ${brand === 'camp' ? 'cm-auth-index__brand-pill--active' : ''}`}
              onClick={() => setBrand('camp')}
            >
              Camp Branded
            </button>
            <button
              className={`cm-auth-index__brand-pill ${brand === 'default' ? 'cm-auth-index__brand-pill--active' : ''}`}
              onClick={() => setBrand('default')}
            >
              campminder Branded
            </button>
          </div>
        </div>

        <div>
          <h2 className="cm-auth-index__section-title">Caretaker Journeys</h2>
          <div className="cm-auth-index__grid">
            {journeys.map((flow) => (
              <button
                key={flow.route}
                className="cm-auth-index__card"
                onClick={() => handleNavigate(flow.route)}
              >
                <div className="cm-auth-index__card-number">{flow.id}</div>
                <div className="cm-auth-index__card-icon">{flow.icon}</div>
                <div className="cm-auth-index__card-content">
                  <span className="cm-auth-index__card-tag">{flow.tag}</span>
                  <h3 className="cm-auth-index__card-title">{flow.title}</h3>
                  <p className="cm-auth-index__card-desc">{flow.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="cm-auth-index__section-title">Reference Tools</h2>
          <div className="cm-auth-index__grid cm-auth-index__grid--narrow">
            {tools.map((flow) => (
              <button
                key={flow.route}
                className="cm-auth-index__card"
                onClick={() => handleNavigate(flow.route)}
              >
                <div className="cm-auth-index__card-icon">{flow.icon}</div>
                <div className="cm-auth-index__card-content">
                  <span className="cm-auth-index__card-tag">{flow.tag}</span>
                  <h3 className="cm-auth-index__card-title">{flow.title}</h3>
                  <p className="cm-auth-index__card-desc">{flow.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          className="cm-auth-link"
          style={{ textAlign: 'center', marginTop: 8 }}
          onClick={() => navigate('/')}
        >
          &larr; Back to app
        </button>
      </div>
    </div>
  );
};
