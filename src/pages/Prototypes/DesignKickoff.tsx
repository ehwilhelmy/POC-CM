import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import clsx from 'clsx';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';

// Current experience screenshots — New Account flow
import current01 from '../../assets/current-experience/01-camp-homepage.png';
import current02 from '../../assets/current-experience/02-prompted-to-login.png';
import current03 from '../../assets/current-experience/03-signup-prompt.png';
import current05 from '../../assets/current-experience/05-verify-identity-screen.png';
import current06 from '../../assets/current-experience/06-verify-identity-email.png';
import current07 from '../../assets/current-experience/07-create-account.png';
import current08 from '../../assets/current-experience/08-create-account-detail.png';
import current09 from '../../assets/current-experience/09-login-after-creation.png';
import current10 from '../../assets/current-experience/10-login-with-password.png';

import './DesignKickoff.css';

interface FlowScreen {
  label: string;
  src?: string;
  teamOwned?: boolean;
  annotations?: string[];
}

interface ProposedStep {
  label: string;
  teamOwned: boolean;
  annotations: string[];
}

interface FlowSection {
  id: string;
  title: string;
  description: string;
  prototypeRoute: string;
  currentScreens: FlowScreen[];
  proposedSteps: ProposedStep[];
  tags: string[];
}

const flows: FlowSection[] = [
  {
    id: 'new-account',
    title: 'New Account',
    description:
      'Caregiver creates a brand-new account from the camp website. Identifier-first entry routes to signup automatically.',
    prototypeRoute: '/auth/new-parent',
    tags: ['Multi-Step Friction', 'Branding & Identity'],
    currentScreens: [
      {
        label: 'Camp homepage',
        src: current01,
        teamOwned: false,
        annotations: ['Camp-owned page — not in scope'],
      },
      {
        label: 'Prompted to login',
        src: current02,
        teamOwned: true,
        annotations: [
          'Identifier-first login form',
          'Route known emails to password, unknown to signup',
        ],
      },
      {
        label: 'Signup prompt',
        src: current03,
        teamOwned: true,
        annotations: [
          'Auto-route to signup when email is unrecognized',
          'Collect name and create Auth0 account',
        ],
      },
      {
        label: 'Verify identity',
        src: current05,
        teamOwned: true,
        annotations: [
          'Email verification code entry screen',
          'Resend code flow',
        ],
      },
      {
        label: 'Verification email',
        src: current06,
        teamOwned: true,
        annotations: [
          'Verification email template',
          'Clear code display and expiry info',
        ],
      },
      {
        label: 'Create account',
        src: current07,
        teamOwned: true,
        annotations: [
          'Password creation form',
          'Password strength requirements',
        ],
      },
      {
        label: 'Account details',
        src: current08,
        teamOwned: true,
        annotations: [
          'Collect additional caregiver profile info',
          'Form validation and field requirements',
        ],
      },
      {
        label: 'Login after creation',
        src: current09,
        teamOwned: true,
        annotations: [
          'Auto sign-in after account creation',
          'Loading state and redirect to portal',
        ],
      },
      {
        label: 'Enter password',
        src: current10,
        teamOwned: true,
        annotations: [
          'Password entry for known accounts',
          'Forgot password link',
        ],
      },
    ],
    proposedSteps: [
      {
        label: 'Camp homepage',
        teamOwned: false,
        annotations: ['Camp-managed website — not in scope'],
      },
      {
        label: 'Identifier-first entry',
        teamOwned: true,
        annotations: [
          'Single email input — "Enter your email to get started"',
          'Auth0 email lookup to detect existing vs. new account',
          'Route to signup (this flow) or password (returning flow)',
        ],
      },
      {
        label: 'Create account form',
        teamOwned: true,
        annotations: [
          'Pre-filled email from previous step',
          'Name, password, confirm password fields',
          'Password strength validation',
          'Auth0 user provisioning on submit',
        ],
      },
      {
        label: 'Email verification',
        teamOwned: true,
        annotations: [
          '6-digit code entry screen',
          'Trigger Auth0 verification email',
          'Code validation and resend logic',
        ],
      },
      {
        label: 'Verification email',
        teamOwned: true,
        annotations: [
          'Auth0 email template',
          'Verification code with expiry',
        ],
      },
      {
        label: 'Auto sign-in',
        teamOwned: true,
        annotations: [
          'Auth0 token exchange after verification',
          'Loading state → redirect to portal',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
  },
  {
    id: 'returning-login',
    title: 'Returning Login',
    description:
      'Caregiver with an existing account signs in. Identifier-first entry detects the account and routes to password.',
    prototypeRoute: '/auth/returning-parent',
    tags: ['Branding & Identity', 'Account Status Confusion'],
    currentScreens: [],
    proposedSteps: [
      {
        label: 'Camp homepage',
        teamOwned: false,
        annotations: ['Camp-managed website — not in scope'],
      },
      {
        label: 'Identifier-first entry',
        teamOwned: true,
        annotations: [
          'Same email-first screen as all flows',
          'Auth0 email lookup — detect existing account',
          'Route to password screen (this flow)',
        ],
      },
      {
        label: 'Password entry',
        teamOwned: true,
        annotations: [
          'Personalized greeting — "Welcome back, [name]"',
          'Password field only (email carried from previous step)',
          'Forgot password link → forgot password flow',
          'Auth0 authentication on submit',
        ],
      },
      {
        label: 'Sign-in',
        teamOwned: true,
        annotations: [
          'Auth0 token exchange',
          'Session creation and redirect',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
  },
  {
    id: 'forgot-password',
    title: 'Forgot Password',
    description:
      'Caregiver resets a forgotten password via email verification code.',
    prototypeRoute: '/auth/forgot-password',
    tags: ['Multi-Step Friction', 'Account Status Confusion'],
    currentScreens: [],
    proposedSteps: [
      {
        label: 'Camp homepage',
        teamOwned: false,
        annotations: ['Camp-managed website — not in scope'],
      },
      {
        label: 'Identifier-first entry',
        teamOwned: true,
        annotations: [
          'Email entry — routes to password for known account',
        ],
      },
      {
        label: 'Password attempt',
        teamOwned: true,
        annotations: [
          'Wrong password → error state',
          'Migration banner for accounts that never set a password',
          '"Forgot password?" link triggers reset flow',
        ],
      },
      {
        label: 'Reset request',
        teamOwned: true,
        annotations: [
          'Email pre-filled from previous steps',
          'Trigger Auth0 password reset email',
        ],
      },
      {
        label: 'Check email / enter code',
        teamOwned: true,
        annotations: [
          '6-digit reset code entry',
          'Reset code email template',
          'Code validation and resend logic',
        ],
      },
      {
        label: 'Create new password',
        teamOwned: true,
        annotations: [
          'New password + confirm fields',
          'Password strength requirements',
          '"Applies to all camps" messaging',
          'Auth0 password update on submit',
        ],
      },
      {
        label: 'Success confirmation',
        teamOwned: true,
        annotations: [
          '"Password Changed!" confirmation',
          'Auto-login option → portal',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
  },
  {
    id: 'claim-account',
    title: 'Claim Account',
    description:
      'Camp pre-creates the account with the caregiver\'s email. Caregiver only needs to set a password and verify.',
    prototypeRoute: '/auth/claim-account',
    tags: ['Multi-Step Friction', 'Branding & Identity'],
    currentScreens: [],
    proposedSteps: [
      {
        label: 'Camp homepage',
        teamOwned: false,
        annotations: ['Camp-managed website — not in scope'],
      },
      {
        label: 'Identifier-first entry',
        teamOwned: true,
        annotations: [
          'Email entry',
          'Auth0 lookup — detect pre-created account (no password set)',
          'Route to claim/set-password screen',
        ],
      },
      {
        label: 'Set password',
        teamOwned: true,
        annotations: [
          '"Your account is ready" messaging',
          'Password + confirm fields only (no name — camp already provided it)',
          'Password strength validation',
          'Auth0 password set on submit',
        ],
      },
      {
        label: 'Email verification',
        teamOwned: true,
        annotations: [
          '6-digit verification code entry',
          'Verification email template',
          'Code validation and resend logic',
        ],
      },
      {
        label: 'Auto sign-in',
        teamOwned: true,
        annotations: [
          'Auth0 token exchange after verification',
          'Loading state → redirect to portal',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
  },
];

export const DesignKickoff: React.FC = () => {
  const navigate = useNavigate();
  const [showScope, setShowScope] = useState(false);
  const [activeView, setActiveView] = useState<'current' | 'proposed'>('proposed');

  return (
    <div className="cm-kickoff">
      <div className="cm-kickoff__hero">
        <img src={logoSrc} alt="campminder" className="cm-kickoff__logo" />
        <h1 className="cm-kickoff__title">Design Kickoff</h1>
        <p className="cm-kickoff__subtitle">
          Current vs. proposed experience — toggle scope view to see what your team owns.
        </p>
      </div>

      <div className="cm-kickoff__controls">
        <div className="cm-kickoff__view-toggle">
          <button
            className={clsx('cm-kickoff__view-pill', activeView === 'current' && 'cm-kickoff__view-pill--active')}
            onClick={() => setActiveView('current')}
            type="button"
          >
            Current Experience
          </button>
          <button
            className={clsx('cm-kickoff__view-pill', activeView === 'proposed' && 'cm-kickoff__view-pill--active')}
            onClick={() => setActiveView('proposed')}
            type="button"
          >
            Proposed Experience
          </button>
        </div>

        <button
          className={clsx('cm-kickoff__scope-toggle', showScope && 'cm-kickoff__scope-toggle--active')}
          onClick={() => setShowScope(!showScope)}
          type="button"
        >
          {showScope ? <VisibilityIcon /> : <VisibilityOffIcon />}
          {showScope ? 'Showing scope' : 'Show team scope'}
        </button>
      </div>

      {showScope && (
        <div className="cm-kickoff__legend">
          <span className="cm-kickoff__legend-item">
            <span className="cm-kickoff__legend-swatch cm-kickoff__legend-swatch--team" />
            Your team
          </span>
          <span className="cm-kickoff__legend-item">
            <span className="cm-kickoff__legend-swatch cm-kickoff__legend-swatch--other" />
            Other team
          </span>
        </div>
      )}

      <div className="cm-kickoff__flows">
        {flows.map((flow) => (
          <div key={flow.id} className="cm-kickoff__flow">
            <div className="cm-kickoff__flow-header">
              <div>
                <h2 className="cm-kickoff__flow-title">{flow.title}</h2>
                <p className="cm-kickoff__flow-desc">{flow.description}</p>
                <div className="cm-kickoff__flow-tags">
                  {flow.tags.map((tag) => (
                    <span key={tag} className="cm-kickoff__tag">{tag}</span>
                  ))}
                </div>
              </div>
              <button
                className="cm-kickoff__try-btn"
                onClick={() => navigate(`${flow.prototypeRoute}?from=kickoff`)}
                type="button"
              >
                Try prototype <OpenInNewIcon />
              </button>
            </div>

            {/* Current experience — screenshots */}
            {activeView === 'current' && flow.currentScreens.length > 0 && (
              <div className="cm-kickoff__screens">
                {flow.currentScreens.map((screen, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'cm-kickoff__screen',
                      showScope && !screen.teamOwned && 'cm-kickoff__screen--other-team',
                      showScope && screen.teamOwned && 'cm-kickoff__screen--team-owned',
                    )}
                  >
                    <img
                      src={screen.src}
                      alt={screen.label}
                      className="cm-kickoff__screen-img"
                    />
                    <span className="cm-kickoff__screen-label">
                      {i + 1}. {screen.label}
                    </span>
                    {showScope && screen.teamOwned && (
                      <span className="cm-kickoff__screen-badge">Your team</span>
                    )}
                    {showScope && screen.annotations && screen.annotations.length > 0 && (
                      <ul className={clsx(
                        'cm-kickoff__annotations',
                        screen.teamOwned && 'cm-kickoff__annotations--team',
                        !screen.teamOwned && 'cm-kickoff__annotations--other',
                      )}>
                        {screen.annotations.map((note, j) => (
                          <li key={j} className="cm-kickoff__annotation">{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeView === 'current' && flow.currentScreens.length === 0 && (
              <div className="cm-kickoff__empty">
                Screenshots coming soon — open in Figma to view the current experience.
              </div>
            )}

            {/* Proposed experience — step cards */}
            {activeView === 'proposed' && (
              <div className="cm-kickoff__steps">
                {flow.proposedSteps.map((step, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'cm-kickoff__step',
                      showScope && !step.teamOwned && 'cm-kickoff__step--other-team',
                      showScope && step.teamOwned && 'cm-kickoff__step--team-owned',
                    )}
                  >
                    <div className="cm-kickoff__step-number">{i + 1}</div>
                    <div className="cm-kickoff__step-content">
                      <span className="cm-kickoff__step-label">{step.label}</span>
                      {showScope && (
                        <ul className="cm-kickoff__step-annotations">
                          {step.annotations.map((note, j) => (
                            <li key={j} className="cm-kickoff__step-annotation">{note}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {showScope && step.teamOwned && (
                      <span className="cm-kickoff__screen-badge cm-kickoff__screen-badge--inline">Your team</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="cm-kickoff__back"
        onClick={() => navigate('/prototypes/auth0')}
        type="button"
      >
        &larr; Back to Auth0
      </button>
    </div>
  );
};
