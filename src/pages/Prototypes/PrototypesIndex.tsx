import React from 'react';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import './PrototypesIndex.css';

interface PrototypeArea {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

const areas: PrototypeArea[] = [
  {
    title: 'Auth0 Migration',
    description:
      'Caregiver authentication flows — exploration prototypes, conviction building, and design kickoff materials for the Auth0 migration.',
    icon: <LockIcon />,
    route: '/prototypes/auth0',
  },
];

export const PrototypesIndex: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cm-prototypes">
      <div className="cm-prototypes__hero">
        <img
          src={logoSrc}
          alt="campminder"
          className="cm-prototypes__logo"
        />
        <h1 className="cm-prototypes__title">Prototypes</h1>
        <p className="cm-prototypes__subtitle">
          Active prototype workstreams for the campminder platform.
        </p>
      </div>

      <div className="cm-prototypes__grid">
        {areas.map((area) => (
          <button
            key={area.route}
            className="cm-prototypes__card"
            onClick={() => navigate(area.route)}
            type="button"
          >
            <div className="cm-prototypes__card-icon">{area.icon}</div>
            <h2 className="cm-prototypes__card-title">{area.title}</h2>
            <p className="cm-prototypes__card-desc">{area.description}</p>
            <span className="cm-prototypes__card-action">
              View <ArrowForwardIcon />
            </span>
          </button>
        ))}
      </div>

      <button
        className="cm-prototypes__back"
        onClick={() => navigate('/')}
        type="button"
      >
        &larr; Back
      </button>
    </div>
  );
};
