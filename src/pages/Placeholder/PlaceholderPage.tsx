import React from 'react';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="cm-placeholder">
      <h1 className="cm-placeholder__title">{title}</h1>
      <p className="cm-placeholder__text">
        This page is a placeholder. Add a Figma design and prototype it here.
      </p>
    </div>
  );
};
