import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './TestingReturnModal.css';

export const TestingReturnModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const fromTesting = searchParams.get('from') === 'testing';

  useEffect(() => {
    if (!fromTesting) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [fromTesting]);

  if (!fromTesting || !visible) return null;

  return (
    <div className="cm-testing-modal__backdrop">
      <div className="cm-testing-modal">
        <span className="cm-testing-modal__emoji">🎉</span>
        <p className="cm-testing-modal__text">
          You've reached the end of this flow!
        </p>
        <button
          className="cm-testing-modal__btn"
          onClick={() => navigate('/testing')}
          type="button"
        >
          Return to flows
        </button>
      </div>
    </div>
  );
};
