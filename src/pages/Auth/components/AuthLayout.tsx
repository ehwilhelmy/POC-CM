import React from 'react';
import clsx from 'clsx';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './AuthLayout.css';

export interface CampBranding {
  name: string;
  accentColor: string;
  initials: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  camp?: CampBranding;
  onBack?: () => void;
  step?: { current: number; total: number };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  camp,
  onBack,
  step,
}) => {
  return (
    <div className="cm-auth">
      <div className="cm-auth__card">
        {camp && (
          <div
            className="cm-auth__camp-header"
            style={{ backgroundColor: camp.accentColor }}
          >
            <div className="cm-auth__camp-logo">{camp.initials}</div>
            <span className="cm-auth__camp-name">{camp.name}</span>
          </div>
        )}

        <div className="cm-auth__body">
          {onBack && (
            <button className="cm-auth__back" onClick={onBack}>
              &larr; Back
            </button>
          )}

          {step && (
            <div className="cm-auth__steps">
              {Array.from({ length: step.total }, (_, i) => (
                <div
                  key={i}
                  className={clsx('cm-auth__step-dot', {
                    'cm-auth__step-dot--active': i === step.current,
                    'cm-auth__step-dot--completed': i < step.current,
                  })}
                />
              ))}
            </div>
          )}

          {children}
        </div>

        <div className="cm-auth__footer">
          <div className="cm-auth__wordmark">
            <LockOutlinedIcon className="cm-auth__wordmark-lock" sx={{ fontSize: 12 }} />
            Powered by CampMinder
          </div>
        </div>
      </div>
    </div>
  );
};
