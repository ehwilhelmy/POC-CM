import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AuthLayout } from '../components/AuthLayout';
import { TextInput } from '../../../components/TextInput';
import './AccountLookupFlow.css';

interface AccountResult {
  email: string;
  name: string;
  status: 'verified' | 'unverified' | 'not-found';
  camp?: string;
  lastLogin?: string;
  created?: string;
}

const MOCK_RESULTS: Record<string, AccountResult> = {
  'jane@example.com': {
    email: 'jane@example.com',
    name: 'Jane Smith',
    status: 'verified',
    camp: 'Camp Tall Pines',
    lastLogin: 'Feb 18, 2026',
    created: 'Jan 5, 2024',
  },
  'bob@example.com': {
    email: 'bob@example.com',
    name: 'Bob Johnson',
    status: 'unverified',
    camp: 'Camp Tall Pines',
    lastLogin: 'Never',
    created: 'Feb 10, 2026',
  },
};

export const AccountLookupFlow: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<AccountResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const found = MOCK_RESULTS[email.toLowerCase().trim()];
    setResult(
      found || {
        email: email || 'unknown@example.com',
        name: '',
        status: 'not-found',
      }
    );
    setSearched(true);
  };

  return (
    <AuthLayout>
      <h1 className="cm-auth-title">Account Lookup</h1>
      <p className="cm-auth-subtitle">
        Camp staff tool to check a parent's account status, verification, and
        camp association.
      </p>

      <div className="cm-auth-form">
        <TextInput
          label="Parent email address"
          placeholder="parent@example.com"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSearched(false);
          }}
        />
        <button className="cm-auth-btn cm-auth-btn--primary" onClick={handleSearch}>
          Look Up Account
        </button>
      </div>

      {/* Preset links for testing */}
      <div className="cm-lookup__presets">
        <span className="cm-lookup__presets-label">Try:</span>
        <button
          className="cm-auth-link"
          onClick={() => { setEmail('jane@example.com'); setSearched(false); }}
        >
          jane@example.com
        </button>
        <button
          className="cm-auth-link"
          onClick={() => { setEmail('bob@example.com'); setSearched(false); }}
        >
          bob@example.com
        </button>
        <button
          className="cm-auth-link"
          onClick={() => { setEmail('nobody@example.com'); setSearched(false); }}
        >
          nobody@example.com
        </button>
      </div>

      {/* Result card */}
      {searched && result && (
        <div className="cm-lookup__result">
          <div className="cm-lookup__result-header">
            {result.status === 'verified' && (
              <CheckCircleOutlineIcon className="cm-lookup__icon cm-lookup__icon--verified" />
            )}
            {result.status === 'unverified' && (
              <ErrorOutlineIcon className="cm-lookup__icon cm-lookup__icon--unverified" />
            )}
            {result.status === 'not-found' && (
              <HelpOutlineIcon className="cm-lookup__icon cm-lookup__icon--not-found" />
            )}
            <div>
              <span className="cm-lookup__result-title">
                {result.status === 'not-found'
                  ? 'No account found'
                  : result.name}
              </span>
              <span className="cm-lookup__result-email">{result.email}</span>
            </div>
          </div>

          {result.status !== 'not-found' && (
            <div className="cm-lookup__details">
              <div className="cm-lookup__detail-row">
                <span className="cm-lookup__detail-label">Status</span>
                <span
                  className={`cm-lookup__badge cm-lookup__badge--${result.status}`}
                >
                  {result.status === 'verified' ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="cm-lookup__detail-row">
                <span className="cm-lookup__detail-label">Camp</span>
                <span className="cm-lookup__detail-value">{result.camp}</span>
              </div>
              <div className="cm-lookup__detail-row">
                <span className="cm-lookup__detail-label">Last login</span>
                <span className="cm-lookup__detail-value">{result.lastLogin}</span>
              </div>
              <div className="cm-lookup__detail-row">
                <span className="cm-lookup__detail-label">Created</span>
                <span className="cm-lookup__detail-value">{result.created}</span>
              </div>
            </div>
          )}

          {result.status === 'unverified' && (
            <button className="cm-auth-btn cm-auth-btn--secondary" style={{ marginTop: 12 }}>
              Resend Verification Email
            </button>
          )}

          {result.status === 'not-found' && (
            <p className="cm-lookup__not-found-hint">
              This email doesn't have a CampMinder account. The parent may need
              to create one, or they may be using a different email address.
            </p>
          )}
        </div>
      )}

      <button className="cm-auth-link" onClick={() => navigate('/auth')}>
        &larr; Back to all flows
      </button>
    </AuthLayout>
  );
};
