import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GmailInbox } from '../components/GmailInbox';
import { CAMP } from '../campBrand';
import './EmailPreviewFlow.css';

type EmailType = 'verification' | 'password-reset' | 'invitation';

const EMAIL_LABELS: Record<EmailType, string> = {
  verification: 'Verification',
  'password-reset': 'Password Reset',
  invitation: 'Invitation',
};

function getEmail(type: EmailType) {
  switch (type) {
    case 'verification':
      return {
        subject: `Verify your email for ${CAMP.name}`,
        senderName: `${CAMP.name} via campminder`,
        body: (
          <>
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
                Thanks for creating your account with <strong>{CAMP.name}</strong> on
                campminder. Please verify your email address by clicking the button
                below.
              </p>
              <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
                Verify Email Address
              </a>
              <p className="cm-email__muted">
                This link will expire in 7 days. If you didn&rsquo;t create this account,
                you can safely ignore this email.
              </p>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__footer-brand">Powered by campminder</span>
              <span className="cm-email__footer-links">
                Help Center &middot; Privacy Policy &middot; Unsubscribe
              </span>
            </div>
          </>
        ),
      };
    case 'password-reset':
      return {
        subject: `Reset your password — ${CAMP.name}`,
        senderName: `${CAMP.name} via campminder`,
        body: (
          <>
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
                We received a request to reset your password for your{' '}
                <strong>{CAMP.name}</strong> campminder account. Click the button
                below to choose a new password.
              </p>
              <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
                Reset Password
              </a>
              <p className="cm-email__muted">
                This link will expire in 1 hour. If you didn&rsquo;t request this, no
                changes will be made to your account.
              </p>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__footer-brand">Powered by campminder</span>
              <span className="cm-email__footer-links">
                Help Center &middot; Privacy Policy &middot; Unsubscribe
              </span>
            </div>
          </>
        ),
      };
    case 'invitation':
      return {
        subject: `You're invited to ${CAMP.name} on campminder`,
        senderName: `${CAMP.name} via campminder`,
        body: (
          <>
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
                <strong>{CAMP.name}</strong> has invited you to join campminder,
                the platform your camp uses for enrollment, communication, and more.
              </p>
              <p>
                Getting started only takes a minute — create your account and you&rsquo;ll
                be connected to your camp right away.
              </p>
              <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
                Accept Invitation
              </a>
              <p className="cm-email__muted">
                Questions? Contact {CAMP.name} directly at{' '}
                <a href="#">info@camptallpines.com</a>
              </p>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__footer-brand">Powered by campminder</span>
              <span className="cm-email__footer-links">
                Help Center &middot; Privacy Policy &middot; Unsubscribe
              </span>
            </div>
          </>
        ),
      };
  }
}

export const EmailPreviewFlow: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<EmailType>('verification');

  const email = getEmail(selected);

  return (
    <div className="cm-email-fullscreen">
      <div className="cm-email-fullscreen__tabs">
        {(Object.keys(EMAIL_LABELS) as EmailType[]).map((type) => (
          <button
            key={type}
            className={`cm-email-tab ${selected === type ? 'cm-email-tab--active' : ''}`}
            onClick={() => setSelected(type)}
          >
            {EMAIL_LABELS[type]}
          </button>
        ))}
        <button className="cm-auth-link cm-email-fullscreen__back" onClick={() => navigate('/auth')}>
          &larr; Back to all flows
        </button>
      </div>
      <GmailInbox
        key={selected}
        senderName={email.senderName}
        senderEmail="noreply@campminder.com"
        subject={email.subject}
        accentColor={CAMP.accentColor}
      >
        {email.body}
      </GmailInbox>
    </div>
  );
};
