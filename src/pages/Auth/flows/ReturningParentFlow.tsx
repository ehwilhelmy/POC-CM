import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP, CAMPMINDER_DEFAULT } from '../campBrand';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'password'
  | 'loading'
  | 'dashboard';

export const ReturningParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP;
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError = emailTouched && email.trim() && !isValidEmail
    ? 'Please enter a valid email address'
    : undefined;
  const firstName = email.split('@')[0]?.split(/[._-]/)[0]?.replace(/^./, c => c.toUpperCase()) || '';

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => setStep('dashboard'), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  if (step === 'dashboard') {
    return (
      <CampInTouchDashboard
        firstName={firstName || 'Jane'}
        onHome={() => navigate('/auth')}
      />
    );
  }

  return (
    <AuthLayout
      camp={brand}
      onBack={
        step === 'email-entry'
          ? () => setStep('camp-website')
          : step === 'password'
            ? () => setStep('email-entry')
            : undefined
      }
    >
      {/* Step 1: Identifier-first — email only (Auth0 login-id prompt) */}
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Log in</h1>
          <p className="cm-auth-subtitle">
            Enter your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              placeholder="yourname@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!isValidEmail}
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

        </>
      )}

      {/* Step 2: Password entry (Auth0 login-password prompt) */}
      {step === 'password' && (
        <>
          <h1 className="cm-auth-title">Welcome back, {firstName}</h1>
          <p className="cm-auth-subtitle">
            Enter password for <strong>{email}</strong>
          </p>

          <div className="cm-auth-form">
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!loginPassword.trim()}
              onClick={() => setStep('loading')}
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

      {/* Step 3: Loading transition */}
      {step === 'loading' && (
        <div className="cm-auth-loading">
          <div className="cm-auth-loading__spinner" />
          <p className="cm-auth-subtitle">Signing you in&hellip;</p>
        </div>
      )}
    </AuthLayout>
  );
};
