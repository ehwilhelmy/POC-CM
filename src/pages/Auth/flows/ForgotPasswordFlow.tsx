import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step = 'request' | 'check-email' | 'new-password' | 'success';

export const ForgotPasswordFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('request');

  const stepMap = { request: 0, 'check-email': 1, 'new-password': 2, success: 3 };

  return (
    <AuthLayout
      camp={CAMP}
      step={{ current: stepMap[step], total: 4 }}
      onBack={
        step === 'request'
          ? () => navigate('/auth/returning-parent')
          : step === 'check-email'
            ? () => setStep('request')
            : undefined
      }
    >
      {step === 'request' && (
        <>
          <h1 className="cm-auth-title">Reset your password</h1>
          <p className="cm-auth-subtitle">
            Enter the email address you use for your {CAMP.name} account.
            We'll send you a link to create a new password.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              placeholder="yourname@email.com"
              type="email"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('check-email')}
            >
              Send Reset Link
            </button>
          </div>
          <button
            className="cm-auth-link"
            onClick={() => navigate('/auth/returning-parent')}
          >
            &larr; Back to sign in
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
            We sent a reset link to <strong>parent@example.com</strong>.
            Click the link in the email to create a new password.
          </p>
          <p style={{ fontSize: 13, color: '#808080', margin: 0, lineHeight: 1.5 }}>
            Didn't get it? Check your spam folder, or{' '}
            <button className="cm-auth-link" onClick={() => setStep('request')}>
              try again with a different email
            </button>.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('new-password')}
          >
            I Got the Email (continue demo)
          </button>
          <button
            className="cm-auth-link"
            onClick={() => navigate('/auth/returning-parent')}
          >
            &larr; Back to sign in
          </button>
        </div>
      )}

      {step === 'new-password' && (
        <>
          <h1 className="cm-auth-title">Create new password</h1>
          <p className="cm-auth-subtitle">
            Choose a new password for your {CAMP.name} account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="New password"
              placeholder="At least 8 characters"
              type="password"
            />
            <TextInput
              label="Confirm new password"
              placeholder="Re-enter your new password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('success')}
            >
              Update Password
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
            Your password has been changed. You can now sign in to your {CAMP.name} account.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => navigate('/auth/returning-parent')}
          >
            Sign In
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
