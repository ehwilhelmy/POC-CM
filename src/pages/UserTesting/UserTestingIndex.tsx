import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import './UserTestingIndex.css';

interface TestFlow {
  label: string;
  route: string;
}

const flows: TestFlow[] = [
  { label: 'New Account Login', route: '/auth/new-parent' },
  { label: 'Returning Login', route: '/auth/returning-parent' },
  { label: 'Forgot Password', route: '/auth/forgot-password' },
  { label: 'Claim Account (Camp Pre-Created)', route: '/auth/claim-account' },
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
      <h1 className="cm-testing__title">User Testing</h1>
      <p className="cm-testing__subtitle">
        Select a flow to walk through.
      </p>

      <div className="cm-testing__grid">
        {flows.map((flow) => (
          <button
            key={flow.route}
            className="cm-testing__card"
            onClick={() => navigate(`${flow.route}?from=testing`)}
            type="button"
          >
            {flow.label}
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
