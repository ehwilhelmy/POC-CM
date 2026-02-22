import React, { useState } from 'react';
import clsx from 'clsx';
import './GmailInbox.css';

interface GmailInboxProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  accentColor: string;
  verificationCode?: string;
  onCodeCopied?: (code: string) => void;
  compact?: boolean;
  children: React.ReactNode;
}

const FAKE_EMAILS = [
  {
    sender: 'Amazon',
    avatar: '#ff9900',
    initials: 'A',
    subject: 'Your order has shipped',
    snippet: '— Your package with order #112-3948 is on its way. Track your delivery status...',
    time: '11:30 AM',
  },
  {
    sender: 'LinkedIn',
    avatar: '#0a66c2',
    initials: 'in',
    subject: '3 new connection requests',
    snippet: '— John Park and 2 others want to connect with you...',
    time: '10:15 AM',
  },
  {
    sender: 'Google',
    avatar: '#4285f4',
    initials: 'G',
    subject: 'Security alert for your account',
    snippet: '— We noticed a new sign-in to your Google Account on a Windows device...',
    time: 'Yesterday',
  },
  {
    sender: 'Netflix',
    avatar: '#e50914',
    initials: 'N',
    subject: 'New arrivals this week',
    snippet: '— Check out the latest movies and shows just added to Netflix this week...',
    time: 'Yesterday',
  },
];

/** Clickable verification code with copy-to-clipboard + "Copied!" flash */
export const ClickableCode: React.FC<{
  code: string;
  accentColor: string;
  onCopied?: (code: string) => void;
}> = ({ code, accentColor, onCopied }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback: ignore if clipboard not available
    }
    setCopied(true);
    onCopied?.(code);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className={clsx('cm-gmail-inbox__code', copied && 'cm-gmail-inbox__code--copied')}
      style={{ color: accentColor }}
      onClick={handleClick}
      title="Click to copy code"
    >
      {code}
      {copied && <span className="cm-gmail-inbox__code-flash">Copied!</span>}
    </button>
  );
};

export const GmailInbox: React.FC<GmailInboxProps> = ({
  senderName,
  senderEmail,
  subject,
  accentColor,
  verificationCode,
  onCodeCopied,
  compact,
  children,
}) => {
  const [view, setView] = useState<'list' | 'reader'>('list');

  const senderInitials = senderName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <div className={clsx('cm-gmail-inbox', compact && 'cm-gmail-inbox--compact')}>
      {/* Header */}
      <div className="cm-gmail-inbox__header">
        <div className="cm-gmail-inbox__header-left">
          <span className="cm-gmail-inbox__hamburger">&#9776;</span>
          <span className="cm-gmail-inbox__logo">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <path d="M1.5 17.5V0.5L12 9.5L22.5 0.5V17.5" stroke="#ea4335" strokeWidth="1.5" fill="none" />
              <rect x="0" y="0" width="24" height="18" rx="2" stroke="#dadce0" strokeWidth="1" fill="none" />
              <path d="M0.5 0.5L12 10.5L23.5 0.5" stroke="#ea4335" strokeWidth="1.5" fill="none" />
            </svg>
            Gmail
          </span>
        </div>
        <div className="cm-gmail-inbox__search">
          <span className="cm-gmail-inbox__search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </span>
          <span>Search mail</span>
        </div>
        <div className="cm-gmail-inbox__header-right">
          <div className="cm-gmail-inbox__user-avatar">JS</div>
        </div>
      </div>

      <div className="cm-gmail-inbox__main">
        {/* Sidebar */}
        <div className="cm-gmail-inbox__sidebar">
          <button className="cm-gmail-inbox__compose" type="button">
            <span className="cm-gmail-inbox__compose-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#001d35">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
              </svg>
            </span>
            <span className="cm-gmail-inbox__compose-label">Compose</span>
          </button>
          <ul className="cm-gmail-inbox__nav">
            <li className="cm-gmail-inbox__nav-item cm-gmail-inbox__nav-item--active">
              <span>Inbox</span>
              <span className="cm-gmail-inbox__nav-badge">1</span>
            </li>
            <li className="cm-gmail-inbox__nav-item">
              <span>Starred</span>
            </li>
            <li className="cm-gmail-inbox__nav-item">
              <span>Snoozed</span>
            </li>
            <li className="cm-gmail-inbox__nav-item">
              <span>Sent</span>
            </li>
            <li className="cm-gmail-inbox__nav-item">
              <span>Drafts</span>
            </li>
          </ul>
        </div>

        {/* Content: list or reader */}
        <div className="cm-gmail-inbox__content">
          {view === 'list' ? (
            <div className="cm-gmail-inbox__list">
              {/* The real CampMinder email — unread */}
              <div
                className="cm-gmail-inbox__row cm-gmail-inbox__row--unread"
                onClick={() => setView('reader')}
              >
                <div className="cm-gmail-inbox__row-check" />
                <span className="cm-gmail-inbox__row-star">&#9734;</span>
                <div
                  className="cm-gmail-inbox__row-avatar"
                  style={{ background: accentColor }}
                >
                  {senderInitials}
                </div>
                <span className="cm-gmail-inbox__row-sender">{senderName}</span>
                <div className="cm-gmail-inbox__row-text">
                  <span className="cm-gmail-inbox__row-subject">{subject}</span>
                </div>
                <span className="cm-gmail-inbox__row-time">just now</span>
              </div>

              {/* Fake background emails */}
              {FAKE_EMAILS.map((email, i) => (
                <div className="cm-gmail-inbox__row" key={i}>
                  <div className="cm-gmail-inbox__row-check" />
                  <span className="cm-gmail-inbox__row-star">&#9734;</span>
                  <div
                    className="cm-gmail-inbox__row-avatar"
                    style={{ background: email.avatar }}
                  >
                    {email.initials}
                  </div>
                  <span className="cm-gmail-inbox__row-sender">{email.sender}</span>
                  <div className="cm-gmail-inbox__row-text">
                    <span className="cm-gmail-inbox__row-subject">{email.subject}</span>
                    <span className="cm-gmail-inbox__row-snippet">{email.snippet}</span>
                  </div>
                  <span className="cm-gmail-inbox__row-time">{email.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="cm-gmail-inbox__reader">
              {/* Reader toolbar */}
              <div className="cm-gmail-inbox__reader-toolbar">
                <button
                  className="cm-gmail-inbox__reader-back"
                  onClick={() => setView('list')}
                  type="button"
                >
                  &larr;
                </button>
                <span className="cm-gmail-inbox__reader-badge">Inbox</span>
              </div>

              {/* Subject */}
              <div className="cm-gmail-inbox__reader-subject">{subject}</div>

              {/* Sender info */}
              <div className="cm-gmail-inbox__reader-header">
                <div
                  className="cm-gmail-inbox__reader-avatar"
                  style={{ background: accentColor }}
                >
                  {senderInitials}
                </div>
                <div className="cm-gmail-inbox__reader-sender">
                  <div className="cm-gmail-inbox__reader-sender-row">
                    <span className="cm-gmail-inbox__reader-sender-name">
                      {senderName}
                    </span>
                    <span className="cm-gmail-inbox__reader-sender-time">
                      just now
                    </span>
                  </div>
                  <span className="cm-gmail-inbox__reader-sender-email">
                    {senderEmail}
                  </span>
                </div>
              </div>

              {/* Email body */}
              <div className="cm-gmail-inbox__reader-body">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
