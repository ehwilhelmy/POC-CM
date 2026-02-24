import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CampWebsite } from '../components/CampWebsite';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP_TALL_PINES, CAMP_SUNSHINE, CAMPMINDER_DEFAULT } from '../campBrand';
import './ExistingAccountNewCampFlow.css';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'account-found'
  | 'password'
  | 'loading'
  | 'dashboard';

export const ExistingAccountNewCampFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP_TALL_PINES;
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
          : step === 'account-found'
            ? () => setStep('email-entry')
            : step === 'password'
              ? () => setStep('account-found')
              : undefined
      }
    >
      {/* Step 1: Identifier-first — email only */}
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Log in</h1>
          <p className="cm-auth-subtitle">Enter your email to continue.</p>
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
              onClick={() => setStep('account-found')}
            >
              Continue
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Identifier-first.</strong> The system checks the email and
              discovers this caregiver already has a campminder account at
              another camp. Instead of creating a duplicate, it routes to
              the account-linking flow.
            </span>
          </div>
        </>
      )}

      {/* Step 2: Account found — two camp badges */}
      {step === 'account-found' && (
        <>
          <h1 className="cm-auth-title">We found your campminder account!</h1>
          <div className="cm-auth-found">
            <p className="cm-auth-found__explanation">
              It looks like you already have a campminder account.
              Confirm your identity to add <strong>{CAMP_TALL_PINES.name}</strong> to
              your existing account.
            </p>
            <div className="cm-auth-found__camps">
              <div className="cm-auth-found__camp cm-auth-found__camp--existing">
                <div
                  className="cm-auth-found__camp-initials"
                  style={{ backgroundColor: CAMP_SUNSHINE.accentColor }}
                >
                  {CAMP_SUNSHINE.initials}
                </div>
                <span className="cm-auth-found__camp-name">{CAMP_SUNSHINE.name}</span>
                <span className="cm-auth-found__camp-badge">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Linked
                </span>
              </div>
              <span className="cm-auth-found__connector">+</span>
              <div className="cm-auth-found__camp cm-auth-found__camp--new">
                <div
                  className="cm-auth-found__camp-initials"
                  style={{ backgroundColor: CAMP_TALL_PINES.accentColor }}
                >
                  {CAMP_TALL_PINES.initials}
                </div>
                <span className="cm-auth-found__camp-name">{CAMP_TALL_PINES.name}</span>
                <span className="cm-auth-found__camp-badge cm-auth-found__camp-badge--adding">
                  <AddCircleOutlineIcon sx={{ fontSize: 14 }} /> Adding
                </span>
              </div>
            </div>
          </div>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('password')}
            >
              Confirm identity
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Account linking.</strong> Instead of creating a duplicate
              account, the system shows the caregiver their existing camp and
              the new camp being added. One identity, multiple camps — no
              duplicate accounts, no confusion.
            </span>
          </div>
        </>
      )}

      {/* Step 3: Password entry to confirm identity */}
      {step === 'password' && (
        <>
          <h1 className="cm-auth-title">Welcome back, {firstName}</h1>
          <p className="cm-auth-subtitle">
            Enter your password to confirm your identity and
            add <strong>{CAMP_TALL_PINES.name}</strong> to your account.
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
              <strong>Identity confirmation.</strong> The caregiver proves they
              own the existing account. After verification, the new camp is
              automatically linked — no duplicate registration needed.
            </span>
          </div>
        </>
      )}

      {/* Step 4: Loading transition */}
      {step === 'loading' && (
        <div className="cm-auth-loading">
          <div className="cm-auth-loading__spinner" />
          <p className="cm-auth-subtitle">
            Adding {CAMP_TALL_PINES.name} to your account&hellip;
          </p>
        </div>
      )}
    </AuthLayout>
  );
};
