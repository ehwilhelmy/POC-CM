import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import { CAMP } from '../campBrand';

type Step =
  | 'invite-email'
  | 'click-link'
  | 'create-account'
  | 'confusion'
  | 'success';

export const GuestAccountFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('invite-email');

  return (
    <AuthLayout
      camp={CAMP}
      onBack={
        step === 'click-link'
          ? () => setStep('invite-email')
          : step === 'create-account'
            ? () => setStep('click-link')
            : step === 'confusion'
              ? () => setStep('create-account')
              : undefined
      }
    >
      {step === 'invite-email' && (
        <>
          <h1 className="cm-auth-title">Guest Invite Email</h1>
          <p className="cm-auth-subtitle">
            Grandma received this email from the primary caregiver. She needs to
            create an account to see photos and updates.
          </p>

          {/* Email mockup */}
          <div style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', background: '#f3f3f3', borderBottom: '1px solid #ddd' }}>
              <div style={{ fontSize: 12, color: '#808080' }}>From: noreply@campminder.com</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#282828' }}>
                You've been invited to view a camper's profile
              </div>
            </div>
            <div style={{ padding: 16, fontSize: 14, lineHeight: 1.6, color: '#505050' }}>
              <p style={{ margin: '0 0 12px' }}>Hi there,</p>
              <p style={{ margin: '0 0 12px' }}>
                Jane Smith has invited you to view <strong>Tommy Smith's</strong> profile
                on CampMinder for <strong>Camp Tall Pines</strong>.
              </p>
              <button
                onClick={() => setStep('click-link')}
                style={{
                  display: 'block',
                  margin: '16px auto',
                  padding: '10px 24px',
                  background: CAMP.accentColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family-body)',
                }}
              >
                Accept Invitation
              </button>
            </div>
          </div>

          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>Note:</strong> The email comes from "noreply@campminder.com" with no
              camp branding. Grandma may not trust it or understand what CampMinder is.
            </span>
          </div>
        </>
      )}

      {step === 'click-link' && (
        <>
          <h1 className="cm-auth-title">Welcome</h1>
          <p className="cm-auth-subtitle">
            Log in to {CAMP.name} with your email to continue.
          </p>
          <div className="cm-auth-form">
            <TextInput
              label="Email address *"
              placeholder="grandma@email.com"
              type="email"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('create-account')}
            >
              Continue
            </button>
          </div>
          <p className="cm-auth-signup-prompt">
            Don&rsquo;t have an account?{' '}
            <button className="cm-auth-link" onClick={() => setStep('create-account')}>
              Sign up
            </button>
          </p>
          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              Grandma just wants to see photos. She doesn't understand why she needs to
              "Log in to {CAMP.name}." Different mental model from primary caregivers.
            </span>
          </div>
        </>
      )}

      {step === 'create-account' && (
        <>
          <h1 className="cm-auth-title">Almost there</h1>
          <p className="cm-auth-subtitle">
            Fill in your details to complete your account.
          </p>
          <div className="cm-auth-form">
            <TextInput label="First name" placeholder="Margaret" />
            <TextInput label="Last name" placeholder="Smith" />
            <TextInput
              label="Password"
              placeholder="Create a password"
              type="password"
              helperText="At least 8 characters"
            />
            <TextInput
              label="Relationship to camper"
              placeholder="Grandmother"
            />
            <button
              className="cm-auth-btn cm-auth-btn--primary"
              onClick={() => setStep('confusion')}
            >
              Create Account
            </button>
          </div>
        </>
      )}

      {step === 'confusion' && (
        <>
          <h1 className="cm-auth-title">Verify your email</h1>
          <p className="cm-auth-subtitle">
            We sent a verification email to <strong>grandma@email.com</strong>.
            Please check your inbox and click the link to continue.
          </p>

          <div className="cm-auth-warning-banner">
            <WarningAmberIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>Blocking verification screen.</strong> Grandma is stuck. She created
              an account but can't proceed until she verifies her email. She may not
              find the email, or it went to spam. She calls camp (or her daughter).
            </span>
          </div>

          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              <strong>Proposed fix:</strong> Deferred verification. Let grandma
              access the profile immediately. Send verification email in the background.
              She can verify later.
            </span>
          </div>

          <button
            className="cm-auth-btn cm-auth-btn--primary"
            onClick={() => setStep('success')}
          >
            Continue (proposed flow)
          </button>
        </>
      )}

      {step === 'success' && (
        <div className="cm-auth-success">
          <div className="cm-auth-success__icon">
            <CheckCircleOutlineIcon style={{ fontSize: 32 }} />
          </div>
          <h1 className="cm-auth-title">Welcome, Margaret!</h1>
          <p className="cm-auth-subtitle">
            You can now view Tommy's photos and updates at {CAMP.name}.
          </p>
          <div className="cm-auth-info-banner" style={{ textAlign: 'left' }}>
            <InfoOutlinedIcon className="cm-auth-info-banner__icon" fontSize="small" />
            <span>
              Verify your email anytime — there's no rush. You have full access now.
            </span>
          </div>
          <button
            className="cm-auth-btn cm-auth-btn--secondary"
            onClick={() => setStep('invite-email')}
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
