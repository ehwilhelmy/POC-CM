import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AuthLayout } from '../components/AuthLayout';
import type { CampBranding } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { ALL_CAMPS } from '../campBrand';

const CAMPS = ALL_CAMPS;

type Step = 'pick-camp' | 'login' | 'success';

export const CampBrandedFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('pick-camp');
  const [selectedCamp, setSelectedCamp] = useState<CampBranding>(CAMPS[0]);

  if (step === 'pick-camp') {
    return (
      <AuthLayout>
        <h1 className="cm-auth-title">Camp-Branded Login</h1>
        <p className="cm-auth-subtitle">
          Select a camp to see how the login page looks with their branding.
        </p>
        <div className="cm-auth-form">
          {CAMPS.map((camp) => (
            <button
              key={camp.name}
              className="cm-auth-camp-card"
              style={{ borderColor: camp.accentColor }}
              onClick={() => {
                setSelectedCamp(camp);
                setStep('login');
              }}
            >
              <div
                className="cm-auth-camp-card__logo"
                style={{ backgroundColor: camp.accentColor }}
              >
                {camp.initials}
              </div>
              <span className="cm-auth-camp-card__name">{camp.name}</span>
            </button>
          ))}
        </div>
        <button className="cm-auth-link" onClick={() => navigate('/auth')}>
          &larr; Back to all flows
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      camp={selectedCamp}
      onBack={step === 'login' ? () => setStep('pick-camp') : undefined}
    >
      {step === 'login' && (
        <>
          <h1 className="cm-auth-title">Sign in to {selectedCamp.name}</h1>
          <p className="cm-auth-subtitle">
            Enter your credentials to access your camp account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              placeholder="parent@example.com"
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              style={{ backgroundColor: selectedCamp.accentColor }}
              onClick={() => setStep('success')}
            >
              Sign In
            </button>
            <button
              className="cm-auth-link"
              onClick={() => navigate('/auth/password-reset')}
            >
              Forgot password?
            </button>
            <div className="cm-auth-divider">Don't have an account?</div>
            <button
              className="cm-auth-link"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/auth/signup')}
            >
              Create an account
            </button>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome!</h1>
          <p className="cm-auth-subtitle">
            You're signed in to {selectedCamp.name}.
          </p>
          <Button variant="secondary" onClick={() => setStep('pick-camp')}>
            Try Another Camp
          </Button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
