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
  problem?: string;
  description: string;
  footnote?: string;
  route: string;
  icon: React.ReactNode;
  tags: string[];
}

const journeys: FlowCard[] = [
  {
    id: 1,
    title: 'New Caretaker Auth Flow',
    problem:
      'New caretakers get an invite from camp, click through to register, and hit an Auth0 login screen that looks nothing like their camp. They don\u2019t recognize it, don\u2019t trust it, and drop off\u2009\u2014\u2009or call camp staff confused about where they ended up.',
    description:
      'Gets invite from camp, visits camp website, registers, creates account, gets verified, lands in portal.',
    route: '/auth/new-parent',
    icon: <PersonAddIcon />,
    tags: ['Multi-Step Friction', 'Branding & Identity'],
  },
  {
    id: 2,
    title: 'Returning Caretaker Auth Flow',
    problem:
      'Caretakers who logged in last summer come back and the login page looks completely different. They\u2019re not sure they\u2019re in the right place, can\u2019t tell if they already have an account, and the generic Auth0 branding gives them no confidence they\u2019re logging into their camp.',
    description:
      'Returns to camp site, enters email*, enters password, lands in portal.',
    footnote:
      '* This flow does not directly propose the forgot password and potential for new system in place.',
    route: '/auth/returning-parent',
    icon: <LoginIcon />,
    tags: ['Branding & Identity', 'Account Status Confusion'],
  },
  {
    id: 3,
    title: 'Forgot Password Flow',
    problem:
      'Caretakers don\u2019t remember their password\u2009\u2014\u2009or never set one after migration. They don\u2019t know if they even have an account, the reset emails look unfamiliar, and the multi-step process loses people along the way.',
    description:
      'Can\'t remember password, requests reset, receives branded email, enters code, sets new password, back to login.',
    route: '/auth/forgot-password',
    icon: <LockResetIcon />,
    tags: ['Multi-Step Friction', 'Account Status Confusion'],
  },
  {
    id: 4,
    title: 'Guest Account Flow',
    problem:
      'Grandparents and co-caretakers receive a guest invite email but have no idea what campminder is. The messaging doesn\u2019t explain what they\u2019re signing up for, what access they\u2019ll have, or why they need yet another account. Many ignore the email entirely.',
    description:
      'Primary caretaker invites a guest (grandparent, co-parent) from their dashboard. Guest receives email, creates account, lands in limited portal.',
    route: '/auth/guest',
    icon: <SupervisorAccountIcon />,
    tags: ['Broken Messages', 'Multi-Step Friction'],
  },
  {
    id: 5,
    title: 'Campanion Branding Login Confusion',
    problem:
      'Caretakers open the Campanion mobile app and see a generic Auth0 screen with no Campanion branding. They don\u2019t understand that one login covers all their camps, and the disconnect between the app and the login page creates confusion.',
    description:
      'Caretaker opens the Campanion mobile app and logs in. One login, all their camps \u2014 Campanion branding gives multi-camp context.',
    route: '/auth/campanion',
    icon: <PhoneIphoneIcon />,
    tags: ['Branding & Identity'],
  },
];

const tools: FlowCard[] = [
  {
    id: 6,
    title: 'Branded Emails',
    description: 'Preview camp-branded transactional emails: verification, password reset, invitation, and guest invite.',
    route: '/auth/emails',
    icon: <EmailIcon />,
    tags: ['Reference'],
  },
  {
    id: 7,
    title: 'Account Lookup',
    description: 'Camp staff tool to search caretaker email and see account status.',
    route: '/auth/account-lookup',
    icon: <ManageSearchIcon />,
    tags: ['Reference'],
  },
  {
    id: 8,
    title: 'Expired Link',
    description: 'What caretakers see when a verification or reset link has expired. Clear recovery, no dead ends.',
    route: '/auth/expired-link',
    icon: <LinkOffIcon />,
    tags: ['Reference'],
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
          <div className="cm-auth-index__grid cm-auth-index__grid--journeys">
            {journeys.map((flow) => (
              <button
                key={flow.route}
                className="cm-auth-index__card"
                onClick={() => handleNavigate(flow.route)}
              >
                <div className="cm-auth-index__card-number">{flow.id}</div>
                <div className="cm-auth-index__card-icon">{flow.icon}</div>
                <div className="cm-auth-index__card-content">
                  <h3 className="cm-auth-index__card-title">{flow.title}</h3>
                  {flow.problem && (
                    <p className="cm-auth-index__card-problem">{flow.problem}</p>
                  )}
                  <p className="cm-auth-index__card-journey">
                    <span className="cm-auth-index__card-journey-label">Journey: </span>
                    {flow.description}
                  </p>
                  {flow.footnote && (
                    <p className="cm-auth-index__card-footnote">{flow.footnote}</p>
                  )}
                  <div className="cm-auth-index__card-focus">
                    <span className="cm-auth-index__card-focus-label">Proposal focuses on :</span>
                    <div className="cm-auth-index__card-tags">
                      {flow.tags.map((tag) => (
                        <span key={tag} className="cm-auth-index__card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
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
