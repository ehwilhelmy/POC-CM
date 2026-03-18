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

// Current experience screenshots — Existing Account flow
import existing01 from '../../assets/current-experience/existing-01-camp-homepage.png';
import existing02 from '../../assets/current-experience/existing-02-prompted-to-login.png';
import existing03 from '../../assets/current-experience/existing-03-try-create-account.png';
import existing04 from '../../assets/current-experience/existing-04-creating-account.png';
import existing05 from '../../assets/current-experience/existing-05-creating-account-2.png';
import existing06 from '../../assets/current-experience/existing-06-surprise-have-account.png';
import existing07 from '../../assets/current-experience/existing-07-password-autofill.png';
import existing08 from '../../assets/current-experience/existing-08-logged-in.png';

// Current experience screenshots — Forgot Password flow
import forgot01 from '../../assets/current-experience/forgot-01-enter-email.png';
import forgot02 from '../../assets/current-experience/forgot-02-weird-email.png';
import forgot03 from '../../assets/current-experience/forgot-03-verify-identity.png';
import forgot04 from '../../assets/current-experience/forgot-04-reset-password.png';
import forgot05 from '../../assets/current-experience/forgot-05-changed-now-what.png';

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

interface FlowNote {
  label: string;
  text: string;
}

interface DiagramStep {
  label: string;
  highlight?: boolean;
  problem?: string;
}

interface FlowDiagram {
  before: DiagramStep[];
  after: DiagramStep[];
}

interface FlowSection {
  id: string;
  title: string;
  description: string;
  prototypeRoute: string;
  currentScreens: FlowScreen[];
  proposedSteps: ProposedStep[];
  tags: string[];
  notes?: FlowNote[];
  diagram?: FlowDiagram;
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
        teamOwned: false,
        annotations: [
          'Email template — not in scope for this phase',
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
          'Input: Email address',
          'Messaging: "Enter your email to get started"',
          'Logic: Email lookup routes to signup (this flow) or password (returning)',
        ],
      },
      {
        label: 'Create account form',
        teamOwned: true,
        annotations: [
          'Inputs: First name, Last name, Email (pre-filled), Password, Confirm password',
          'Messaging: "We didn\'t find an account for [email]"',
          'Validation: Password strength requirements',
        ],
      },
      {
        label: 'Verification screen',
        teamOwned: true,
        annotations: [
          'Input: 6-digit verification code',
          'Messaging: "We\'ve sent a verification code to [email]"',
          'Note: Email template is not in scope — just this screen',
        ],
      },
      {
        label: 'Auto sign-in',
        teamOwned: true,
        annotations: [
          'Auto sign-in after account creation',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
    notes: [
      {
        label: 'Dynamic messaging',
        text: 'Title and messaging are dynamic — camp name and email are injected (e.g., "Create your Camp Tall Pines account", "We didn\'t find an account for erica@gmail.com"). Need to confirm how Auth0 templates handle this.',
      },
      {
        label: 'Password strength',
        text: 'Password strength validation already exists in Auth0. Team may only need to restyle the existing Auth0 screen rather than rebuild. Need to assess: configure Auth0 Universal Login vs. custom screen?',
      },
      {
        label: 'Email templates not in scope',
        text: 'Verification/reset email templates are not in scope for this phase. The Auth0 screens that reference emails (code entry, messaging) are in scope — just not the emails themselves.',
      },
    ],
    diagram: {
      before: [
        { label: 'Camp website' },
        { label: 'Auth0 login page', problem: 'Login + Signup shown together' },
        { label: 'Click "Sign Up"', problem: 'Caregiver guesses which button' },
        { label: 'Create account form' },
        { label: 'Verify identity screen' },
        { label: 'Verification email', problem: 'Unbranded, confusing sender' },
        { label: 'Create account details' },
        { label: 'Login again', problem: 'Re-enter credentials after signup' },
        { label: 'Portal' },
      ],
      after: [
        { label: 'Camp website' },
        { label: 'Enter email', highlight: true },
        { label: '"No account found"', highlight: true },
        { label: 'Create account form', highlight: true },
        { label: 'Verify code', highlight: true },
        { label: 'Auto sign-in', highlight: true },
        { label: 'Portal' },
      ],
    },
  },
  {
    id: 'returning-login',
    title: 'Returning Login',
    description:
      'Caregiver with an existing account signs in. Identifier-first entry detects the account and routes to password.',
    prototypeRoute: '/auth/returning-parent',
    tags: ['Branding & Identity', 'Account Status Confusion'],
    currentScreens: [
      {
        label: 'Camp homepage',
        src: existing01,
        teamOwned: false,
        annotations: ['Camp-owned page — not in scope'],
      },
      {
        label: 'Prompted to login',
        src: existing02,
        teamOwned: true,
        annotations: [
          'Auth0 login page — login and signup shown together',
          'No identifier-first — caregiver guesses which path',
        ],
      },
      {
        label: 'Try to create account',
        src: existing03,
        teamOwned: true,
        annotations: [
          'Caregiver doesn\'t know if they have an account',
          'Tries signup — confusing path',
        ],
      },
      {
        label: 'Creating account',
        src: existing04,
        teamOwned: true,
        annotations: [
          'Account creation form',
          'No email verification step',
        ],
      },
      {
        label: 'Account creation continued',
        src: existing05,
        teamOwned: true,
        annotations: [
          'More account details',
        ],
      },
      {
        label: 'Surprise — account exists',
        src: existing06,
        teamOwned: true,
        annotations: [
          'System discovers existing account mid-flow',
          '"Should I try forgot password?" — confusing',
        ],
      },
      {
        label: 'Password autofill',
        src: existing07,
        teamOwned: true,
        annotations: [
          'Password manager saves the day',
          'Without it, caregiver would be stuck',
        ],
      },
      {
        label: 'Logged in',
        src: existing08,
        teamOwned: false,
        annotations: ['Portal — not in scope'],
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
          'Input: Email address',
          'Messaging: "Enter your email to get started"',
          'Logic: Email lookup detects existing account → routes to password',
        ],
      },
      {
        label: 'Password entry',
        teamOwned: true,
        annotations: [
          'Input: Password',
          'Messaging: "Welcome back, [name]"',
          'Link: "Forgot password?" → forgot password flow',
        ],
      },
      {
        label: 'Auto sign-in',
        teamOwned: true,
        annotations: [
          'Auto sign-in',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
    notes: [
      {
        label: 'Identifier-first routing',
        text: 'The email lookup determines if the account exists and routes to password. This is the same entry point as all flows — the branching logic is the key piece.',
      },
      {
        label: 'Personalized greeting',
        text: '"Welcome back, [name]" — requires the email lookup to return the user\'s first name. Confirm Auth0 API returns this on identifier check.',
      },
    ],
    diagram: {
      before: [
        { label: 'Camp website' },
        { label: 'Auth0 login page', problem: 'Login + Signup shown together' },
        { label: 'Try to create account', problem: 'Doesn\'t know if they have one' },
        { label: 'Fill out signup form' },
        { label: '"Account exists"', problem: 'Surprise mid-flow' },
        { label: 'Try password / forgot?', problem: 'Confused, stuck' },
        { label: 'Portal' },
      ],
      after: [
        { label: 'Camp website' },
        { label: 'Enter email', highlight: true },
        { label: '"Welcome back, [name]"', highlight: true },
        { label: 'Enter password', highlight: true },
        { label: 'Auto sign-in', highlight: true },
        { label: 'Portal' },
      ],
    },
  },
  {
    id: 'forgot-password',
    title: 'Forgot Password',
    description:
      'Caregiver resets a forgotten password via email verification code.',
    prototypeRoute: '/auth/forgot-password',
    tags: ['Multi-Step Friction', 'Account Status Confusion'],
    currentScreens: [
      {
        label: 'Enter email for reset',
        src: forgot01,
        teamOwned: true,
        annotations: [
          'Forgot password entry screen',
          'Generic Auth0 styling — no camp branding',
        ],
      },
      {
        label: 'Weird reset email',
        src: forgot02,
        teamOwned: true,
        annotations: [
          'Unfamiliar sender address',
          'Broken logo in email',
          'Confusing subject line',
        ],
      },
      {
        label: 'Verify identity',
        src: forgot03,
        teamOwned: true,
        annotations: [
          'Verification screen',
          'No camp branding context',
        ],
      },
      {
        label: 'Reset password',
        src: forgot04,
        teamOwned: true,
        annotations: [
          'New password form',
          'No mention of multi-camp impact',
        ],
      },
      {
        label: 'Changed — now what?',
        src: forgot05,
        teamOwned: true,
        annotations: [
          'Success screen but no clear path back',
          'Caregiver doesn\'t know how to return to camp',
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
          'Input: Email address',
          'Messaging: "Enter your email to get started"',
          'Logic: Email lookup detects existing account → routes to password',
        ],
      },
      {
        label: 'Password attempt',
        teamOwned: true,
        annotations: [
          'Input: Password',
          'Messaging: "Welcome back, [name]"',
          'Error: "The email or password for this account is incorrect"',
          'Link: "Forgot password?"',
        ],
      },
      {
        label: 'Reset request',
        teamOwned: true,
        annotations: [
          'Input: Email address (pre-filled)',
          'Messaging: "Enter your email and we\'ll send you a code"',
        ],
      },
      {
        label: 'Check email / enter code',
        teamOwned: true,
        annotations: [
          'Input: 6-digit reset code',
          'Messaging: "We sent a 6-digit code to [email]"',
          'Note: Email template is not in scope — just this screen',
        ],
      },
      {
        label: 'Create new password',
        teamOwned: true,
        annotations: [
          'Inputs: New password, Confirm new password',
          'Messaging: "This password will apply to all camps connected to your account"',
          'Validation: Password strength requirements',
        ],
      },
      {
        label: 'Success confirmation',
        teamOwned: true,
        annotations: [
          'Messaging: "Password Changed!"',
          'Button: "Go to My Account"',
        ],
      },
      {
        label: 'Portal / Dashboard',
        teamOwned: false,
        annotations: ['CampInTouch portal — managed by CIT team'],
      },
    ],
    notes: [
      {
        label: 'Email templates not in scope',
        text: 'Reset email templates are not in scope for this phase. The Auth0 screens that reference emails (code entry, messaging) are in scope — just not the emails themselves.',
      },
      {
        label: 'Multi-camp messaging',
        text: '"This password will apply to all camps connected to your account" — lives on the Create new password screen, not earlier. Important for multi-camp caregivers. Doesn\'t exist in current experience.',
      },
      {
        label: 'Auto-login after reset',
        text: 'Current flow dumps caregiver at a dead end after password change. New design auto-logs them in. Confirm Auth0 supports session creation after password reset.',
      },
    ],
    diagram: {
      before: [
        { label: 'Enter email' },
        { label: 'Reset email', problem: 'Weird sender, broken logo' },
        { label: 'Verify identity', problem: 'No camp branding' },
        { label: 'Reset password', problem: 'No multi-camp info' },
        { label: '"Password changed!"', problem: 'Dead end — no way back' },
      ],
      after: [
        { label: 'Enter email', highlight: true },
        { label: '"Welcome back"', highlight: true },
        { label: 'Wrong password', highlight: true },
        { label: '"Forgot password?"', highlight: true },
        { label: 'Enter reset code', highlight: true },
        { label: 'Create new password', highlight: true },
        { label: '"Password Changed!" → Go to My Account', highlight: true },
        { label: 'Portal' },
      ],
    },
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
          'Input: Email address',
          'Messaging: "Enter your email to get started"',
          'Logic: Email lookup detects pre-created account → routes to set password',
        ],
      },
      {
        label: 'Set password',
        teamOwned: true,
        annotations: [
          'Inputs: Password, Confirm password',
          'Messaging: "[Camp] has already set up your account for [email]. Create a password to activate it."',
          'Validation: Password strength requirements',
        ],
      },
      {
        label: 'Verification screen',
        teamOwned: true,
        annotations: [
          'Input: 6-digit verification code',
          'Messaging: "We\'ve sent a verification code to [email]"',
          'Note: Email template is not in scope — just this screen',
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
    notes: [
      {
        label: 'Pre-created account detection',
        text: 'Auth0 needs to detect that this email has a pre-created account with no password set and route to the "Set up your password" screen instead of signup or login.',
      },
      {
        label: 'No name fields needed',
        text: 'Camp already provided name and camper info when pre-creating the account. Caregiver only sets a password — simpler flow than new account.',
      },
    ],
    diagram: {
      before: [
        { label: 'Camp website' },
        { label: 'Auth0 login page', problem: 'No pre-created account detection' },
        { label: 'Caregiver guesses: login or signup?', problem: 'Confusing' },
        { label: 'Create full account', problem: 'Re-enters info camp already has' },
        { label: 'Portal' },
      ],
      after: [
        { label: 'Camp website' },
        { label: 'Enter email', highlight: true },
        { label: '"Account ready — set password"', highlight: true },
        { label: 'Verify code', highlight: true },
        { label: 'Auto sign-in', highlight: true },
        { label: 'Portal' },
      ],
    },
  },
];

export const DesignKickoff: React.FC = () => {
  const navigate = useNavigate();
  const [showScope, setShowScope] = useState(false);
  const [activeView, setActiveView] = useState<'current' | 'proposed' | 'diagram'>('proposed');

  return (
    <div className="cm-kickoff">
      <div className="cm-kickoff__hero">
        <img src={logoSrc} alt="campminder" className="cm-kickoff__logo" />
        <h1 className="cm-kickoff__title">Design Kickoff</h1>
        <p className="cm-kickoff__subtitle">
          Current vs. new design — toggle scope view to see what your team owns.
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
            New Design
          </button>
          <button
            className={clsx('cm-kickoff__view-pill', activeView === 'diagram' && 'cm-kickoff__view-pill--active')}
            onClick={() => setActiveView('diagram')}
            type="button"
          >
            Flow Diagram
          </button>
        </div>

        {activeView !== 'diagram' && (
          <button
            className={clsx('cm-kickoff__scope-toggle', showScope && 'cm-kickoff__scope-toggle--active')}
            onClick={() => setShowScope(!showScope)}
            type="button"
          >
            {showScope ? <VisibilityIcon /> : <VisibilityOffIcon />}
            {showScope ? 'Showing scope' : 'Show team scope'}
          </button>
        )}
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
            {/* Flow Diagram */}
            {activeView === 'diagram' && flow.diagram && (
              <div className="cm-kickoff__diagram">
                <div className="cm-kickoff__diagram-row">
                  <div className="cm-kickoff__diagram-col">
                    <h4 className="cm-kickoff__diagram-heading cm-kickoff__diagram-heading--before">Before</h4>
                    <div className="cm-kickoff__diagram-flow">
                      {flow.diagram.before.map((step, i) => (
                        <div key={i} className="cm-kickoff__diagram-step-wrapper">
                          {i > 0 && <div className="cm-kickoff__diagram-arrow" />}
                          <div className={clsx(
                            'cm-kickoff__diagram-step',
                            step.problem && 'cm-kickoff__diagram-step--problem',
                          )}>
                            <span className="cm-kickoff__diagram-step-label">{step.label}</span>
                            {step.problem && (
                              <span className="cm-kickoff__diagram-step-problem">{step.problem}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cm-kickoff__diagram-col">
                    <h4 className="cm-kickoff__diagram-heading cm-kickoff__diagram-heading--after">After</h4>
                    <div className="cm-kickoff__diagram-flow">
                      {flow.diagram.after.map((step, i) => (
                        <div key={i} className="cm-kickoff__diagram-step-wrapper">
                          {i > 0 && <div className="cm-kickoff__diagram-arrow" />}
                          <div className={clsx(
                            'cm-kickoff__diagram-step',
                            step.highlight && 'cm-kickoff__diagram-step--highlight',
                          )}>
                            <span className="cm-kickoff__diagram-step-label">{step.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes section */}
            {flow.notes && flow.notes.length > 0 && (
              <div className="cm-kickoff__notes">
                <h3 className="cm-kickoff__notes-title">Notes & Open Questions</h3>
                {flow.notes.map((note, i) => (
                  <div key={i} className="cm-kickoff__note">
                    <span className="cm-kickoff__note-label">{note.label}</span>
                    <p className="cm-kickoff__note-text">{note.text}</p>
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
