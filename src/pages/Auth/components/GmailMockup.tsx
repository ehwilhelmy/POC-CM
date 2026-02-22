import React from 'react';
import './GmailMockup.css';

interface GmailMockupProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  accentColor: string;
  children: React.ReactNode;
}

export const GmailMockup: React.FC<GmailMockupProps> = ({
  senderName,
  senderEmail,
  subject,
  accentColor,
  children,
}) => {
  const initials = senderName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="cm-gmail">
      <div className="cm-gmail__toolbar">
        <span className="cm-gmail__toolbar-back">&larr;</span>
        <span className="cm-gmail__toolbar-label">Inbox</span>
      </div>
      <div className="cm-gmail__subject">{subject}</div>
      <div className="cm-gmail__header">
        <div className="cm-gmail__avatar" style={{ background: accentColor }}>
          {initials}
        </div>
        <div className="cm-gmail__sender-info">
          <div className="cm-gmail__sender-row">
            <span className="cm-gmail__sender-name">{senderName}</span>
            <span className="cm-gmail__sender-time">just now</span>
          </div>
          <span className="cm-gmail__sender-email">
            {senderEmail}
          </span>
        </div>
      </div>
      <div className="cm-gmail__body">
        {children}
      </div>
    </div>
  );
};
