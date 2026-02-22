import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { AuthLayout } from '../components/AuthLayout';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { TextInput } from '../../../components/TextInput';

const CAMP = { name: 'Camp Tall Pines', accentColor: '#2d6a4f', initials: 'TP' };

type Step = 'request' | 'check-email' | 'new-password' | 'success' | 'dashboard';

export const PasswordResetFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('request');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);

  if (step === 'dashboard') {
    return (
      <CampInTouchDashboard
        firstName="Jane"
        onHome={() => navigate('/auth')}
      />
    );
  }

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'request'
          ? () => navigate('/auth')
          : step === 'check-email'
            ? () => setStep('request')
            : undefined
      }
    >
      {step === 'request' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              placeholder="parent@example.com"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!resetEmail.trim()}
              onClick={() => setStep('check-email')}
            >
              Send Reset Link
            </button>
          </div>
          <button
            className="cm-auth-link"
            onClick={() => navigate('/auth/camp-login')}
          >
            Back to sign in
          </button>
        </>
      )}

      {step === 'check-email' && (
        <div className="cm-auth-success">
          <div
            className="cm-auth-success__icon"
            style={{ background: 'var(--color-blue-100)', color: 'var(--color-information)' }}
          >
            <MailOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Check your email</h1>
          <p className="cm-auth-subtitle">
            We sent a password reset link to <strong>parent@example.com</strong>.
            It may take a minute to arrive.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('new-password')}
          >
            I Got the Email (continue demo)
          </button>
          <button className="cm-auth-link" onClick={() => setStep('request')}>
            Didn't get it? Try again
          </button>
          <button
            className="cm-auth-link"
            onClick={() => navigate('/auth/camp-login')}
          >
            Back to sign in
          </button>
        </div>
      )}

      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <p className="cm-auth-subtitle">
            Choose a new password for your account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="New password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              label="Confirm password"
              placeholder="Re-enter new password"
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
              Reset Password
            </button>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Password updated</h1>
          <p className="cm-auth-subtitle">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('dashboard')}
          >
            Go to My Dashboard
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
