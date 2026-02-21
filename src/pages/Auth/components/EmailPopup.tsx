import React, { useState, useEffect, useCallback } from 'react';
import { GmailInbox } from './GmailInbox';
import './EmailPopup.css';

interface EmailPopupProps {
  open: boolean;
  onClose: () => void;
  senderName: string;
  senderEmail: string;
  subject: string;
  accentColor: string;
  verificationCode: string;
  onCodeCopied?: (code: string) => void;
  children: React.ReactNode;
}

export const EmailPopup: React.FC<EmailPopupProps> = ({
  open,
  onClose,
  senderName,
  senderEmail,
  subject,
  accentColor,
  verificationCode,
  onCodeCopied,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Open: mount the DOM, then trigger slide-up on next frame
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    } else if (visible) {
      // Close: slide down, then unmount after animation
      setAnimateIn(false);
      const timer = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, handleClose]);

  if (!visible) return null;

  return (
    <>
      <div
        className={`cm-email-popup-backdrop${animateIn ? ' cm-email-popup-backdrop--visible' : ''}`}
        onClick={handleClose}
      />
      <div className={`cm-email-popup${animateIn ? ' cm-email-popup--open' : ''}`}>
        <button
          type="button"
          className="cm-email-popup__close"
          onClick={handleClose}
          aria-label="Close email"
        >
          &times;
        </button>
        <GmailInbox
          senderName={senderName}
          senderEmail={senderEmail}
          subject={subject}
          accentColor={accentColor}
          verificationCode={verificationCode}
          onCodeCopied={onCodeCopied}
          compact
        >
          {children}
        </GmailInbox>
      </div>
    </>
  );
};
