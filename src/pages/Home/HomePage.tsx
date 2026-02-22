import React from 'react';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import logoSrc from '../../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import './HomePage.css';

interface SectionCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  actionLabel: string;
  external?: boolean;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const cards: SectionCard[] = [
    {
      title: 'Auth Flow Prototypes',
      description:
        '7 caregiver journeys and reference tools for testing the Auth0 migration experience.',
      icon: <LockIcon />,
      action: () => navigate('/auth'),
      actionLabel: 'View flows',
    },
    {
      title: 'Management Tool',
      description:
        'Reports dashboard, staff pipeline, and app shell POC for the management platform.',
      icon: <DashboardIcon />,
      action: () => navigate('/app'),
      actionLabel: 'Open app',
    },
    {
      title: 'Storybook',
      description:
        'Component library documentation, design tokens, and interactive examples.',
      icon: <MenuBookIcon />,
      action: () => window.open('http://localhost:6006', '_blank'),
      actionLabel: 'Open Storybook',
      external: true,
    },
  ];

  return (
    <div className="cm-home">
      <div className="cm-home__hero">
        <img
          src={logoSrc}
          alt="campminder"
          className="cm-home__logo"
        />
        <h1 className="cm-home__tagline">Unpack Possible</h1>
        <p className="cm-home__subtitle">
          Prototype collection for the campminder platform redesign —
          auth flows, management tools, and component library.
        </p>
      </div>

      <div className="cm-home__grid">
        {cards.map((card) => (
          <button
            key={card.title}
            className="cm-home__card"
            onClick={card.action}
            type="button"
          >
            <div className="cm-home__card-icon">{card.icon}</div>
            <h2 className="cm-home__card-title">{card.title}</h2>
            <p className="cm-home__card-desc">{card.description}</p>
            <span className="cm-home__card-action">
              {card.actionLabel}
              {card.external ? <OpenInNewIcon /> : <ArrowForwardIcon />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
