import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'login-attempt'
  | 'password-fail'
  | 'confusion'
  | 'reset-password'
  | 'check-email'
  | 'new-password'
  | 'success';

export const MigratedParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');

  if (step === 'camp-website') {
    return (
      <CampWebsite onPortalClick={() => setStep('login-attempt')} />
    );
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'login-attempt'
          ? () => setStep('camp-website')
          : step === 'password-fail'
            ? () => setStep('login-attempt')
            : step === 'confusion'
              ? () => setStep('password-fail')
              : step === 'reset-password'
                ? () => setStep('confusion')
                : undefined
      }
    >
      {step === 'login-attempt' && (
        <>
          <h1 className="cm-auth-title">Welcome back</h1>
          <p className="cm-auth-subtitle">
            Sign in to your {CAMP.name} parent account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="jane.smith@email.com"
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              helperText="Using their old CampMinder password..."
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('password-fail')}
            >
              Sign In
            </button>
          </div>
        </>
      )}

      {step === 'password-fail' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              <strong>Wrong email or password.</strong>
            </div>
          </div>
          <h1 className="cm-auth-title">Welcome back</h1>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="jane.smith@email.com"
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              error=" "
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('confusion')}
            >
              Try Again
            </button>
            <button
              className="cm-auth-link"
              onClick={() => setStep('reset-password')}
            >
              Forgot password?
            </button>
          </div>
          {/* Annotation */}
          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>This is the migrated parent.</strong> They used CampMinder last summer.
              Their old password no longer works because their account was migrated to Auth0.
              They have no idea this happened.
            </span>
          </div>
        </>
      )}

      {step === 'confusion' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              <strong>Wrong email or password.</strong>
              <br />
              You have 2 attempts remaining before your account is locked.
            </div>
          </div>
          <h1 className="cm-auth-title">Welcome back</h1>
          <p className="cm-auth-subtitle">
            Still using their old password. Getting frustrated. About to call camp.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="jane.smith@email.com"
              type="email"
            />
            <TextInput
              label="Password"
              type="password"
              error="Incorrect password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('reset-password')}
            >
              Reset My Password
            </button>
          </div>
          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>This is where support calls spike.</strong> The parent doesn't understand
              why their password stopped working. The error message gives no indication
              that a migration happened. Camp staff have to explain Auth0.
            </span>
          </div>
        </>
      )}

      {step === 'reset-password' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            We'll send you a link to create a new password for your account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              value="jane.smith@email.com"
              type="email"
              disabled
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('check-email')}
            >
              Send Reset Link
            </button>
          </div>
        </>
      )}

      {step === 'check-email' && (
        <div className="cm-auth-success">
          <h1 className="cm-auth-title">Check your email</h1>
          <p className="cm-auth-subtitle">
            We sent a reset link to <strong>jane.smith@email.com</strong>.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('new-password')}
          >
            Continue Demo
          </button>
        </div>
      )}

      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <div className="cm-auth-form">
            <TextInput
              label="New password"
              placeholder="At least 8 characters"
              type="password"
            />
            <TextInput
              label="Confirm password"
              placeholder="Re-enter password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('success')}
            >
              Update Password
            </button>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">You're back in</h1>
          <p className="cm-auth-subtitle">
            Password updated. The parent can now access {CAMP.name}.
          </p>
          <div className="cm-auth-warning-banner" style={{ textAlign: 'left' }}>
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>This took 8+ steps and possibly a support call.</strong> With proactive
              migration emails and a dedicated "returning from last year?" flow, this
              could be 3 steps.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--secondary"
            onClick={() => setStep('camp-website')}
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
