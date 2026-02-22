import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AuthLayout } from '../components/AuthLayout';
import { EmailPopup } from '../components/EmailPopup';
import { ClickableCode } from '../components/GmailInbox';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';
import './EmailPreviewFlow.css';

type Step = 'request' | 'check-email' | 'new-password' | 'success';

export const ForgotPasswordFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [emailOpen, setEmailOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'request'
          ? () => navigate('/auth/returning-parent')
          : step === 'check-email'
            ? () => setStep('request')
            : undefined
      }
    >
      {/* Step 1: Enter email for reset */}
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
              onClick={() => setStep('check-email')}
            >
              Continue
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Email pre-filled.</strong> If the parent came from the password
              screen (Journey 2), the email carries over — no re-entering it. The
              system already knows who they are.
            </span>
          </div>
        </>
      )}

      {/* Step 2: Check email */}
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
            senderName={`${CAMP.name} via CampMinder`}
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
                CampMinder is:
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
              <span className="cm-email__footer-brand">Powered by CampMinder</span>
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

      {/* Step 3: Set new password */}
      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <p className="cm-auth-subtitle">
            Choose a new password for your {CAMP.name} account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="New password"
              placeholder="At least 8 characters"
              type="password"
            />
            <TextInput
              label="Confirm new password"
              placeholder="Re-enter your new password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
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

      {/* Step 4: Success */}
      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Password updated</h1>
          <p className="cm-auth-subtitle">
            Your password has been changed. You can now sign in to your {CAMP.name} account.
          </p>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>3 steps: email → code → new password.</strong> No hunting
              for a reset link in the inbox. Consistent code-based verification
              across signup and password reset.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => navigate('/auth/returning-parent')}
          >
            Sign In
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
