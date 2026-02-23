import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AuthLayout } from '../components/AuthLayout';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { GuestAccountsPage } from '../components/GuestAccountsPage';
import { GuestDashboard } from '../components/GuestDashboard';
import { EmailPopup } from '../components/EmailPopup';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { TextInput } from '../../../components/TextInput';
import { CAMP, CAMPMINDER_DEFAULT } from '../campBrand';
import './EmailPreviewFlow.css';

type Step =
  | 'caretaker-dashboard'
  | 'guest-accounts-page'
  | 'guest-email'
  | 'create-account'
  | 'success'
  | 'guest-dashboard';

export const GuestAccountFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP;
  const [step, setStep] = useState<Step>('caretaker-dashboard');
  const [emailOpen, setEmailOpen] = useState(false);
  const [guestNote, setGuestNote] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);

  // Auto-open email popup when entering the guest-email step
  useEffect(() => {
    if (step === 'guest-email') {
      const timer = setTimeout(() => setEmailOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Step 1: Caretaker's CampInTouch dashboard
  if (step === 'caretaker-dashboard') {
    return (
      <CampInTouchDashboard
        firstName="Jane"
        onHome={() => navigate('/auth')}
        onLinkClick={{
          'Guest Accounts': () => setStep('guest-accounts-page'),
        }}
      />
    );
  }

  // Step 2: Guest accounts invite page
  if (step === 'guest-accounts-page') {
    return (
      <GuestAccountsPage
        onSubmit={(note) => {
          setGuestNote(note);
          setStep('guest-email');
        }}
        onHome={() => navigate('/auth')}
      />
    );
  }

  // Step 6: Guest dashboard
  if (step === 'guest-dashboard') {
    return (
      <GuestDashboard
        firstName="Ruth"
        onHome={() => navigate('/auth')}
      />
    );
  }

  // Steps 3-5 use AuthLayout
  return (
    <AuthLayout
      camp={brand}
      onBack={
        step === 'create-account'
          ? () => setStep('guest-email')
          : undefined
      }
    >
      {/* Step 3: Guest email (shown behind the popup) */}
      {step === 'guest-email' && (
        <>
          <div style={{
            textAlign: 'center',
            padding: '12px 16px',
            background: '#eef5f1',
            borderRadius: 8,
            marginBottom: 16,
            fontSize: 13,
            color: '#2d6a4f',
            fontWeight: 600,
          }}>
            You are now viewing the guest&rsquo;s email inbox.
          </div>

          <h1 className="cm-auth-title">Check your email</h1>
          <p className="cm-auth-subtitle">
            Ruth, Jane Smith has sent you an invitation to create a guest
            account for Tommy at {brand.name}.
          </p>

          <button
            className="cm-email-popup-trigger"
            onClick={() => setEmailOpen(true)}
          >
            Open email inbox
          </button>

          <EmailPopup
            open={emailOpen}
            onClose={() => setEmailOpen(false)}
            senderName={`${brand.name} via campminder`}
            senderEmail="noreply@campminder.com"
            subject={`You've been invited to Camp Tall Pines`}
            accentColor={brand.accentColor}
            verificationCode=""
          >
            {/* Camp-branded email content */}
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
              <p className="cm-email__greeting">Hi Ruth,</p>
              <p>
                <strong>Jane Smith</strong> has invited you to be a guest on{' '}
                <strong>Tommy Smith&rsquo;s</strong> Camp Tall Pines account.
              </p>
              <p>As a guest, you can:</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20, fontSize: 13, lineHeight: 1.8 }}>
                <li>View photos from camp</li>
                <li>Watch camp videos</li>
                <li>Send notes to Tommy</li>
              </ul>
              {guestNote && (
                <div style={{
                  background: '#f5f5f5',
                  borderLeft: `3px solid ${brand.accentColor}`,
                  padding: '10px 14px',
                  borderRadius: 4,
                  marginBottom: 16,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#444',
                }}>
                  <strong style={{ display: 'block', marginBottom: 4 }}>
                    A note from Jane:
                  </strong>
                  {guestNote}
                </div>
              )}
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <button
                  type="button"
                  className="cm-email__cta"
                  style={{ backgroundColor: brand.accentColor, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family-body)' }}
                  onClick={() => {
                    setEmailOpen(false);
                    setStep('create-account');
                  }}
                >
                  Create Guest Account
                </button>
              </div>
              <p className="cm-email__muted">
                If you didn&rsquo;t expect this email, you can safely ignore it.
              </p>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__footer-brand">Powered by campminder</span>
              <span className="cm-email__footer-links">
                Help Center &middot; Privacy Policy
              </span>
            </div>
          </EmailPopup>
        </>
      )}

      {/* Step 4: Create account (Auth0-style) */}
      {step === 'create-account' && (
        <>
          <h1 className="cm-auth-title">Create your guest account</h1>
          <p className="cm-auth-subtitle">
            Set a password to access Tommy&rsquo;s updates at {brand.name}.
          </p>
          <div className="cm-auth-form">
            <TextInput label="First name" value="Ruth" />
            <TextInput label="Last name" value="Smith" />
            <TextInput label="Email" value="grandma.ruth@email.com" readOnly />
            <TextInput
              label="Password *"
              placeholder="Create a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              label="Confirm password *"
              placeholder="Re-enter your password"
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
              Create Account
            </button>
          </div>
        </>
      )}

      {/* Step 5: Success */}
      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome, Ruth!</h1>
          <p className="cm-auth-subtitle">
            You can now view Tommy&rsquo;s photos and updates at {brand.name}.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('guest-dashboard')}
          >
            Go to My Dashboard
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
