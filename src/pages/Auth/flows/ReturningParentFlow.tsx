import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'password'
  | 'password-error'
  | 'success';

export const ReturningParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [simulateError, setSimulateError] = useState(false);

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'email-entry'
          ? () => setStep('camp-website')
          : step === 'password' || step === 'password-error'
            ? () => setStep('email-entry')
            : undefined
      }
    >
      {/* Step 1: Identifier-first — email only (Auth0 login-id prompt) */}
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} with your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              placeholder="yourname@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('password')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => navigate('/auth/new-parent')}>
              Sign up
            </button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Identifier-first.</strong> Same entry screen for every user.
              The system checks the email and routes to login (this flow) or
              signup (Journey 1) automatically. No wrong-path guessing.
            </span>
          </div>

          {/* Testing toggle */}
          <label className="cm-auth-test-toggle">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
            />
            Simulate: wrong password on next step
          </label>
        </>
      )}

      {/* Step 2: Password entry (Auth0 login-password prompt) */}
      {(step === 'password' || step === 'password-error') && (
        <>
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} as <strong>{email}</strong>
          </p>

          {step === 'password-error' && (
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
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={step === 'password-error' ? ' ' : undefined}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => {
                if (simulateError) {
                  setStep('password-error');
                } else {
                  setStep('success');
                }
              }}
            >
              Continue
            </button>
            <button
              className="cm-auth-link"
              onClick={() => navigate('/auth/forgot-password')}
            >
              Forgot password?
            </button>
          </div>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Auth0 login-password prompt.</strong> The system already confirmed
              this email has an account. The parent only sees the password field — no
              email to re-enter, no confusion about whether they have an account.
            </span>
          </div>
        </>
      )}

      {/* Step 3: Success */}
      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome back, Jane!</h1>
          <p className="cm-auth-subtitle">
            You&rsquo;re signed in to {CAMP.name}. Taking you to your dashboard...
          </p>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>2 steps: email → password.</strong> The parent never had to choose
              between login and signup. The system knew they had an account and went
              straight to the password screen.
            </span>
          </div>
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
