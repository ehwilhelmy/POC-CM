import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CampInTouchDashboard } from '../components/CampInTouchDashboard';
import campanionLogo from '@/assets/logo/campanion-logo-color-vert-md.svg';
import campHero from '@/assets/camp-hero.jpg';
import './CampanionFlow.css';

type Step = 'app-onboarding' | 'campanion-login' | 'password' | 'dashboard';

export const CampanionFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('app-onboarding');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [password, setPassword] = useState('');

  /* ── Step 4: CampInTouch dashboard ── */
  if (step === 'dashboard') {
    return (
      <CampInTouchDashboard
        firstName="Jane"
        onHome={() => navigate('/auth')}
      />
    );
  }

  return (
    <div className="cm-campanion">
      <div className="cm-campanion__phone">
        <div className="cm-campanion__status-bar">
          <span>9:41</span>
          <span>&#x25C0; &#x1F4F6; &#x1F50B;</span>
        </div>

        {/* ── Step 1: Onboarding ── */}
        {step === 'app-onboarding' && (
          <div className="cm-campanion__onboarding">
            <img
              src={campHero}
              alt="Parents sharing the camp experience"
              className="cm-campanion__hero-img"
            />
            <div className="cm-campanion__hero-body">
              <h2 className="cm-campanion__hero-title">
                Share the Camp Experience<br />in a New Way
              </h2>
              <p className="cm-campanion__hero-subtitle">
                Let your parents share in their child&rsquo;s camp experience
                like never before through a curated stream of photos and
                updates directly from camp.
              </p>
              <div className="cm-campanion__hero-dots">
                <div className="cm-campanion__hero-dot cm-campanion__hero-dot--active" />
                <div className="cm-campanion__hero-dot" />
                <div className="cm-campanion__hero-dot" />
              </div>
              <button
                className="cm-campanion__login-btn"
                onClick={() => setStep('campanion-login')}
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {/* ── Steps 2 & 3: Auth0 in-app sheet ── */}
        {(step === 'campanion-login' || step === 'password') && (
          <div className="cm-campanion__sheet">
            <div className="cm-campanion__sheet-handle">
              <button
                className="cm-campanion__sheet-close"
                onClick={() => setStep('app-onboarding')}
              >
                &times;
              </button>
              <span className="cm-campanion__sheet-url">auth.campminder.com</span>
              <span style={{ width: 28 }} />
            </div>

            <div className="cm-campanion__sheet-body">
              {/* Campanion branding header */}
              <div className="cm-campanion__sheet-branding">
                <img
                  src={campanionLogo}
                  alt="Campanion"
                  className="cm-campanion__sheet-logo"
                />
              </div>

              {/* Email entry */}
              {step === 'campanion-login' && (
                <div className="cm-campanion__sheet-form">
                  <h2 className="cm-campanion__sheet-title">Welcome</h2>
                  <p className="cm-campanion__sheet-subtitle">
                    All your camps, one login. Sign in to access
                    every camp your family is connected to.
                  </p>
                  <div className="cm-campanion__sheet-input-group">
                    <label className="cm-campanion__sheet-label">
                      Email address *
                      <input
                        className="cm-campanion__sheet-input"
                        type="email"
                        placeholder="yourname@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <button
                      className="cm-campanion__sheet-btn"
                      disabled={!email.trim()}
                      onClick={() => setStep('password')}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Password entry */}
              {step === 'password' && (
                <div className="cm-campanion__sheet-form">
                  <h2 className="cm-campanion__sheet-title">Enter your password</h2>
                  <p className="cm-campanion__sheet-subtitle">
                    Signing in as <strong>{email}</strong>
                  </p>
                  <div className="cm-campanion__sheet-input-group">
                    <label className="cm-campanion__sheet-label">
                      Password
                      <input
                        className="cm-campanion__sheet-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                    <button
                      className="cm-campanion__sheet-btn"
                      disabled={!password.trim()}
                      onClick={() => setStep('dashboard')}
                    >
                      Continue
                    </button>
                    <button
                      className="cm-campanion__sheet-link"
                      onClick={() => setStep('campanion-login')}
                    >
                      Go back
                    </button>
                  </div>
                </div>
              )}

              <div className="cm-campanion__sheet-terms">
                By signing in, you agree to Campminder&rsquo;s{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Annotations ── */}
      <div className="cm-campanion__annotations">
        {step === 'app-onboarding' && (
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>Campanion is the parent&rsquo;s mobile app.</strong> When
              they tap &ldquo;Log In,&rdquo; an Auth0 sheet opens in-app at
              auth.campminder.com &mdash; same system as the camp login, but
              with Campanion branding.
            </span>
          </div>
        )}

        {step === 'campanion-login' && (
          <>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Campanion branding, not camp branding.</strong> This is
                intentional &mdash; the parent isn&rsquo;t logging into a single
                camp. They&rsquo;re logging into Campanion, which gives them
                access to <em>all</em> their camps in one place.
              </span>
            </div>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Multi-camp parents get clarity.</strong> Instead of
                wondering &ldquo;which camp am I logging into?&rdquo; the
                message is clear: one account, all your camps.
              </span>
            </div>
          </>
        )}

        {step === 'password' && (
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>Same Auth0 account as CampInTouch.</strong> The
              parent&rsquo;s login works across both Campanion and
              CampInTouch &mdash; one identity, two products.
            </span>
          </div>
        )}
      </div>

      <button
        className="cm-campanion__return"
        onClick={() => navigate('/auth')}
      >
        &larr; Return to Index
      </button>
    </div>
  );
};
