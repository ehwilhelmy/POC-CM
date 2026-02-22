import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AuthLayout } from '../components/AuthLayout';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { TextInput } from '../../../components/TextInput';

import { CAMP } from '../campBrand';

type Step = 'email' | 'existing-user' | 'new-user' | 'success' | 'dashboard';

export const UnifiedEntryFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [simulateNew, setSimulateNew] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { allValid } = usePasswordValidation(password, confirmPassword);

  const handleEmailContinue = () => {
    setStep(simulateNew ? 'new-user' : 'existing-user');
  };

  const handleBack = () => {
    if (step === 'existing-user' || step === 'new-user') setStep('email');
  };

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
      onBack={step !== 'email' && step !== 'success' ? handleBack : undefined}
    >
      {step === 'email' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} with your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              placeholder="parent@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!email.trim()}
              onClick={handleEmailContinue}
            >
              Continue
            </button>
          </div>

          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={handleEmailContinue}>
              Sign up
            </button>
          </p>

          {/* Testing toggle for prototype */}
          <label className="cm-auth-test-toggle">
            <input
              type="checkbox"
              checked={simulateNew}
              onChange={(e) => setSimulateNew(e.target.checked)}
            />
            Simulate: new user (no account found)
          </label>
        </>
      )}

      {step === 'existing-user' && (
        <>
          <h1 className="cm-auth-title">Welcome back</h1>
          <p className="cm-auth-subtitle">
            We found your account. Enter your password to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email"
              value={email || 'parent@example.com'}
              disabled
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!loginPassword.trim()}
              onClick={() => setStep('success')}
            >
              Sign In
            </button>
            <button
              className="cm-auth-link"
              onClick={() => navigate('/auth/password-reset')}
            >
              Forgot password?
            </button>
          </div>
        </>
      )}

      {step === 'new-user' && (
        <>
          <h1 className="cm-auth-title">Create your account</h1>
          <p className="cm-auth-subtitle">
            No account was found for this email. Let's get you set up.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email"
              value={email || 'newparent@example.com'}
              disabled
            />
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput
              label="Password"
              placeholder="Create a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              label="Confirm password"
              placeholder="Re-enter your password"
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
              Create Account
            </button>
          </div>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              We'll send a verification email later. You can start using
              campminder right away.
            </span>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">You're all set!</h1>
          <p className="cm-auth-subtitle">
            {simulateNew
              ? 'Your account has been created. Welcome to Camp Tall Pines.'
              : 'Welcome back to Camp Tall Pines.'}
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
