import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './StepNav.css';

interface StepNavProps {
  currentIndex: number;
  total: number;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
}

export const StepNav: React.FC<StepNavProps> = ({
  currentIndex,
  total,
  canGoBack,
  canGoForward,
  goBack,
  goForward,
}) => (
  <div className="cm-step-nav">
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
  </div>
);
