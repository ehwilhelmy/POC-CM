import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { EmailPopup } from '../components/EmailPopup';
import { ClickableCode } from '../components/GmailInbox';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';
import './EmailPreviewFlow.css';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'password'
  | 'password-error'
  | 'confusion'
  | 'reset-password'
  | 'check-email'
  | 'new-password'
  | 'success';

export const MigratedParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [emailOpen, setEmailOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);

  if (step === 'camp-website') {
    return (
      <CampWebsite onPortalClick={() => setStep('email-entry')} />
    );
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'email-entry'
          ? () => setStep('camp-website')
          : step === 'password' || step === 'password-error'
            ? () => setStep('email-entry')
            : step === 'confusion'
              ? () => setStep('email-entry')
              : step === 'reset-password'
                ? () => setStep('confusion')
                : step === 'check-email'
                  ? () => setStep('reset-password')
                  : undefined
      }
    >
      {/* Step 1: Identifier-first — email only */}
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} with your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              value="jane.smith@email.com"
              type="email"
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
            <button className="cm-auth-link">Sign up</button>
          </p>
        </>
      )}

      {/* Step 2: Password entry */}
      {step === 'password' && (
        <>
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Log in as <strong>jane.smith@email.com</strong>
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              helperText="Using their old campminder password..."
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('password-error')}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {/* Step 3: Password error — wrong password, first attempt */}
      {step === 'password-error' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              <strong>Wrong email or password.</strong>
            </div>
          </div>
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Log in as <strong>jane.smith@email.com</strong>
          </p>
          <div className="cm-auth-form">
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
              <strong>This is the migrated parent.</strong> They used campminder last summer.
              Their old password no longer works because their account was migrated to Auth0.
              They have no idea this happened.
            </span>
          </div>
        </>
      )}

      {/* Step 4: Confusion — second failed attempt, escalation */}
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
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Still using their old password. Getting frustrated. About to call camp.
          </p>
          <div className="cm-auth-form">
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

      {/* Step 5: Reset password request */}
      {step === 'reset-password' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            We'll send you a code to create a new password for your account.
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
              onClick={() => { setCodeCopied(false); setStep('check-email'); }}
            >
              Send Reset Code
            </button>
          </div>
        </>
      )}

      {/* Step 6: Check email — email popup with code */}
      {step === 'check-email' && (
        <>
          <h1 className="cm-auth-title">Check your email</h1>
          <p className="cm-auth-subtitle">
            We sent a 6-digit code to<br />
            <strong>jane.smith@email.com</strong>
          </p>

          <div className="cm-auth-form">
            <TextInput
              label="Enter the 6-digit code *"
              placeholder="000000"
              ref={codeInputRef}
            />
            {codeCopied ? (
              <button
                className="cm-auth-btn cm-auth-btn--primary"
                onClick={() => setStep('new-password')}
              >
                Continue
              </button>
            ) : (
              <button
                className="cm-email-popup-trigger"
                onClick={() => setEmailOpen(true)}
              >
                Check your email
              </button>
            )}
          </div>

          <EmailPopup
            open={emailOpen}
            onClose={() => setEmailOpen(false)}
            senderName={`${CAMP.name} via campminder`}
            senderEmail="noreply@campminder.com"
            subject={`Your password reset code — ${CAMP.name}`}
            accentColor={CAMP.accentColor}
            verificationCode="847291"
            onCodeCopied={() => {
              setCodeCopied(true);
              codeInputRef.current?.focus();
            }}
          >
            <div className="cm-email__camp-banner" style={{ backgroundColor: CAMP.accentColor }}>
              {CAMP.logoUrl ? (
                <img
                  src={CAMP.logoUrl}
                  alt={CAMP.name}
                  style={{ width: 36, height: 36, borderRadius: '50%' }}
                />
              ) : (
                <div className="cm-email__camp-banner-logo">{CAMP.initials}</div>
              )}
              <span className="cm-email__camp-banner-name">{CAMP.name}</span>
            </div>
            <div className="cm-email__content">
              <p className="cm-email__greeting">Hi Jane,</p>
              <p>
                Your password reset code for <strong>{CAMP.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <ClickableCode
                  code="847291"
                  accentColor={CAMP.accentColor}
                  onCopied={() => {
                    setCodeCopied(true);
                    codeInputRef.current?.focus();
                  }}
                />
              </div>
              <p className="cm-email__muted">
                This code expires in 10 minutes. If you didn&rsquo;t request
                this, you can safely ignore this email.
              </p>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__footer-brand">Powered by campminder</span>
              <span className="cm-email__footer-links">
                Help Center &middot; Privacy Policy
              </span>
            </div>
          </EmailPopup>

          <p className="cm-auth-signup-prompt">
            Didn&rsquo;t receive a code?{' '}
            <button className="cm-auth-link" onClick={() => setStep('reset-password')}>
              Resend
            </button>
          </p>
        </>
      )}

      {/* Step 7: Create new password */}
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

      {/* Step 8: Success */}
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
