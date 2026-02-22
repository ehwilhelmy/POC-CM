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

type Step = 'form' | 'welcome' | 'dashboard';

export const SignupFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('form');
  const [signupEmail, setSignupEmail] = useState('');
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
      onBack={step === 'form' ? () => navigate('/auth') : undefined}
    >
      {step === 'form' && (
        <>
          <h1 className="cm-auth-title">Create your account</h1>
          <p className="cm-auth-subtitle">
            Join Camp Tall Pines on campminder. It only takes a minute.
          </p>
          <div className="cm-auth-form">
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput
              label="Email address"
              placeholder="parent@example.com"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
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
              disabled={!allValid || !signupEmail.trim()}
              onClick={() => setStep('welcome')}
            >
              Create Account
            </button>
            <div className="cm-auth-divider">or</div>
            <button
              className="cm-auth-btn cm-auth-btn--secondary"
              onClick={() => setStep('welcome')}
            >
              Sign up with Google
            </button>
          </div>
          <p style={{ fontSize: 12, color: '#808080', textAlign: 'center', margin: 0 }}>
            Already have an account?{' '}
            <button className="cm-auth-link" onClick={() => navigate('/auth/camp-login')}>
              Sign in
            </button>
          </p>
        </>
      )}

      {step === 'welcome' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome, Jane!</h1>
          <p className="cm-auth-subtitle">
            Your account is ready. You can start using campminder right away.
          </p>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              We sent a verification link to <strong>parent@example.com</strong>.
              You can verify your email anytime — there's no rush.
            </span>
          </div>

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
