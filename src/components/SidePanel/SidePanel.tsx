import React, { useEffect } from 'react';
import clsx from 'clsx';
import CloseIcon from '@mui/icons-material/Close';
import './SidePanel.css';

export interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <>
      <div
        className={clsx('cm-sidepanel__overlay', { 'cm-sidepanel__overlay--open': open })}
        onClick={onClose}
      />
      <aside className={clsx('cm-sidepanel', { 'cm-sidepanel--open': open })}>
        <div className="cm-sidepanel__header">
          <button className="cm-sidepanel__close" onClick={onClose} aria-label="Close panel">
            <CloseIcon />
          </button>
        </div>
        <div className="cm-sidepanel__content">
          <h2 className="cm-sidepanel__title">{title}</h2>
          {subtitle && <p className="cm-sidepanel__subtitle">{subtitle}</p>}
          <div className="cm-sidepanel__body">
            {children}
          </div>
        </div>
      </aside>
    </>
  );
};
