import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx('cm-button', `cm-button--${variant}`, `cm-button--${size}`, {
        'cm-button--loading': loading,
      })}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="cm-button__spinner" size={size === 'sm' ? 14 : 16} />}
      <span className={clsx('cm-button__label', { 'cm-button__label--hidden': loading })}>
        {children}
      </span>
    </button>
  );
};
