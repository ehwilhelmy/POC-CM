import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import './EmailPreviewFlow.css';
import { CAMP } from '../campBrand';

type EmailType = 'verification' | 'password-reset' | 'invitation';

const emails: Record<EmailType, { subject: string; body: React.ReactNode }> = {
  verification: {
    subject: `Verify your email for ${CAMP.name}`,
    body: (
      <>
        <p className="cm-email__greeting">Hi Jane,</p>
        <p>
          Thanks for creating your account with <strong>{CAMP.name}</strong> on
          CampMinder. Please verify your email address by clicking the button
          below.
        </p>
        <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
          Verify Email Address
        </a>
        <p className="cm-email__muted">
          This link will expire in 7 days. If you didn't create this account,
          you can safely ignore this email.
        </p>
      </>
    ),
  },
  'password-reset': {
    subject: `Reset your password — ${CAMP.name}`,
    body: (
      <>
        <p className="cm-email__greeting">Hi Jane,</p>
        <p>
          We received a request to reset your password for your{' '}
          <strong>{CAMP.name}</strong> CampMinder account. Click the button
          below to choose a new password.
        </p>
        <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
          Reset Password
        </a>
        <p className="cm-email__muted">
          This link will expire in 1 hour. If you didn't request this, no
          changes will be made to your account.
        </p>
      </>
    ),
  },
  invitation: {
    subject: `You're invited to ${CAMP.name} on CampMinder`,
    body: (
      <>
        <p className="cm-email__greeting">Hi there,</p>
        <p>
          <strong>{CAMP.name}</strong> has invited you to join CampMinder,
          the platform your camp uses for enrollment, communication, and more.
        </p>
        <p>
          Getting started only takes a minute — create your account and you'll
          be connected to your camp right away.
        </p>
        <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
          Accept Invitation
        </a>
        <p className="cm-email__muted">
          Questions? Contact {CAMP.name} directly at{' '}
          <a href="#">info@camptallpines.com</a>
        </p>
      </>
    ),
  },
};

export const EmailPreviewFlow: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<EmailType>('verification');

  const email = emails[selected];

  return (
    <AuthLayout>
      <h1 className="cm-auth-title">Branded Emails</h1>
      <p className="cm-auth-subtitle">
        Preview how camp-branded transactional emails would look to parents.
      </p>

      {/* Email type selector */}
      <div className="cm-email-tabs">
        {(Object.keys(emails) as EmailType[]).map((type) => (
          <button
            key={type}
            className={`cm-email-tab ${selected === type ? 'cm-email-tab--active' : ''}`}
            onClick={() => setSelected(type)}
          >
            {type === 'password-reset' ? 'Password Reset' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Email preview */}
      <div className="cm-email-preview">
        <div className="cm-email-preview__header">
          <div className="cm-email-preview__meta">
            <span className="cm-email-preview__from">
              From: {CAMP.name} via CampMinder
            </span>
            <span className="cm-email-preview__subject">{email.subject}</span>
          </div>
        </div>

        <div className="cm-email-preview__body">
          {/* Camp branded header */}
          <div className="cm-email__camp-banner" style={{ backgroundColor: CAMP.accentColor }}>
            <div className="cm-email__camp-banner-logo">{CAMP.initials}</div>
            <span className="cm-email__camp-banner-name">{CAMP.name}</span>
          </div>

          <div className="cm-email__content">{email.body}</div>

          {/* Footer */}
          <div className="cm-email__footer">
            <span className="cm-email__footer-brand">
              Powered by CampMinder
            </span>
            <span className="cm-email__footer-links">
              Help Center &middot; Privacy Policy &middot; Unsubscribe
            </span>
          </div>
        </div>
      </div>

      <button className="cm-auth-link" onClick={() => navigate('/auth')}>
        &larr; Back to all flows
      </button>
    </AuthLayout>
  );
};
