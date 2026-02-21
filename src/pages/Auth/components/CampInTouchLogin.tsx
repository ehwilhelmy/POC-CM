import React from 'react';
import './CampInTouchLogin.css';

interface CampInTouchLoginProps {
  onContinue: () => void;
  onSignUp: () => void;
}

export const CampInTouchLogin: React.FC<CampInTouchLoginProps> = ({
  onContinue,
  onSignUp,
}) => {
  return (
    <div className="cm-cit">
      <div className="cm-cit__brand">CampInTouch</div>

      <div className="cm-cit__card">
        <h2 className="cm-cit__title">Welcome</h2>
        <p className="cm-cit__subtitle">
          Log in to CampInTouch with your email to continue.
        </p>

        <div className="cm-cit__form">
          <input
            className="cm-cit__input"
            type="email"
            placeholder="Email address*"
          />
          <button className="cm-cit__btn" onClick={onContinue}>
            Continue
          </button>
        </div>

        <p className="cm-cit__signup-text">
          Don't have an account?{' '}
          <button className="cm-cit__signup-link" onClick={onSignUp}>
            Sign up
          </button>
        </p>
      </div>

      <p className="cm-cit__terms">
        By signing in, you agree to Campminder's<br />
        <span className="cm-cit__terms-link">Terms of Service</span> and{' '}
        <span className="cm-cit__terms-link">Privacy Policy</span>.
      </p>
    </div>
  );
};
