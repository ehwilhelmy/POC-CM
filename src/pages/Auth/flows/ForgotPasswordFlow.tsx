import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { useStepNav } from '../hooks/useStepNav';
import { StepNav } from '../components/StepNav';
import { CAMP, CAMPMINDER_DEFAULT } from '../campBrand';
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
  | 'home';

const STEPS: readonly Step[] = ['camp-website', 'email-entry', 'password', 'password-error', 'request', 'check-email', 'new-password', 'success', 'home'] as const;

const SCOPE_ANNOTATIONS: Record<Step, string[]> = {
  'camp-website': [],
  'email-entry': [
    'Input: Email address',
    'Messaging: "Enter your email to get started"',
    'Logic: Email lookup detects existing account → routes to password',
  ],
  'password': [
    'Input: Password',
    'Messaging: "Welcome back, [name]"',
    'Link: "Forgot password?"',
  ],
  'password-error': [
    'Input: Password (with error)',
    'Messaging: "The email or password for this account is incorrect"',
    'Link: "Forgot password?"',
  ],
  'request': [
    'Input: Email address (pre-filled)',
    'Messaging: "Enter your email and we\'ll send you a code"',
  ],
  'check-email': [
    'Input: 6-digit reset code',
    'Messaging: "We sent a 6-digit code to [email]"',
    'Note: Email template is not in scope — just this screen',
  ],
  'new-password': [
    'Inputs: New password, Confirm new password',
    'Messaging: "This password will apply to all camps connected to your account"',
    'Validation: Password strength requirements',
  ],
  'success': [
    'Messaging: "Password Changed!" with clear next step',
    'Button: "Go to My Account"',
  ],
  'home': [],
};

export const ForgotPasswordFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP;
  const [step, setStep] = useState<Step>('camp-website');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [scopeActive, setScopeActive] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError = emailTouched && email.trim() && !isValidEmail
    ? 'Please enter a valid email address'
    : undefined;
  const firstName = email.split('@')[0]?.split(/[._-]/)[0]?.replace(/^./, c => c.toUpperCase()) || '';
  const [codeCopied, setCodeCopied] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);
  const stepNav = useStepNav(STEPS, step, setStep);

  const scopeToggleProps = {
    scopeActive,
    onScopeToggle: () => setScopeActive(!scopeActive),
  };

  // Auto-open email popup when reaching check-email step
  useEffect(() => {
    if (step === 'check-email') {
      const timer = setTimeout(() => setEmailOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [step]);


  if (step === 'camp-website') {
    return (
      <>
        <CampWebsite onPortalClick={() => setStep('email-entry')} />
        <StepNav {...stepNav} {...scopeToggleProps} />
      </>
    );
  }

  if (step === 'home') {
    return (
      <>
        <CampInTouchDashboard
          firstName={firstName || 'Jane'}
          onHome={() => navigate('/auth')}
        />
        <StepNav {...stepNav} {...scopeToggleProps} />
      </>
    );
  }

  return (
    <>
    <AuthLayout
      camp={brand}
      scopeActive={scopeActive}
      scopeAnnotations={SCOPE_ANNOTATIONS[step]}
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
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Enter your email to get started.
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
        </>
      )}

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

      {step === 'password-error' && (
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
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>&ldquo;Forgot password?&rdquo; only appears after account
              is confirmed.</strong> The caregiver entered their email on the
              previous screen &mdash; the system verified the account exists
              before showing the password step. No information is leaked about
              whether an email is registered until after confirmation.
            </span>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Multi-camp heads-up.</strong> The yellow banner mentions
              that a password reset applies to all connected camps. This sets
              expectations early &mdash; before they start the reset flow &mdash;
              so there are no surprises.
            </span>
          </div>
        </>
      )}

      {step === 'request' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            Enter your email address and we&rsquo;ll send you a code
            to create a new password.
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
            senderName={`${brand.name} via campminder`}
            senderEmail="noreply@campminder.com"
            subject={`Your password reset code — ${brand.name}`}
            accentColor={brand.accentColor}
            verificationCode="847291"
            onCodeCopied={() => {
              setCodeCopied(true);
              codeInputRef.current?.focus();
            }}
          >
            <div className="cm-email__camp-banner" style={{ backgroundColor: brand.accentColor }}>
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  style={{ width: 36, height: 36, borderRadius: '50%' }}
                />
              ) : (
                <div className="cm-email__camp-banner-logo">{brand.initials}</div>
              )}
              <span className="cm-email__camp-banner-name">{brand.name}</span>
            </div>
            <div className="cm-email__content">
              <p className="cm-email__greeting">Hi {firstName},</p>
              <p>
                Your password reset code for <strong>{brand.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <ClickableCode
                  code="847291"
                  accentColor={brand.accentColor}
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

      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <div className="cm-auth-migration-banner">
            <InfoOutlinedIcon className="cm-auth-migration-banner__icon" fontSize="small" />
            <span>
              Resetting your password will update it for all camps
              connected to your account.{' '}
              <button className="cm-auth-link" style={{ color: 'inherit', textDecoration: 'underline', fontSize: 'inherit' }}>
                Learn more
              </button>
            </span>
          </div>
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
              <strong>One password, all camps.</strong> Even though the
              caregiver entered through {brand.name}&rsquo;s branded page,
              this reset applies to their entire campminder account. If
              they&rsquo;re part of 2+ camps, the new password works
              everywhere &mdash; the copy makes that clear.
            </span>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon" style={{ background: 'none', border: '2px solid var(--color-success)', color: 'var(--color-success)' }}>
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Password Changed!</h1>
          <p className="cm-auth-subtitle">
            Your new password is set. Use it to sign in to any
            camp connected to your account.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('home')}
          >
            Go to My Account
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
    <StepNav {...stepNav} {...scopeToggleProps} />
    </>
  );
};
