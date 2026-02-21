import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'choose-path'
  | 'signup-duplicate'
  | 'login-no-account'
  | 'dead-end'
  | 'recovered';

export const WrongPathFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [wrongChoice, setWrongChoice] = useState<'signup' | 'login' | null>(null);

  if (step === 'camp-website') {
    return (
      <CampWebsite onPortalClick={() => setStep('choose-path')} />
    );
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'choose-path'
          ? () => setStep('camp-website')
          : step === 'signup-duplicate' || step === 'login-no-account'
            ? () => setStep('choose-path')
            : step === 'dead-end'
              ? () => setStep(wrongChoice === 'signup' ? 'signup-duplicate' : 'login-no-account')
              : undefined
      }
    >
      {step === 'choose-path' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} with your email to continue.
          </p>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => { setWrongChoice('login'); setStep('login-no-account'); }}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => { setWrongChoice('signup'); setStep('signup-duplicate'); }}>
              Sign up
            </button>
          </p>
          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>This is the current experience.</strong> The parent must choose between
              Sign In and Sign Up before entering their email. They don't know which path
              to pick.
            </span>
          </div>
        </>
      )}

      {step === 'signup-duplicate' && (
        <>
          <h1 className="cm-auth-title">Create your account</h1>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="jane.smith@email.com"
              type="email"
            />
            <TextInput
              label="First name"
              value="Jane"
            />
            <TextInput
              label="Last name"
              value="Smith"
            />
            <TextInput
              label="Password"
              placeholder="Create a password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('dead-end')}
            >
              Create Account
            </button>
          </div>
        </>
      )}

      {step === 'login-no-account' && (
        <>
          <h1 className="cm-auth-title">Sign in</h1>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="new.parent@email.com"
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('dead-end')}
            >
              Sign In
            </button>
          </div>
        </>
      )}

      {step === 'dead-end' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              {wrongChoice === 'signup' ? (
                <>
                  <strong>An account with this email already exists.</strong>
                  <br />
                  Please sign in instead, or use a different email address.
                </>
              ) : (
                <>
                  <strong>Wrong email or password.</strong>
                  <br />
                  Please check your credentials and try again.
                </>
              )}
            </div>
          </div>

          <h1 className="cm-auth-title">
            {wrongChoice === 'signup' ? 'Account already exists' : 'Can\'t sign in'}
          </h1>

          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              {wrongChoice === 'signup' ? (
                <>
                  <strong>This is the failure loop.</strong> The parent tries to create
                  an account, gets told one exists, goes to sign in, doesn't know the
                  password (it was migrated), tries to reset, gets lost. This drives the
                  536% increase in support cases.
                </>
              ) : (
                <>
                  <strong>Dead end.</strong> The parent tries to sign in but doesn't
                  have an account. The error says "wrong password" not "no account found."
                  They try resetting a password for an account that doesn't exist.
                </>
              )}
            </span>
          </div>

          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('recovered')}
            >
              {wrongChoice === 'signup' ? 'Go to Sign In' : 'Create Account Instead'}
            </button>
            <button
              className="cm-auth-btn cm-auth-btn--secondary"
              onClick={() => setStep('choose-path')}
            >
              Start Over
            </button>
          </div>
        </>
      )}

      {step === 'recovered' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Recovered</h1>
          <p className="cm-auth-subtitle">
            With the identity-first approach (Journey 1), the system detects the right
            path automatically — no wrong guesses, no dead ends.
          </p>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <span>
              <strong>Proposed fix:</strong> Email-first entry point. System checks
              if account exists and routes to the correct flow. Parent never has to
              guess between login and signup.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--secondary"
            onClick={() => { setStep('camp-website'); setWrongChoice(null); }}
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
