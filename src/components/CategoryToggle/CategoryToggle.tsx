import React from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import './CategoryToggle.css';

export interface CategoryToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CategoryToggle: React.FC<CategoryToggleProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <button
      className="cm-category-toggle"
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="cm-category-toggle__label">{label}</span>
      {checked ? (
        <ToggleOnIcon className="cm-category-toggle__icon cm-category-toggle__icon--on" />
      ) : (
        <ToggleOffIcon className="cm-category-toggle__icon cm-category-toggle__icon--off" />
      )}
    </button>
  );
};
