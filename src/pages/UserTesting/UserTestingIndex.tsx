import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import './UserTestingIndex.css';

interface TestFlow {
  label: string;
  description: string;
  route: string;
}

const flows: TestFlow[] = [
  {
    label: 'New Account',
    description: 'Caregiver creates a brand-new account from the camp website. Identifier-first entry routes to signup automatically.',
    route: '/auth/new-parent',
  },
  {
    label: 'Returning Login',
    description: 'Caregiver with an existing account signs in. Identifier-first entry detects the account and routes to password.',
    route: '/auth/returning-parent',
  },
  {
    label: 'Forgot Password',
    description: 'Caregiver resets a forgotten password via email verification code.',
    route: '/auth/forgot-password',
  },
  {
    label: 'Claim Account',
    description: 'Camp pre-creates the account with the caregiver\'s email. Caregiver only needs to set a password and verify.',
    route: '/auth/claim-account',
  },
];

export const UserTestingIndex: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cm-testing">
      <img
        src={logoSrc}
        alt="campminder"
        className="cm-testing__logo"
      />
      <h1 className="cm-testing__title">Auth Flows</h1>
      <p className="cm-testing__subtitle">
        Caregiver-facing authentication flows. Select a flow to walk through.
      </p>

      <div className="cm-testing__grid">
        {flows.map((flow) => (
          <button
            key={flow.route}
            className="cm-testing__card"
            onClick={() => navigate(`${flow.route}?from=testing`)}
            type="button"
          >
            <span className="cm-testing__card-label">{flow.label}</span>
            <span className="cm-testing__card-desc">{flow.description}</span>
          </button>
        ))}
      </div>

      <button
        className="cm-testing__back"
        onClick={() => navigate('/')}
        type="button"
      >
        &larr; Back
      </button>
    </div>
  );
};
