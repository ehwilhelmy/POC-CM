import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'login'
  | 'login-error'
  | 'account-locked'
  | 'success';

export const ReturningParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [simulateError, setSimulateError] = useState(false);

  if (step === 'camp-website') {
    return (
      <CampWebsite onPortalClick={() => setStep('login')} />
    );
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'login' || step === 'login-error'
          ? () => setStep('camp-website')
          : undefined
      }
    >
      {(step === 'login' || step === 'login-error') && (
        <>
          <h1 className="cm-auth-title">Welcome back</h1>
          <p className="cm-auth-subtitle">
            Sign in to your {CAMP.name} parent account.
          </p>

          {step === 'login-error' && (
            <div className="cm-auth-error-banner">
              <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
              <div>
                <strong>Wrong email or password.</strong>
                <br />
                Please check your credentials and try again, or{' '}
                <button
                  className="cm-auth-link"
                  style={{ color: 'inherit', textDecoration: 'underline', fontSize: 'inherit' }}
                  onClick={() => navigate('/auth/forgot-password')}
                >
                  reset your password
                </button>.
              </div>
            </div>
          )}

          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              placeholder="yourname@email.com"
              type="email"
              error={step === 'login-error' ? ' ' : undefined}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={step === 'login-error' ? ' ' : undefined}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => {
                if (simulateError) {
                  setStep('login-error');
                } else {
                  setStep('success');
                }
              }}
            >
              Sign In
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="cm-auth-link"
                onClick={() => navigate('/auth/forgot-password')}
              >
                Forgot password?
              </button>
              <button
                className="cm-auth-link"
                onClick={() => navigate('/auth/new-parent')}
              >
                Create account
              </button>
            </div>

          </div>

          {/* Testing toggle */}
          <label className="cm-auth-test-toggle">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => {
                setSimulateError(e.target.checked);
                if (!e.target.checked && step === 'login-error') setStep('login');
              }}
            />
            Simulate: wrong password (error state)
          </label>
        </>
      )}

      {step === 'account-locked' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              <strong>Account temporarily locked.</strong>
              <br />
              Too many failed attempts. Please try again in 15 minutes or reset
              your password.
            </div>
          </div>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => navigate('/auth/forgot-password')}
            >
              Reset Password
            </button>
            <button
              className="cm-auth-btn cm-auth-btn--secondary"
              onClick={() => { setStep('login'); setSimulateError(false); }}
            >
              Try Again Later
            </button>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome back, Jane!</h1>
          <p className="cm-auth-subtitle">
            You're signed in to {CAMP.name}. Taking you to your dashboard...
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => { setStep('camp-website'); setSimulateError(false); }}
          >
            Restart Flow
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
