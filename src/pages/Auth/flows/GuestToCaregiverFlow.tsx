import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP_TALL_PINES, CAMP_SUNSHINE, CAMPMINDER_DEFAULT } from '../campBrand';
import './ExistingAccountNewCampFlow.css';
import './GuestEdgeCases.css';

type Step = 'account-found' | 'additional-info' | 'success';

export const GuestToCaregiverFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP_SUNSHINE;
  const [step, setStep] = useState<Step>('account-found');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isEmergencyContact, setIsEmergencyContact] = useState(false);

  return (
    <AuthLayout
      camp={brand}
      onBack={
        step === 'account-found'
          ? () => navigate('/auth')
          : step === 'additional-info'
            ? () => setStep('account-found')
            : undefined
      }
    >
      {step === 'account-found' && (
        <>
          <h1 className="cm-auth-title">Welcome back, Ruth!</h1>
          <div className="cm-auth-found">
            <div className="cm-auth-upgrade-banner">
              <TrendingUpIcon className="cm-auth-upgrade-banner__icon" fontSize="small" />
              <span>
                You're being upgraded from <strong>guest</strong> to{' '}
                <strong>caregiver</strong> at {CAMP_SUNSHINE.name}. Caregivers
                have full access to manage camper registrations, forms, and
                payments.
              </span>
            </div>

            <div className="cm-auth-found__camps">
              <div className="cm-auth-found__camp cm-auth-found__camp--existing">
                <div
                  className="cm-auth-found__camp-initials"
                  style={{ backgroundColor: CAMP_TALL_PINES.accentColor }}
                >
                  {CAMP_TALL_PINES.initials}
                </div>
                <span className="cm-auth-found__camp-name">{CAMP_TALL_PINES.name}</span>
                <span className="cm-auth-found__camp-role cm-auth-found__camp-role--guest">
                  Guest
                </span>
                <span className="cm-auth-found__camp-badge">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Linked
                </span>
              </div>
              <span className="cm-auth-found__connector">+</span>
              <div className="cm-auth-found__camp cm-auth-found__camp--new">
                <div
                  className="cm-auth-found__camp-initials"
                  style={{ backgroundColor: CAMP_SUNSHINE.accentColor }}
                >
                  {CAMP_SUNSHINE.initials}
                </div>
                <span className="cm-auth-found__camp-name">{CAMP_SUNSHINE.name}</span>
                <span className="cm-auth-found__camp-role cm-auth-found__camp-role--caregiver">
                  Caregiver
                </span>
                <span className="cm-auth-found__camp-badge cm-auth-found__camp-badge--adding">
                  <AddCircleOutlineIcon sx={{ fontSize: 14 }} /> Adding
                </span>
              </div>
            </div>
          </div>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('additional-info')}
            >
              Continue Registration
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Role upgrade.</strong> A guest at one camp can become a
              caregiver at another. The system recognizes the existing account
              and collects only the additional info needed for the caregiver role.
            </span>
          </div>
        </>
      )}

      {step === 'additional-info' && (
        <>
          <h1 className="cm-auth-title">A few more details</h1>
          <p className="cm-auth-subtitle">
            Caregivers need a bit more info than guest accounts.
            This helps {CAMP_SUNSHINE.name} keep campers safe.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Phone number *"
              placeholder="(555) 123-4567"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextInput
              label="Relationship to camper *"
              placeholder="e.g. Mother, Father, Guardian"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-neutral-800)',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={isEmergencyContact}
                onChange={(e) => setIsEmergencyContact(e.target.checked)}
              />
              I am an emergency contact for this camper
            </label>
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              disabled={!phone.trim() || !relationship.trim()}
              onClick={() => setStep('success')}
            >
              Complete Registration
            </button>
          </div>
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Why more info?</strong> Caregiver accounts have full access
              to registration, payments, and medical forms. Camp requires a phone
              number and relationship for safety and communication purposes.
            </span>
          </div>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleIcon sx={{ fontSize: 36 }} />
          </div>
          <h1 className="cm-auth-title">You're all set!</h1>
          <p className="cm-auth-subtitle">
            Your account has been upgraded. Here's a summary of your roles:
          </p>
          <div className="cm-auth-role-summary">
            <div className="cm-auth-role-summary__item">
              <div className="cm-auth-role-summary__camp">
                <div
                  className="cm-auth-role-summary__camp-initials"
                  style={{ backgroundColor: CAMP_TALL_PINES.accentColor }}
                >
                  {CAMP_TALL_PINES.initials}
                </div>
                <span className="cm-auth-role-summary__camp-name">{CAMP_TALL_PINES.name}</span>
              </div>
              <span className="cm-auth-found__camp-role cm-auth-found__camp-role--guest">
                Guest
              </span>
            </div>
            <div className="cm-auth-role-summary__item">
              <div className="cm-auth-role-summary__camp">
                <div
                  className="cm-auth-role-summary__camp-initials"
                  style={{ backgroundColor: CAMP_SUNSHINE.accentColor }}
                >
                  {CAMP_SUNSHINE.initials}
                </div>
                <span className="cm-auth-role-summary__camp-name">{CAMP_SUNSHINE.name}</span>
              </div>
              <span className="cm-auth-found__camp-role cm-auth-found__camp-role--caregiver">
                Caregiver
              </span>
            </div>
          </div>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => navigate('/auth')}
            >
              Go to {CAMP_SUNSHINE.name}
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
