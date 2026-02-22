import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { EmailPopup } from '../components/EmailPopup';
import { ClickableCode } from '../components/GmailInbox';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
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

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  if (step === 'dashboard') {
    return (
      <CampInTouchDashboard
        firstName="Jane"
        onHome={() => setStep('camp-website')}
        onRestart={() => setStep('camp-website')}
        onBackToFlows={() => navigate('/auth')}
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
            ? () => setStep('email-entry')
            : step === 'create-account'
              ? () => setStep('verify-code')
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

      {/* Step 2: Verify code */}
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
              ref={codeInputRef}
            />
            {codeCopied ? (
              <button
                className="cm-auth-btn cm-auth-btn--primary"
                onClick={() => setStep('create-account')}
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
              <strong>Real-world email flow.</strong> Click &ldquo;Check your email&rdquo;
              to see the Gmail popup — find the code, click to copy, then paste it
              into the input. Just like real life.
            </span>
          </div>
        </>
      )}

      {/* Step 3: Set password + name */}
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
            onClick={() => setStep('dashboard')}
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
