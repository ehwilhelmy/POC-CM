import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './SearchBar.css';

export interface SearchResult {
  label: string;
  value: string;
}

export interface SearchBarProps {
  placeholder?: string;
  disabled?: boolean;
  results?: SearchResult[];
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  onClear?: () => void;
  width?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Placeholder text',
  disabled = false,
  results,
  loading = false,
  value: controlledValue,
  onChange,
  onSelect,
  onClear,
  width = 342,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const hasValue = value.length > 0;
  const showDropdown = focused && hasValue && (loading || (results && results.length > 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val);
    setHighlightIndex(-1);
  };

  const handleClear = () => {
    if (controlledValue === undefined) setInternalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result);
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || !results) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightIndex]);
    } else if (e.key === 'Escape') {
      setFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={clsx('cm-search', { 'cm-search--open': showDropdown })}
      style={{ width }}
    >
      <div
        className={clsx('cm-search__bar', {
          'cm-search__bar--disabled': disabled,
          'cm-search__bar--focused': focused && hasValue,
          'cm-search__bar--filled': !focused && hasValue,
        })}
      >
        <input
          ref={inputRef}
          type="text"
          className="cm-search__input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {hasValue ? (
          <button
            className="cm-search__icon-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        ) : (
          <SearchIcon className={clsx('cm-search__icon', { 'cm-search__icon--disabled': disabled })} />
        )}
      </div>

      {showDropdown && (
        <div className="cm-search__dropdown">
          {loading ? (
            <div className="cm-search__loading">
              <div className="cm-search__spinner" />
              <span className="cm-search__loading-text">Loading results...</span>
            </div>
          ) : (
            results?.map((result, i) => (
              <button
                key={result.value}
                className={clsx('cm-search__result', {
                  'cm-search__result--highlighted': i === highlightIndex,
                })}
                onMouseEnter={() => setHighlightIndex(i)}
                onMouseDown={() => handleSelect(result)}
              >
                {result.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
