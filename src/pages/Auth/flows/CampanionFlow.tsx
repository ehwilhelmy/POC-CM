import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import MenuIcon from '@mui/icons-material/Menu';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import HelpIcon from '@mui/icons-material/Help';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import { CAMP_TALL_PINES, CAMP_SUNSHINE } from '../campBrand';
import type { CampBranding } from '../components/AuthLayout';
import campanionLogo from '@/assets/logo/campanion-logo-color-vert-md.svg';
import campHero from '@/assets/welcome-2@2x.jpg';
import campBg from '@/assets/camp-bg.jpeg';
import './CampanionFlow.css';

type Step = 'app-onboarding' | 'campanion-login' | 'password' | 'dashboard';

const CAMPS = [CAMP_TALL_PINES, CAMP_SUNSHINE];

export const CampanionFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('app-onboarding');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className={clsx('cm-campanion', !showNotes && 'cm-campanion--hide-notes')}>
      <div className="cm-campanion__main">
      <div className="cm-campanion__phone">
        <div className={clsx('cm-campanion__status-bar', step === 'dashboard' && 'cm-campanion__status-bar--light')}>
          <span>9:41</span>
          <span className="cm-campanion__status-bar-icons">
            <SignalCellular4BarIcon sx={{ fontSize: 14 }} />
            <WifiIcon sx={{ fontSize: 14 }} />
            <BatteryFullIcon sx={{ fontSize: 14 }} />
          </span>
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

              {/* ── Email entry ── */}
              {step === 'campanion-login' && (
                <div className="cm-campanion__sheet-form">
                  <h2 className="cm-campanion__sheet-title">Welcome</h2>
                  <p className="cm-campanion__sheet-subtitle">
                    Use the same email and password you use for your
                    camp account.
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
                      disabled={!isValidEmail}
                      onClick={() => setStep('password')}
                    >
                      Continue
                    </button>
                    <p className="cm-campanion__sheet-no-signup">
                      Don&rsquo;t have an account? Contact your
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
                By signing in, you agree to campminder&rsquo;s{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Stream ── */}
        {step === 'dashboard' && (
          <div className="cm-campanion__stream">
            <div className="cm-campanion__stream-nav">
              <button
                className="cm-campanion__stream-nav-btn"
                onClick={() => setShowSideNav(true)}
              >
                <MenuIcon className="cm-campanion__stream-nav-icon" />
              </button>
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

            {/* ── Side nav drawer ── */}
            {showSideNav && (
              <>
                <div
                  className="cm-campanion__sidenav-scrim"
                  onClick={() => setShowSideNav(false)}
                />
                <div className="cm-campanion__sidenav">
                  <div className="cm-campanion__sidenav-header">
                    <span className="cm-campanion__sidenav-camp-name">{CAMP_TALL_PINES.name}</span>
                  </div>
                  <div className="cm-campanion__sidenav-divider" />
                  <nav className="cm-campanion__sidenav-links">
                    <button className="cm-campanion__sidenav-item">
                      <ViewStreamIcon sx={{ fontSize: 22 }} />
                      <span>Stream</span>
                    </button>
                    <button className="cm-campanion__sidenav-item">
                      <PhotoLibraryIcon sx={{ fontSize: 22 }} />
                      <span>Photos</span>
                    </button>
                    <button className="cm-campanion__sidenav-item">
                      <StarIcon sx={{ fontSize: 22 }} />
                      <span>Favorites</span>
                    </button>
                    <button className="cm-campanion__sidenav-item">
                      <PersonIcon sx={{ fontSize: 22 }} />
                      <span>My Campers</span>
                    </button>
                    <button className="cm-campanion__sidenav-item">
                      <MailIcon sx={{ fontSize: 22 }} />
                      <span>Letters</span>
                    </button>
                  </nav>
                  <div className="cm-campanion__sidenav-divider" />
                  <nav className="cm-campanion__sidenav-links">
                    <button className="cm-campanion__sidenav-item">
                      <HelpIcon sx={{ fontSize: 22 }} />
                      <span>Help</span>
                    </button>
                    <button className="cm-campanion__sidenav-item">
                      <ChatBubbleIcon sx={{ fontSize: 22 }} />
                      <span>Feedback</span>
                    </button>
                  </nav>
                  <div className="cm-campanion__sidenav-footer">
                    <div className="cm-campanion__sidenav-footer-row">
                      <button className="cm-campanion__sidenav-footer-btn">
                        <ArrowBackIcon sx={{ fontSize: 20 }} />
                        <span>My Camps</span>
                      </button>
                      <SettingsIcon sx={{ fontSize: 20, color: '#999' }} />
                    </div>
                  </div>
                </div>
              </>
            )}
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
                <strong>Same credentials, no &ldquo;Campanion account.&rdquo;</strong> The
                copy says &ldquo;campminder account&rdquo; &mdash; not &ldquo;Campanion
                account&rdquo; &mdash; because caregivers already know their camp credentials.
                Campanion is just the app; the account is the same one they use for CampInTouch.
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

        {step === 'dashboard' && (
          <>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Straight to the Stream.</strong> After login,
                caregivers land directly on the photo stream &mdash; no
                camp picker in the way. The stream shows updates from
                their camp.
              </span>
            </div>
            <div className="cm-auth-info-banner">
              <InfoOutlinedIcon style={{ flexShrink: 0, marginTop: 2 }} fontSize="small" />
              <span>
                <strong>Hamburger opens the side nav.</strong> Tap the
                menu icon to access Stream, Photos, Favorites, My Campers,
                Letters, Help, Feedback, and &ldquo;My Camps&rdquo; to
                switch between camps.
              </span>
            </div>
          </>
        )}
      </div>

      <button
        className="cm-campanion__notes-fab"
        onClick={() => setShowNotes((v) => !v)}
        title={showNotes ? 'Hide design notes' : 'Show design notes'}
      >
        {showNotes
          ? <VisibilityOffIcon sx={{ fontSize: 16 }} />
          : <VisibilityIcon sx={{ fontSize: 16 }} />
        }
      </button>
    </div>
  );
};
