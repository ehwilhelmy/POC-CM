import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { EmailPopup } from '../components/EmailPopup';
import { ClickableCode } from '../components/GmailInbox';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';
import './EmailPreviewFlow.css';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'password'
  | 'password-error'
  | 'request'
  | 'check-email'
  | 'new-password'
  | 'success'
  | 'dashboard';

export const ForgotPasswordFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [emailOpen, setEmailOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  if (step === 'dashboard') {
    return (
      <CampInTouchDashboard
        firstName="Jane"
        onHome={() => navigate('/auth')}
      />
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
            : step === 'request'
              ? () => setStep('password-error')
              : step === 'check-email'
                ? () => setStep('request')
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
              placeholder="yourname@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!email.trim()}
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
        </>
      )}

      {/* Step 2: Password entry — clean, no error yet */}
      {step === 'password' && (
        <>
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} as <strong>{email}</strong>
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
              onClick={() => setStep('password-error')}
            >
              Continue
            </button>
            <button
              className="cm-auth-link"
              onClick={() => setStep('request')}
            >
              Forgot password?
            </button>
          </div>
        </>
      )}

      {/* Step 3: Password error — after failed attempt */}
      {step === 'password-error' && (
        <>
          <div className="cm-auth-error-banner">
            <ErrorOutlineIcon className="cm-auth-error-banner__icon" fontSize="small" />
            <div>
              <strong>Wrong email or password.</strong>
              <br />
              Please check your credentials and try again, or{' '}
              <button
                className="cm-auth-link"
                style={{ color: 'inherit', textDecoration: 'underline', fontSize: 'inherit' }}
                onClick={() => setStep('request')}
              >
                reset your password
              </button>.
            </div>
          </div>
          <h1 className="cm-auth-title">Enter your password</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} as <strong>{email}</strong>
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              error="The email or password for this account is incorrect"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!loginPassword.trim()}
              onClick={() => setStep('password-error')}
            >
              Continue
            </button>
            <button
              className="cm-auth-link"
              onClick={() => setStep('request')}
            >
              Forgot password?
            </button>
          </div>
          <div className="cm-auth-migration-banner">
            <InfoOutlinedIcon className="cm-auth-migration-banner__icon" fontSize="small" />
            <span>
              Our security system was recently updated. If you haven&rsquo;t
              logged in recently, your previous password may no longer work.
              Use <button
                className="cm-auth-link"
                style={{ color: 'inherit', textDecoration: 'underline', fontSize: 'inherit' }}
                onClick={() => setStep('request')}
              >&ldquo;Forgot password?&rdquo;</button> to set a new one.
            </span>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Migration context.</strong> This warning addresses pre-Auth0
              parents whose passwords changed during migration. It explains why
              their old password might not work without blaming them.
            </span>
          </div>
        </>
      )}

      {/* Step 3: Enter email for reset */}
      {step === 'request' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            Enter the email address you use for your {CAMP.name} account.
            We&rsquo;ll send you a code to create a new password.
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
              disabled={!email.trim()}
              onClick={() => setStep('check-email')}
            >
              Continue
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Email pre-filled.</strong> The parent came from the password
              screen, so the email carries over — no re-entering it. The
              system already knows who they are.
            </span>
          </div>
        </>
      )}

      {/* Step 4: Check email */}
      {step === 'check-email' && (
        <>
          <h1 className="cm-auth-title">Check your email</h1>
          <p className="cm-auth-subtitle">
            We sent a 6-digit code to<br />
            <strong>{email}</strong>
          </p>

          <div className="cm-auth-form">
            <TextInput
              label="Enter the 6-digit code *"
              placeholder="000000"
              ref={codeInputRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeCopied ? (
              <button
                className="cm-auth-btn cm-auth-btn--primary"
                disabled={!code.trim()}
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
            <button className="cm-auth-link" onClick={() => setStep('request')}>
              Resend
            </button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Real-world email flow.</strong> Click &ldquo;Check your email&rdquo;
              to see the Gmail popup — find the code, click to copy, then paste it
              into the input. Just like real life.
            </span>
          </div>
        </>
      )}

      {/* Step 5: Set new password */}
      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <p className="cm-auth-subtitle">
            Choose a new password for your {CAMP.name} account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="New password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              label="Confirm new password"
              placeholder="Re-enter your new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordRequirements password={password} confirmPassword={confirmPassword} />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!allValid}
              onClick={() => setStep('success')}
            >
              Update Password
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Identity already verified.</strong> The parent proved
              ownership with the 6-digit code, so this is just setting a new
              password. Clean and fast.
            </span>
          </div>
        </>
      )}

      {/* Step 6: Success — matches Auth0's minimal "Password Changed!" screen */}
      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon" style={{ background: 'none', border: '2px solid var(--color-success)', color: 'var(--color-success)' }}>
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Password Changed!</h1>
          <p className="cm-auth-subtitle">
            Your password has been changed successfully.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('dashboard')}
          >
            Go to My Dashboard
          </button>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Auto-login after reset.</strong> The parent already verified their
              identity with the 6-digit code and just typed their new password — no need
              to sign in again. Straight to the dashboard, zero extra friction.
            </span>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
