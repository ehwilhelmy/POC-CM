import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP_TALL_PINES, CAMP_SUNSHINE } from '../campBrand';

type Step =
  | 'email-entry'
  | 'which-camp'
  | 'password'
  | 'wrong-camp'
  | 'camp-picker'
  | 'success';

const CAMPS = [CAMP_TALL_PINES, CAMP_SUNSHINE];

export const MultiCampFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email-entry');
  const [selectedCamp, setSelectedCamp] = useState(CAMPS[0]);

  return (
    <AuthLayout
      camp={step === 'password' || step === 'wrong-camp' || step === 'success' ? selectedCamp : undefined}
      onBack={
        step === 'which-camp'
          ? () => setStep('email-entry')
          : step === 'password'
            ? () => setStep('which-camp')
            : step === 'wrong-camp'
              ? () => setStep('password')
              : step === 'camp-picker'
                ? () => setStep('wrong-camp')
                : undefined
      }
    >
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to campminder with your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              value="jane.smith@email.com"
              type="email"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('which-camp')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => setStep('which-camp')}>
              Sign up
            </button>
          </p>
        </>
      )}

      {step === 'which-camp' && (
        <>
          <h1 className="cm-auth-title">Which camp?</h1>
          <p className="cm-auth-subtitle">
            We found your account linked to multiple camps. Which one are you
            logging into today?
          </p>
          <div className="cm-auth-form">
            {CAMPS.map((camp) => (
              <button
                key={camp.name}
                className="cm-auth-camp-card"
                style={{ borderColor: camp.accentColor }}
                onClick={() => {
                  setSelectedCamp(camp);
                  setStep('password');
                }}
              >
                <div
                  className="cm-auth-camp-card__logo"
                  style={{ backgroundColor: camp.accentColor }}
                >
                  {camp.initials}
                </div>
                <span className="cm-auth-camp-card__name">{camp.name}</span>
              </button>
            ))}
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Proposed:</strong> One account, multiple camp associations.
              The parent picks which camp context to enter after signing in.
            </span>
          </div>
        </>
      )}

      {step === 'password' && (
        <>
          <h1 className="cm-auth-title">Sign in to {selectedCamp.name}</h1>
          <div className="cm-auth-form">
            <TextInput
              label="Email"
              value="jane.smith@email.com"
              disabled
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('wrong-camp')}
            >
              Sign In
            </button>
          </div>
        </>
      )}

      {step === 'wrong-camp' && (
        <>
          <h1 className="cm-auth-title">You're signed in</h1>
          <p className="cm-auth-subtitle">
            But wait — the parent realizes they picked the wrong camp. They
            wanted {CAMPS.find(c => c.name !== selectedCamp.name)?.name}.
          </p>

          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>Current problem:</strong> In the existing system, switching
              camps means signing out and starting the entire flow over.
              Some parents have two separate accounts with different passwords.
            </span>
          </div>

          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('camp-picker')}
            >
              Switch Camp (proposed)
            </button>
          </div>
        </>
      )}

      {step === 'camp-picker' && (
        <>
          <h1 className="cm-auth-title">Switch camp</h1>
          <p className="cm-auth-subtitle">
            With a unified account, the parent can switch camps without signing out.
          </p>
          <div className="cm-auth-form">
            {CAMPS.map((camp) => (
              <button
                key={camp.name}
                className="cm-auth-camp-card"
                style={{
                  borderColor: camp.accentColor,
                  background: camp.name === selectedCamp.name ? '#f0f0f0' : undefined,
                }}
                onClick={() => {
                  setSelectedCamp(camp);
                  setStep('success');
                }}
              >
                <div
                  className="cm-auth-camp-card__logo"
                  style={{ backgroundColor: camp.accentColor }}
                >
                  {camp.initials}
                </div>
                <div>
                  <span className="cm-auth-camp-card__name">{camp.name}</span>
                  {camp.name === selectedCamp.name && (
                    <span style={{ display: 'block', fontSize: 12, color: '#808080' }}>
                      Currently viewing
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>One sign-in, multiple camps.</strong> No separate accounts.
              No re-entering passwords. Just pick a camp context.
            </span>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Switched to {selectedCamp.name}</h1>
          <p className="cm-auth-subtitle">
            Same account, different camp context. No re-authentication needed.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--secondary"
            onClick={() => { setStep('email-entry'); setSelectedCamp(CAMPS[0]); }}
          >
            Restart Flow
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
