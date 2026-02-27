import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GmailInbox } from '../components/GmailInbox';
import { CAMP } from '../campBrand';
import './EmailPreviewFlow.css';

type EmailType = 'verification' | 'password-reset' | 'guest-invite' | 'camper-account';

const EMAIL_LABELS: Record<EmailType, string> = {
  verification: 'Verification',
  'password-reset': 'Password Reset',
  'guest-invite': 'Guest Invite',
  'camper-account': 'Camper Account',
};

function getEmail(type: EmailType) {
  switch (type) {
    case 'verification':
      return {
        subject: `Your verification code — ${CAMP.name}`,
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
                Your verification code for <strong>{CAMP.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <span className="cm-email__code" style={{ color: CAMP.accentColor }}>
                  523816
                </span>
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
          </>
        ),
      };
    case 'password-reset':
      return {
        subject: `Your password reset code — ${CAMP.name}`,
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
                Your password reset code for <strong>{CAMP.name}</strong> on
                campminder is:
              </p>
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <span className="cm-email__code" style={{ color: CAMP.accentColor }}>
                  847291
                </span>
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
          </>
        ),
      };
    case 'guest-invite':
      return {
        subject: `You've been invited to ${CAMP.name}`,
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
              <p className="cm-email__greeting">Hi Ruth,</p>
              <p>
                <strong>Jane Smith</strong> has invited you to be a guest on{' '}
                <strong>Tommy Smith&rsquo;s</strong> {CAMP.name} account.
              </p>
              <div className="cm-email__note">
                <strong className="cm-email__note-label">A note from Jane:</strong>
                Hi Grandma! This is Tommy&rsquo;s new camp, you can see videos, photos,
                and send him a personal message. ❤️
              </div>
              <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
                Create Guest Account
              </a>
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
          </>
        ),
      };
    case 'camper-account':
      return {
        subject: `Welcome to ${CAMP.name}`,
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
            <div className="cm-email__content cm-email__content--centered">
              <h2 className="cm-email__heading">Welcome to {CAMP.name}!</h2>
              <p>
                You now have an account for <strong>Tommy Smith</strong> in{' '}
                {CAMP.name}! Click below to log in to register for camp and more.
              </p>
              <a href="#" className="cm-email__cta" style={{ backgroundColor: CAMP.accentColor }}>
                Log In
              </a>
            </div>
            <div className="cm-email__footer">
              <span className="cm-email__muted">
                You&rsquo;re receiving this email because you have a {CAMP.name} account.
                If you don&rsquo;t recognize this, please contact {CAMP.name} directly.
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
