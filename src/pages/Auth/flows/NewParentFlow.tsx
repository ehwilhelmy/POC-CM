import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'verify-code'
  | 'create-account'
  | 'welcome';

export const NewParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('jane.smith@email.com');

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'email-entry'
          ? () => setStep('camp-website')
          : step === 'verify-code'
            ? () => setStep('email-entry')
            : step === 'create-account'
              ? () => setStep('verify-code')
              : undefined
      }
    >
      {/* Step 1: Identifier-first entry (same screen for login AND signup) */}
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
              onClick={() => setStep('verify-code')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => setStep('verify-code')}>
              Sign up
            </button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Identifier-first.</strong> The parent enters their email on one
              screen — the system checks if an account exists and routes to login or
              signup automatically. No more guessing which button to click.
            </span>
          </div>
        </>
      )}

      {/* Step 2: Verify email with 6-digit code (Auth0 signup-id prompt) */}
      {step === 'verify-code' && (
        <>
          <h1 className="cm-auth-title">Verify your identity</h1>
          <p className="cm-auth-subtitle">
            We&rsquo;ve sent an email with your code to:<br />
            <strong>{email}</strong>
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Enter the 6-digit code *"
              placeholder="000000"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('create-account')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Didn&rsquo;t receive a code?{' '}
            <button className="cm-auth-link">Resend</button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Email verified inline.</strong> No more blocking &ldquo;check your
              inbox&rdquo; dead end. The parent verifies ownership with a code right here,
              then moves on to set up their account.
            </span>
          </div>
        </>
      )}

      {/* Step 3: Set password + name (Auth0 signup-password prompt) */}
      {step === 'create-account' && (
        <>
          <h1 className="cm-auth-title">Create your account</h1>
          <p className="cm-auth-subtitle">
            Set a password to finish setting up your {CAMP.name} portal.
          </p>
          <div className="cm-auth-form">
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput
              label="Password"
              placeholder="At least 8 characters"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('welcome')}
            >
              Create Account
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Email already verified.</strong> The parent proved ownership in the
              previous step, so there&rsquo;s no blocking verification here. Just set a
              password and name — one clean step to finish. This is Auth0&rsquo;s{' '}
              <em>signup-password</em> prompt.
            </span>
          </div>
        </>
      )}

      {/* Step 4: Success */}
      {step === 'welcome' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome to {CAMP.name}!</h1>
          <p className="cm-auth-subtitle">
            Your account is ready. You can manage enrollment, view forms, and
            stay connected with camp.
          </p>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>3 steps, no dead ends.</strong> Email → verify code → set password.
              The parent never had to choose between login and signup. No blocking
              verification email. No wrong-path confusion.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
          >
            Go to My Dashboard
          </button>
          <button className="cm-auth-link" onClick={() => setStep('camp-website')}>
            Restart flow
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
