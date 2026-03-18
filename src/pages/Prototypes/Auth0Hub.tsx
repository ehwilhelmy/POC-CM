import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import ExploreIcon from '@mui/icons-material/Explore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import './Auth0Hub.css';

interface HubCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  actionLabel: string;
}

const sections: HubCard[] = [
  {
    title: 'Exploration',
    description:
      'All caregiver journey prototypes, edge cases, reference tools, and brand toggle. The full design exploration space.',
    icon: <ExploreIcon />,
    route: '/prototypes/auth0/exploration',
    actionLabel: 'View exploration',
  },
  {
    title: 'Conviction Building',
    description:
      'Clean, shareable flows for user testing and stakeholder demos. No internal context — just the experience.',
    icon: <ScienceIcon />,
    route: '/prototypes/auth0/conviction-building',
    actionLabel: 'View flows',
  },
  {
    title: 'Design Kickoff',
    description:
      'Current vs. new design side-by-side. Toggle to see scope — what your team owns highlighted, everything else in black & white.',
    icon: <RocketLaunchIcon />,
    route: '/prototypes/auth0/design-kickoff',
    actionLabel: 'View kickoff',
  },
];

export const Auth0Hub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cm-auth0hub">
      <div className="cm-auth0hub__hero">
        <img
          src={logoSrc}
          alt="campminder"
          className="cm-auth0hub__logo"
        />
        <h1 className="cm-auth0hub__title">Auth0 Migration</h1>
        <p className="cm-auth0hub__subtitle">
          Caregiver authentication experience — from exploration to engineering handoff.
        </p>
      </div>

      <div className="cm-auth0hub__grid">
        {sections.map((card) => (
          <button
            key={card.route}
            className="cm-auth0hub__card"
            onClick={() => navigate(card.route)}
            type="button"
          >
            <div className="cm-auth0hub__card-icon">{card.icon}</div>
            <h2 className="cm-auth0hub__card-title">{card.title}</h2>
            <p className="cm-auth0hub__card-desc">{card.description}</p>
            <span className="cm-auth0hub__card-action">
              {card.actionLabel} <ArrowForwardIcon />
            </span>
          </button>
        ))}
      </div>

      <button
        className="cm-auth0hub__back"
        onClick={() => navigate('/prototypes')}
        type="button"
      >
        &larr; Back to prototypes
      </button>
    </div>
  );
};
