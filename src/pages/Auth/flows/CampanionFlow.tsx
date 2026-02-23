import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { CAMP_TALL_PINES, CAMP_SUNSHINE } from '../campBrand';
import type { CampBranding } from '../components/AuthLayout';
import campanionLogo from '@/assets/logo/campanion-logo-color-vert-md.svg';
import campHero from '@/assets/welcome-2@2x.jpg';
import campBg from '@/assets/camp-bg.jpeg';
import './CampanionFlow.css';

type Step = 'app-onboarding' | 'campanion-login' | 'password' | 'camp-picker' | 'dashboard';

const CAMPS = [CAMP_TALL_PINES, CAMP_SUNSHINE];

export const CampanionFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('app-onboarding');
  const [email, setEmail] = useState('jane.smith@email.com');
  const [password, setPassword] = useState('');
  const [, setSelectedCamp] = useState<CampBranding>(CAMPS[0]);

  return (
    <div className="cm-campanion">
      <div className="cm-campanion__phone">
        <div className={clsx('cm-campanion__status-bar', step === 'dashboard' && 'cm-campanion__status-bar--light')}>
          <span>9:41</span>
          <span>&#x25C0; &#x1F4F6; &#x1F50B;</span>
        </div>

        {/* ── Step 1: Onboarding ── */}
        {step === 'app-onboarding' && (
          <div className="cm-campanion__onboarding">
            <img
              src={campHero}
              alt="Child on a camp ropes course"
              className="cm-campanion__hero-bg"
            />
            <div className="cm-campanion__hero-overlay" />
            <div className="cm-campanion__hero-content">
              <h2 className="cm-campanion__hero-title">
                Share the Camp Experience<br />in a New Way
              </h2>
              <p className="cm-campanion__hero-subtitle">
                Let your parents share in their child&rsquo;s camp
                experience like never before through a curated stream
                of photos and updates directly from camp.
              </p>
              <button
                className="cm-campanion__login-btn"
                onClick={() => setStep('campanion-login')}
              >
                Log In
              </button>
              <div className="cm-campanion__hero-dots">
                <div className="cm-campanion__hero-dot cm-campanion__hero-dot--active" />
                <div className="cm-campanion__hero-dot" />
                <div className="cm-campanion__hero-dot" />
              </div>
            </div>
          </div>
        )}

        {/* ── Steps 2, 3 & 4: Auth0 in-app sheet ── */}
        {(step === 'campanion-login' || step === 'password' || step === 'camp-picker') && (
          <div className="cm-campanion__sheet">
            <div className="cm-campanion__sheet-handle">
              <button
                className="cm-campanion__sheet-close"
                onClick={() =>
                  step === 'camp-picker'
                    ? setStep('password')
                    : setStep('app-onboarding')
                }
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

              {/* ── Email entry ── */}
              {step === 'campanion-login' && (
                <div className="cm-campanion__sheet-form">
                  <h2 className="cm-campanion__sheet-title">Welcome</h2>
                  <p className="cm-campanion__sheet-subtitle">
                    One app that gives you access to every camp your
                    family is connected to.
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
                    <p className="cm-campanion__sheet-no-signup">
                      Don&rsquo;t have a campanion account? Contact your
                      camp directly to get set up.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Password entry ── */}
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
                      onClick={() => setStep('camp-picker')}
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

              {/* ── Camp picker ── */}
              {step === 'camp-picker' && (
                <div className="cm-campanion__sheet-form">
                  <h2 className="cm-campanion__sheet-title">Your Camps</h2>
                  <p className="cm-campanion__sheet-subtitle">
                    Welcome back, Jane! You have access to {CAMPS.length} camps.
                    Which one would you like to view?
                  </p>
                  <div className="cm-campanion__camp-list">
                    {CAMPS.map((camp) => (
                      <button
                        key={camp.name}
                        className="cm-campanion__camp-card"
                        onClick={() => {
                          setSelectedCamp(camp);
                          setStep('dashboard');
                        }}
                      >
                        <div
                          className="cm-campanion__camp-card-initials"
                          style={{ backgroundColor: camp.accentColor }}
                        >
                          {camp.initials}
                        </div>
                        <span className="cm-campanion__camp-card-name">{camp.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="cm-campanion__sheet-terms">
                By signing in, you agree to campminder&rsquo;s{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        )}

        {/* ── Step 5: Stream ── */}
        {step === 'dashboard' && (
          <div className="cm-campanion__stream">
            <div className="cm-campanion__stream-nav">
              <MenuIcon className="cm-campanion__stream-nav-icon" />
              <span className="cm-campanion__stream-nav-title">Stream</span>
              <LocalActivityIcon className="cm-campanion__stream-nav-icon" />
            </div>

            <div className="cm-campanion__stream-feed">
              {/* Card 1: Trip photo */}
              <div className="cm-campanion__stream-card">
                <div className="cm-campanion__stream-card-hero">
                  <img
                    src={campBg}
                    alt="Mountain landscape with tents"
                    className="cm-campanion__stream-card-img"
                  />
                  <div className="cm-campanion__stream-card-overlay" />
                  <div className="cm-campanion__stream-card-hero-text">
                    <h3 className="cm-campanion__stream-card-script">
                      Spruce Highland<br />Mary Trip
                    </h3>
                    <span className="cm-campanion__stream-card-badge">JULY 17</span>
                  </div>
                </div>
                <div className="cm-campanion__stream-card-info">
                  <h4 className="cm-campanion__stream-card-title">Spruce Highland Mary Trip</h4>
                  <span className="cm-campanion__stream-card-date">June 15</span>
                </div>
              </div>

              {/* Card 2: Tagged photo */}
              <div className="cm-campanion__stream-card">
                <div className="cm-campanion__stream-card-hero">
                  <img
                    src={campHero}
                    alt="Child on a camp ropes course"
                    className="cm-campanion__stream-card-img"
                  />
                  <div className="cm-campanion__stream-card-overlay" />
                </div>
                <div className="cm-campanion__stream-card-info">
                  <h4 className="cm-campanion__stream-card-title">Tagged Photo</h4>
                  <span className="cm-campanion__stream-card-date">June 14</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Annotations ── */}
      <div className="cm-campanion__annotations">
        {step === 'app-onboarding' && (
          <>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Campanion is the parent&rsquo;s mobile app.</strong> When
                they tap &ldquo;Log In,&rdquo; an Auth0 sheet opens in-app at
                auth.campminder.com &mdash; same system as the camp login, but
                with Campanion branding.
              </span>
            </div>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>No &ldquo;Sign Up&rdquo; option in the app.</strong> Caregivers
                must already have a CampMinder account (created when the camp
                registered their family). This is intentional &mdash; account
                creation happens through the camp, not through a third-party app.
              </span>
            </div>
          </>
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
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Copy explains the branding.</strong> The in-screen text
                tells the parent why they see Campanion branding (not their
                camp&rsquo;s) and that an existing CampMinder account is
                required &mdash; preventing confusion and failed signup attempts.
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

        {step === 'camp-picker' && (
          <>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>This is the key multi-camp moment.</strong> After
                authentication, the system knows which camps this parent
                has access to and shows them all. No more &ldquo;which
                camp am I logging into?&rdquo; confusion.
              </span>
            </div>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>One sign-in, multiple camps.</strong> The parent
                picks a camp context to view. They can switch camps later
                without re-authenticating &mdash; this is the core value
                of Campanion over individual camp logins.
              </span>
            </div>
          </>
        )}

        {step === 'dashboard' && (
          <div className="cm-auth-info-banner">
            <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
            <span>
              <strong>This is the Campanion Stream.</strong> After selecting
              a camp, caregivers land here &mdash; a curated photo feed
              showing updates from all their connected camps. This is the
              core value of Campanion: one app, all your camps&rsquo; photos
              in one place.
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
