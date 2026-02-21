import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { CAMP } from '../campBrand';

type Step = 'form' | 'welcome';

export const SignupFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('form');

  return (
    <AuthLayout
      camp={CAMP}
      onBack={step === 'form' ? () => navigate('/auth') : undefined}
    >
      {step === 'form' && (
        <>
          <h1 className="cm-auth-title">Create your account</h1>
          <p className="cm-auth-subtitle">
            Join Camp Tall Pines on CampMinder. It only takes a minute.
          </p>
          <div className="cm-auth-form">
            <div style={{ display: 'flex', gap: 12 }}>
              <TextInput label="First name" placeholder="Jane" />
              <TextInput label="Last name" placeholder="Smith" />
            </div>
            <TextInput
              label="Email address"
              placeholder="parent@example.com"
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Create a password"
              type="password"
              helperText="At least 8 characters with a number and symbol"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
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
            Your account is ready. You can start using CampMinder right away.
          </p>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              We sent a verification link to <strong>parent@example.com</strong>.
              You can verify your email anytime — there's no rush.
            </span>
          </div>

          <Button variant="secondary" onClick={() => setStep('form')}>
            Restart Flow
          </Button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
