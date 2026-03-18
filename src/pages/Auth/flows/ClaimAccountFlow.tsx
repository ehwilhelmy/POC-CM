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
  | 'create-password'
  | 'verify-code'
  | 'loading'
  | 'home';

const STEPS: readonly Step[] = ['camp-website', 'email-entry', 'create-password', 'verify-code', 'loading', 'home'] as const;

const SCOPE_ANNOTATIONS: Record<Step, string[]> = {
  'camp-website': [],
  'email-entry': [
    'Input: Email address',
    'Messaging: "Enter your email to get started"',
    'Logic: Email lookup detects pre-created account → routes to set password',
  ],
  'create-password': [
    'Inputs: Password, Confirm password',
    'Messaging: "[Camp] has already set up your account for [email]. Create a password to activate it."',
    'Validation: Password strength requirements',
  ],
  'verify-code': [
    'Input: 6-digit verification code',
    'Messaging: "We\'ve sent a verification code to [email]"',
    'Note: Email template is not in scope — just this screen',
  ],
  'loading': [
    'Auto sign-in after verification',
  ],
  'home': [],
};

export const ClaimAccountFlow: React.FC = () => {
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
  const [codeResent, setCodeResent] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);
  const stepNav = useStepNav(STEPS, step, setStep);

  const scopeToggleProps = {
    scopeActive,
    onScopeToggle: () => setScopeActive(!scopeActive),
  };

  // Auto-open email popup when reaching verify-code step
  useEffect(() => {
    if (step === 'verify-code') {
      const timer = setTimeout(() => setEmailOpen(true), 500);
      return () => clearTimeout(timer);
    }
    if (step === 'loading') {
      const timer = setTimeout(() => setStep('home'), 1500);
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
              onClick={() => setStep('create-password')}
            >
              Continue
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Identifier-first.</strong> The caregiver enters their email on one
              screen — the system checks if an account exists and routes accordingly.
            </span>
          </div>
        </>
      )}

      {step === 'create-password' && (
        <>
          <h1 className="cm-auth-title">Create your password</h1>
          <p className="cm-auth-notice">
            Good news! <strong>{brand.name}</strong> already has an account set up
            for <strong>{email || 'your email'}</strong>. Just create a password to get started.
          </p>
          <div className="cm-auth-form">
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
              Create Password
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
              <strong>Account pre-created by camp.</strong> The camp already added this
              caregiver&rsquo;s email and camper info. The caregiver just needs to set
              a password — no re-entering name or details.
            </span>
          </div>
        </>
      )}

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
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!code.trim()}
              onClick={() => setStep('loading')}
            >
              Verify &amp; Continue
            </button>
          </div>

          <p className="cm-auth-signup-prompt">
            <button className="cm-auth-link" onClick={() => setEmailOpen(true)}>
              Check your email
            </button>
          </p>

          <EmailPopup
            open={emailOpen}
            onClose={() => setEmailOpen(false)}
            senderName={`${brand.name} via campminder`}
            senderEmail="noreply@campminder.com"
            subject={`Your verification code — ${brand.name}`}
            accentColor={brand.accentColor}
            verificationCode="523816"
            onCodeCopied={() => {

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
                Your verification code for <strong>{brand.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <ClickableCode
                  code="523816"
                  accentColor={brand.accentColor}
                  onCopied={() => {
      
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
            {codeResent ? (
              <span style={{ color: 'var(--color-success)' }}>
                <CheckCircleOutlineIcon style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }} />
                Code resent to {email}
              </span>
            ) : (
              <>
                Didn&rsquo;t receive a code?{' '}
                <button className="cm-auth-link" onClick={() => setCodeResent(true)}>
                  Resend
                </button>
              </>
            )}
          </p>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Verify email ownership.</strong> Even though the camp pre-created
              the account, we still verify the caregiver owns this email address.
              Click &ldquo;Check your email&rdquo; to see the branded verification email.
            </span>
          </div>
        </>
      )}

      {step === 'loading' && (
        <div className="cm-auth-loading">
          <div className="cm-auth-loading__spinner" />
          <p className="cm-auth-subtitle">Activating your account&hellip;</p>
        </div>
      )}
    </AuthLayout>
    <StepNav {...stepNav} {...scopeToggleProps} />
    </>
  );
};
