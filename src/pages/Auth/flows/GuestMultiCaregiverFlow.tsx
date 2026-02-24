import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AuthLayout } from '../components/AuthLayout';
import { CAMP_TALL_PINES, CAMPMINDER_DEFAULT } from '../campBrand';
import './ExistingAccountNewCampFlow.css';
import './GuestEdgeCases.css';

type Step = 'invite-detected' | 'access-updated';

export const GuestMultiCaregiverFlow: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand') === 'default' ? CAMPMINDER_DEFAULT : CAMP_TALL_PINES;
  const [step, setStep] = useState<Step>('invite-detected');

  return (
    <AuthLayout
      camp={brand}
      onBack={step === 'invite-detected' ? () => navigate('/auth') : () => setStep('invite-detected')}
    >
      {step === 'invite-detected' && (
        <>
          <h1 className="cm-auth-title">You already have access!</h1>
          <div className="cm-auth-found">
            <p className="cm-auth-found__explanation">
              We found your existing guest account at <strong>{CAMP_TALL_PINES.name}</strong>.
              Your access has been updated with a new camper invitation.
            </p>

            <div className="cm-auth-found__camps">
              <div className="cm-auth-found__camp cm-auth-found__camp--new">
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
              </div>
            </div>

            <div className="cm-auth-camper-list">
              <div className="cm-auth-camper-list__item">
                <div className="cm-auth-camper-list__info">
                  <span className="cm-auth-camper-list__name">Tommy Smith</span>
                  <span className="cm-auth-camper-list__detail">via Jane Smith</span>
                </div>
              </div>
              <div className="cm-auth-camper-list__item">
                <div className="cm-auth-camper-list__info">
                  <span className="cm-auth-camper-list__name">Billy Smith</span>
                  <span className="cm-auth-camper-list__detail">via Mike Smith</span>
                </div>
                <span className="cm-auth-camper-list__badge--new">New</span>
              </div>
            </div>
          </div>

          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('access-updated')}
            >
              Continue to Dashboard
            </button>
          </div>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>No duplicate accounts.</strong> When a second caregiver at the
              same camp invites the same guest, the system merges the access
              automatically. One guest account, multiple camper connections.
            </span>
          </div>
        </>
      )}

      {step === 'access-updated' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleIcon sx={{ fontSize: 36 }} />
          </div>
          <h1 className="cm-auth-title">Access updated!</h1>
          <p className="cm-auth-subtitle">
            Your guest account at {CAMP_TALL_PINES.name} now includes access
            to Billy Smith's profile, invited by Mike Smith.
          </p>
          <div className="cm-auth-form">
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => navigate('/auth')}
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
