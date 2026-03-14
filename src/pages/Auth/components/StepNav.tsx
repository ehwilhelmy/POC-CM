import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './StepNav.css';

interface StepNavProps {
  currentIndex: number;
  total: number;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  scopeActive?: boolean;
  onScopeToggle?: () => void;
}

export const StepNav: React.FC<StepNavProps> = ({
  currentIndex,
  total,
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  scopeActive,
  onScopeToggle,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromTesting = searchParams.get('from') === 'testing';
  const fromKickoff = searchParams.get('from') === 'kickoff';

  return (
    <div className="cm-step-nav">
      {fromTesting && (
        <>
          <button
            className="cm-step-nav__btn"
            onClick={() => navigate('/prototypes/auth0/conviction-building')}
            aria-label="Back to flows"
            title="Back to flows"
          >
            <AppsIcon sx={{ fontSize: 16 }} />
          </button>
          <div className="cm-step-nav__divider" />
        </>
      )}
      {fromKickoff && (
        <>
          <button
            className="cm-step-nav__btn"
            onClick={() => navigate('/prototypes/auth0/design-kickoff')}
            aria-label="Back to kickoff"
            title="Back to kickoff"
          >
            <AppsIcon sx={{ fontSize: 16 }} />
          </button>
          <div className="cm-step-nav__divider" />
        </>
      )}
      <button
        className="cm-step-nav__btn"
        onClick={goBack}
        disabled={!canGoBack}
        aria-label="Previous step"
      >
        <ArrowBackIcon sx={{ fontSize: 16 }} />
      </button>
      <span className="cm-step-nav__label">
        {currentIndex + 1} / {total}
      </span>
      <button
        className="cm-step-nav__btn"
        onClick={goForward}
        disabled={!canGoForward}
        aria-label="Next step"
      >
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </button>
      {fromKickoff && onScopeToggle && (
        <>
          <div className="cm-step-nav__divider" />
          <button
            className={`cm-step-nav__btn ${scopeActive ? 'cm-step-nav__btn--scope-active' : ''}`}
            onClick={onScopeToggle}
            aria-label={scopeActive ? 'Hide scope' : 'Show scope'}
            title={scopeActive ? 'Hide scope' : 'Show scope'}
          >
            {scopeActive
              ? <VisibilityIcon sx={{ fontSize: 16 }} />
              : <VisibilityOffIcon sx={{ fontSize: 16 }} />
            }
          </button>
        </>
      )}
    </div>
  );
};
