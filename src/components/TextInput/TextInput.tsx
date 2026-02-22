import React, { useState } from 'react';
import clsx from 'clsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './TextInput.css';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  value,
  onChange,
  type = 'text',
  ref,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={clsx('cm-text-input', { 'cm-text-input--error': error, 'cm-text-input--disabled': disabled })}>
      {label && <label className="cm-text-input__label">{label}</label>}
      <div className="cm-text-input__wrapper">
        <input
          className={clsx('cm-text-input__field', { 'cm-text-input__field--has-toggle': isPassword })}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        {isPassword && (
          <button
            type="button"
            className="cm-text-input__toggle"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <VisibilityOffIcon style={{ fontSize: 20 }} />
            ) : (
              <VisibilityIcon style={{ fontSize: 20 }} />
            )}
          </button>
        )}
      </div>
      {error && <span className="cm-text-input__error">{error}</span>}
      {!error && helperText && <span className="cm-text-input__helper">{helperText}</span>}
    </div>
  );
};
