import React, { useState } from 'react';
import clsx from 'clsx';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './AuthLayout.css';

export interface CampBranding {
  name: string;
  accentColor: string;
  initials: string;
  logoUrl?: string;
  backgroundUrl?: string;
  /** 'circle' (default) crops to a round avatar; 'wide' renders at natural aspect ratio */
  logoFit?: 'circle' | 'wide';
  tagline?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  camp?: CampBranding;
  onBack?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  camp,
  onBack,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div
      className={clsx('cm-auth', camp && 'cm-auth--branded', !showNotes && 'cm-auth--hide-notes')}
      style={camp ? {
        '--camp-accent': camp.accentColor,
        ...(camp.backgroundUrl ? { '--camp-bg': `url(${camp.backgroundUrl})` } : {}),
      } as React.CSSProperties : undefined}
    >
      {/* Camp branding above the card (Auth0 page template zone) */}
      {camp && (
        <div className="cm-auth__branding">
          {camp.logoUrl ? (
            <img
              src={camp.logoUrl}
              alt={camp.name}
              className={clsx('cm-auth__branding-logo', camp.logoFit === 'wide' && 'cm-auth__branding-logo--wide')}
            />
          ) : (
            <div className="cm-auth__branding-initials">{camp.initials}</div>
          )}
          {camp.logoFit !== 'wide' && (
            <span className="cm-auth__branding-name">{camp.name}</span>
          )}
          {camp.tagline && (
            <span className="cm-auth__branding-tagline">{camp.tagline}</span>
          )}
        </div>
      )}

      <div className="cm-auth__card">
        <div className="cm-auth__body">
          {children}

          {onBack && (
            <button className="cm-auth__back" onClick={onBack}>
              Go back
            </button>
          )}
        </div>
      </div>

      {/* Below-card zone (Auth0 page template) */}
      <p className="cm-auth__terms">
        By signing in, you agree to campminder&rsquo;s{' '}
        <button className="cm-auth__terms-link">Terms of Service</button> and{' '}
        <button className="cm-auth__terms-link">Privacy Policy</button>.
      </p>
      <div className="cm-auth__wordmark">
        <LockOutlinedIcon className="cm-auth__wordmark-lock" sx={{ fontSize: 12 }} />
        Powered by campminder
      </div>

      <button
        className="cm-auth__notes-fab"
        onClick={() => setShowNotes((v) => !v)}
        title={showNotes ? 'Hide design notes' : 'Show design notes'}
      >
        {showNotes
          ? <VisibilityOffIcon sx={{ fontSize: 16 }} />
          : <VisibilityIcon sx={{ fontSize: 16 }} />
        }
      </button>
    </div>
  );
};
