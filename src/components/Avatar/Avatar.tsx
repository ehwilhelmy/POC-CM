import React from 'react';
import clsx from 'clsx';
import PersonIcon from '@mui/icons-material/Person';
import './Avatar.css';

const AVATAR_COLORS = ['blue', 'orange', 'purple', 'green', 'teal', 'red'] as const;
type AvatarColor = (typeof AVATAR_COLORS)[number];

const ICON_SIZES = { sm: 16, md: 20, lg: 28 } as const;

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getColor(name: string): AvatarColor {
  return AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length];
}

export interface AvatarProps {
  /** Used to deterministically pick a background color */
  name: string;
  /** sm=28px, md=36px, lg=48px */
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md' }) => {
  const color = getColor(name);

  return (
    <div
      className={clsx('cm-avatar', `cm-avatar--${size}`, `cm-avatar--${color}`)}
      aria-hidden="true"
    >
      <PersonIcon sx={{ fontSize: ICON_SIZES[size], color: '#fff' }} />
    </div>
  );
};
