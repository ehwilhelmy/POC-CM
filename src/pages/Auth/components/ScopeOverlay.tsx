import React from 'react';
import clsx from 'clsx';
import './ScopeOverlay.css';

export interface StepScope {
  teamOwned: boolean;
  annotations: string[];
}

interface ScopeOverlayProps {
  active: boolean;
  scope: StepScope;
  children: React.ReactNode;
}

export const ScopeOverlay: React.FC<ScopeOverlayProps> = ({
  active,
  scope,
  children,
}) => {
  if (!active) return <>{children}</>;

  return (
    <div className={clsx(
      'cm-scope',
      scope.teamOwned ? 'cm-scope--team' : 'cm-scope--other',
    )}>
      <div className="cm-scope__content">
        {children}
      </div>

      {!scope.teamOwned && (
        <div className="cm-scope__overlay">
          <div className="cm-scope__overlay-label">
            Team Phoenix
          </div>
        </div>
      )}

      {scope.annotations.length > 0 && (
        <div className={clsx(
          'cm-scope__panel',
          scope.teamOwned ? 'cm-scope__panel--team' : 'cm-scope__panel--other',
        )}>
          <span className="cm-scope__panel-title">
            {scope.teamOwned ? 'Team Delta will build:' : 'Team Phoenix owns:'}
          </span>
          <ul className="cm-scope__panel-list">
            {scope.annotations.map((note, i) => (
              <li key={i} className="cm-scope__panel-item">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
