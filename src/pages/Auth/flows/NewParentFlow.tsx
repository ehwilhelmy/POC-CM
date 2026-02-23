import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  | 'verify-code'
  | 'create-account'
  | 'welcome'
  | 'dashboard';

export const NewParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [emailOpen, setEmailOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
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
          : step === 'verify-code'
            ? () => setStep('create-account')
            : undefined
      }
    >
      {/* Step 1: Identifier-first entry */}
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
              onClick={() => setStep('create-account')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => setStep('create-account')}>
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

      {/* Step 2: Create account */}
      {step === 'create-account' && (
        <>
          <h1 className="cm-auth-title">Create your {CAMP.name} account</h1>
          <p className="cm-auth-notice">
            We didn&rsquo;t find an account for <strong>{email}</strong>.
            Fill in the details below to get started with {CAMP.name}.
          </p>
          <div className="cm-auth-form">
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput label="Email" value={email} disabled />
            <TextInput
              label="Password"
              placeholder="Create a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              label="Confirm password"
              placeholder="Re-enter your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordRequirements password={password} confirmPassword={confirmPassword} />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!allValid}
              onClick={() => setStep('verify-code')}
            >
              Create Account
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            <button className="cm-auth-link" onClick={() => setStep('email-entry')}>
              Try another email
            </button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>No account found.</strong> The system detected this email
              doesn&rsquo;t have an account, so we skip straight to signup. No
              guessing between &ldquo;Log In&rdquo; and &ldquo;Sign Up.&rdquo;
            </span>
          </div>
        </>
      )}

      {/* Step 3: Verify email */}
      {step === 'verify-code' && (
        <>
          <h1 className="cm-auth-title">Verify your email</h1>
          <p className="cm-auth-subtitle">
            We&rsquo;ve sent a verification code to:<br />
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
                onClick={() => setStep('welcome')}
              >
                Verify &amp; Continue
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
            subject={`Your verification code — ${CAMP.name}`}
            accentColor={CAMP.accentColor}
            verificationCode="523816"
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
              <p className="cm-email__greeting">Hi there,</p>
              <p>
                Your verification code for <strong>{CAMP.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <ClickableCode
                  code="523816"
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
            <button className="cm-auth-link">Resend</button>
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Verify after account creation.</strong> The account is created
              first, then we verify email ownership. Click &ldquo;Check your
              email&rdquo; to see the branded verification email.
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
              <strong>3 steps, no dead ends.</strong> Email → create account → verify.
              The parent never had to choose between login and signup. The system
              detected no account and routed them straight to signup.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('dashboard')}
          >
            Go to My Dashboard
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
