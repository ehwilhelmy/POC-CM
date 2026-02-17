import React from 'react';
import clsx from 'clsx';
import './Card.css';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  elevated = false,
}) => {
  return (
    <div className={clsx('cm-card', { 'cm-card--elevated': elevated })}>
      {(title || subtitle) && (
        <div className="cm-card__header">
          {title && <h3 className="cm-card__title">{title}</h3>}
          {subtitle && <p className="cm-card__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="cm-card__body">{children}</div>
      {footer && <div className="cm-card__footer">{footer}</div>}
    </div>
  );
};
