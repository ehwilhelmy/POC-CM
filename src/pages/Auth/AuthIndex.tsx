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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddHomeIcon from '@mui/icons-material/AddHome';
import BadgeIcon from '@mui/icons-material/Badge';
import UpgradeIcon from '@mui/icons-material/Upgrade';
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
    title: 'New Caregiver Auth Flow',
    problem:
      'New caregivers get an invite from camp, click through to register, and hit an Auth0 login screen that looks nothing like their camp. They don\u2019t recognize it, don\u2019t trust it, and drop off\u2009\u2014\u2009or call camp staff confused about where they ended up.',
    description:
      'Gets invite from camp, visits camp website, registers, creates account, gets verified, lands in portal.',
    route: '/auth/new-parent',
    icon: <PersonAddIcon />,
    tags: ['Multi-Step Friction', 'Branding & Identity'],
  },
  {
    id: 2,
    title: 'Returning Caregiver Auth Flow',
    problem:
      'Caregivers who logged in last summer come back and the login page looks completely different. They\u2019re not sure they\u2019re in the right place, can\u2019t tell if they already have an account, and the generic Auth0 branding gives them no confidence they\u2019re logging into their camp.',
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
      'Caregivers don\u2019t remember their password\u2009\u2014\u2009or never set one after migration. They don\u2019t know if they even have an account, the reset emails look unfamiliar, and the multi-step process loses people along the way.',
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
      'Grandparents and co-caregivers receive a guest invite email but have no idea what campminder is. The messaging doesn\u2019t explain what they\u2019re signing up for, what access they\u2019ll have, or why they need yet another account. Many ignore the email entirely.',
    description:
      'Primary caregiver invites a guest (grandparent, co-parent) from their dashboard. Guest receives email, creates account, lands in limited portal.',
    route: '/auth/guest',
    icon: <SupervisorAccountIcon />,
    tags: ['Broken Messages', 'Multi-Step Friction'],
  },
  {
    id: 5,
    title: 'Campanion Branding Login Confusion',
    problem:
      'Caregivers open the Campanion mobile app and see a generic Auth0 screen with no Campanion branding. They don\u2019t understand that one login covers all their camps, and the disconnect between the app and the login page creates confusion.',
    description:
      'Caregiver opens the Campanion mobile app and logs in. One login, all their camps \u2014 Campanion branding gives multi-camp context.',
    route: '/auth/campanion',
    icon: <PhoneIphoneIcon />,
    tags: ['Branding & Identity'],
  },
  {
    id: 6,
    title: 'Existing Account, New Camp',
    problem:
      'A caregiver already has a campminder account at another camp. Their child is now attending a new camp. How do they sign in without creating a duplicate account?',
    description:
      'Caregiver visits new camp site \u2192 enters email \u2192 system finds existing account \u2192 confirms password \u2192 new camp added to account \u2192 dashboard',
    route: '/auth/existing-account-new-camp',
    icon: <PersonAddAlt1Icon />,
    tags: ['Edge Case', 'Account Linking'],
  },
];

const guestEdgeCases: FlowCard[] = [
  {
    id: 7,
    title: 'Guest Invited by Multiple Caregivers (Same Camp)',
    problem:
      'A guest already has access at a camp via one caregiver. A second caregiver at the same camp sends another invite. Without detection, the system would create a duplicate guest account.',
    description:
      'Guest receives second invite at same camp \u2192 system detects existing access \u2192 merges camper connections \u2192 updated dashboard.',
    route: '/auth/guest-multi-caregiver',
    icon: <GroupAddIcon />,
    tags: ['Edge Case', 'Account Merge'],
  },
  {
    id: 8,
    title: 'Guest Invited at Multiple Camps',
    problem:
      'A guest (e.g. grandparent) has an account at one camp and gets invited to a second camp. Without account linking, they\u2019d have to create a new account and manage two separate logins.',
    description:
      'Guest receives invite at new camp \u2192 system finds existing account \u2192 confirms identity \u2192 second camp linked.',
    route: '/auth/guest-multi-camp',
    icon: <AddHomeIcon />,
    tags: ['Edge Case', 'Account Linking'],
  },
  {
    id: 9,
    title: 'Caregiver at Camp A, Guest at Camp B',
    problem:
      'A caregiver at one camp receives a guest invite at a different camp. They already have a full account \u2014 the system needs to add a lower-privilege role without creating a duplicate.',
    description:
      'Caregiver receives guest invite at new camp \u2192 system finds existing caregiver account \u2192 confirms identity \u2192 guest role added.',
    route: '/auth/caregiver-plus-guest',
    icon: <BadgeIcon />,
    tags: ['Edge Case', 'Mixed Roles'],
  },
  {
    id: 10,
    title: 'Guest Upgrading to Caregiver at New Camp',
    problem:
      'A guest at one camp is now registering their own child at a different camp. They need a caregiver role, which requires more information than a guest account provides.',
    description:
      'Guest starts registration at new camp \u2192 system finds existing account \u2192 collects additional caregiver info \u2192 role upgrade complete.',
    route: '/auth/guest-to-caregiver',
    icon: <UpgradeIcon />,
    tags: ['Edge Case', 'Role Upgrade'],
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
    description: 'Camp staff tool to search caregiver email and see account status.',
    route: '/auth/account-lookup',
    icon: <ManageSearchIcon />,
    tags: ['Reference'],
  },
  {
    id: 8,
    title: 'Expired Link',
    description: 'What caregivers see when a verification or reset link has expired. Clear recovery, no dead ends.',
    route: '/auth/expired-link',
    icon: <LinkOffIcon />,
    tags: ['Reference'],
  },
];

export const AuthIndex: React.FC = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<'camp' | 'default'>('camp');
  const [edgeCasesOpen, setEdgeCasesOpen] = useState(false);

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
            Caregiver journey prototypes for user testing. Each flow walks through
            a real scenario camp staff are dealing with after the Auth0 migration.
          </p>
          <p className="cm-auth-index__updated">Last updated Feb 24, 2025</p>
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
          <h2 className="cm-auth-index__section-title">Caregiver Journeys</h2>
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

        <div className="cm-auth-index__accordion">
          <button
            className="cm-auth-index__accordion-trigger"
            onClick={() => setEdgeCasesOpen(!edgeCasesOpen)}
            aria-expanded={edgeCasesOpen}
          >
            <h2 className="cm-auth-index__section-title" style={{ margin: 0 }}>
              Guest Edge Cases
            </h2>
            <span className="cm-auth-index__card-tag cm-auth-index__card-tag--discussion">
              Needs Discussion
            </span>
            <span className={`cm-auth-index__accordion-chevron ${edgeCasesOpen ? 'cm-auth-index__accordion-chevron--open' : ''}`}>
              &#9662;
            </span>
          </button>
          {edgeCasesOpen && (
            <div className="cm-auth-index__accordion-body">
              <div className="cm-auth-index__grid cm-auth-index__grid--journeys">
                {guestEdgeCases.map((flow) => (
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
          )}
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
