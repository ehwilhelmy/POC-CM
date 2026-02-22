import React, { useState } from 'react';
import campBg from '@/assets/camp-bg.jpeg';
import campLogo from '@/assets/camp-tall-pines-logo.svg';
import './CampInTouchDashboard.css';
import './GuestAccountsPage.css';

interface GuestAccountsPageProps {
  onSubmit: (note: string) => void;
  onHome?: () => void;
}

export const GuestAccountsPage: React.FC<GuestAccountsPageProps> = ({
  onSubmit,
  onHome,
}) => {
  const [firstName, setFirstName] = useState('Ruth');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('grandma.ruth@email.com');
  const [note, setNote] = useState('');
  const [canEmail, setCanEmail] = useState(true);

  const canSubmit = firstName.trim() && lastName.trim() && email.trim();

  return (
    <div className="cm-cit-dash">
      {/* Reuse the same topbar */}
      <header className="cm-cit-dash__topbar">
        <div className="cm-cit-dash__topbar-inner">
          <div className="cm-cit-dash__topbar-brand">
            <img src={campLogo} alt="Camp Tall Pines" className="cm-cit-dash__topbar-logo" />
            <div className="cm-cit-dash__topbar-name">
              <span className="cm-cit-dash__topbar-name-sub">Camp</span>
              <span className="cm-cit-dash__topbar-name-main">Tall Pines</span>
            </div>
          </div>
          <div className="cm-cit-dash__topbar-right">
            <span className="cm-cit-dash__topbar-phone">(518) 555-0142</span>
            <button
              className="cm-cit-dash__topbar-home"
              onClick={onHome}
              type="button"
            >
              Return to Index
            </button>
          </div>
        </div>
      </header>

      <div
        className="cm-cit-dash__body"
        style={{ backgroundImage: `url(${campBg})` }}
      >
        <div className="cm-guest-page__card">
          <h1 className="cm-guest-page__title">
            Friends &amp; Family Guest Accounts
          </h1>

          {/* Existing guests table */}
          <table className="cm-guest-page__table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Camper</th>
                <th>CS</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Grandma Ruth</td>
                <td>Johnny Bates</td>
                <td>0</td>
                <td><span className="cm-guest-page__table-action">Resend Invite</span></td>
                <td><span className="cm-guest-page__table-action">Manage</span></td>
                <td><span className="cm-guest-page__table-action">Delete</span></td>
              </tr>
            </tbody>
          </table>

          {/* Invite form */}
          <h2 className="cm-guest-page__form-title">Invite a New Guest</h2>
          <div className="cm-guest-page__form">
            <div className="cm-guest-page__row">
              <div className="cm-guest-page__field">
                <label className="cm-guest-page__label">First Name *</label>
                <input
                  className="cm-guest-page__input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="cm-guest-page__field">
                <label className="cm-guest-page__label">Last Name *</label>
                <input
                  className="cm-guest-page__input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="cm-guest-page__field">
              <label className="cm-guest-page__label">Email Address *</label>
              <input
                className="cm-guest-page__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="cm-guest-page__checkbox-row">
              <input
                type="checkbox"
                checked={canEmail}
                onChange={(e) => setCanEmail(e.target.checked)}
              />
              Your guest may email: Tommy Smith
            </label>

            <div className="cm-guest-page__field">
              <label className="cm-guest-page__label">Note (optional)</label>
              <textarea
                className="cm-guest-page__textarea"
                placeholder="Add a personal note to the invite..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button
              className="cm-guest-page__submit"
              disabled={!canSubmit}
              onClick={() => onSubmit(note)}
              type="button"
            >
              Create Guest Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
