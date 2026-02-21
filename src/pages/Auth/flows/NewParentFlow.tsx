import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampWebsite } from '../components/CampWebsite';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'camp-website'
  | 'email-entry'
  | 'create-account'
  | 'details'
  | 'welcome';

export const NewParentFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('camp-website');

  if (step === 'camp-website') {
    return <CampWebsite onPortalClick={() => setStep('email-entry')} />;
  }

  const stepMap: Record<string, number> = {
    'email-entry': 0,
    'create-account': 1,
    details: 2,
    welcome: 3,
  };

  return (
    <AuthLayout
      camp={CAMP}
      step={{ current: stepMap[step], total: 4 }}
      onBack={
        step === 'email-entry'
          ? () => setStep('camp-website')
          : step === 'create-account'
            ? () => setStep('email-entry')
            : step === 'details'
              ? () => setStep('create-account')
              : undefined
      }
    >
      {step === 'email-entry' && (
        <>
          <h1 className="cm-auth-title">Welcome to {CAMP.name}</h1>
          <p className="cm-auth-subtitle">
            Enter your email to sign in or set up your account.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address"
              placeholder="yourname@email.com"
              type="email"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('create-account')}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === 'create-account' && (
        <>
          <h1 className="cm-auth-title">Finish setting up your account</h1>
          <p className="cm-auth-subtitle">
            We found your enrollment at {CAMP.name}. Create a password to access
            your parent portal.
          </p>
          <div className="cm-auth-form">
            <div style={{ display: 'flex', gap: 12 }}>
              <TextInput label="First name" placeholder="Jane" />
              <TextInput label="Last name" placeholder="Smith" />
            </div>
            <TextInput label="Email" value="parent@example.com" disabled />
            <TextInput
              label="Create a password"
              placeholder="At least 8 characters"
              type="password"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('details')}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === 'details' && (
        <>
          <h1 className="cm-auth-title">A few more details</h1>
          <p className="cm-auth-subtitle">
            This helps {CAMP.name} stay in touch with you about your camper.
          </p>
          <div className="cm-auth-form">
            <TextInput label="Phone number" placeholder="(555) 123-4567" type="tel" />
            <TextInput label="Relationship to camper" placeholder="Parent / Guardian" />
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
              <span>
                We'll send a verification email later — you can start using your
                portal right away.
              </span>
            </div>
            <button
              className="cm-auth-btn cm-auth-btn--primary"

              onClick={() => setStep('welcome')}
            >
              Complete Setup
            </button>
          </div>
        </>
      )}

      {step === 'welcome' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome to {CAMP.name}!</h1>
          <p className="cm-auth-subtitle">
            Your account is ready. You can manage enrollment, view forms, and
            stay connected with camp.
          </p>
          <button
            className="cm-auth-btn cm-auth-btn--primary"
          >
            Go to My Dashboard
          </button>
          <button className="cm-auth-link" onClick={() => setStep('camp-website')}>
            Restart flow
          </button>
          <button className="cm-auth-link" onClick={() => navigate('/auth')}>
            &larr; Back to all flows
          </button>
        </div>
      )}
    </AuthLayout>
  );
};
