import React from 'react';
import clsx from 'clsx';
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
}) => {
  return (
    <div className={clsx('cm-text-input', { 'cm-text-input--error': error, 'cm-text-input--disabled': disabled })}>
      {label && <label className="cm-text-input__label">{label}</label>}
      <input
        className="cm-text-input__field"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {error && <span className="cm-text-input__error">{error}</span>}
      {!error && helperText && <span className="cm-text-input__helper">{helperText}</span>}
    </div>
  );
};
