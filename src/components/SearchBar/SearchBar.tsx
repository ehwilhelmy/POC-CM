import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar } from '../Avatar';
import './SearchBar.css';

export interface SearchResult {
  label: string;
  value: string;
  subtitle?: string;
}

export type NewTabMode = 'none' | 'hover-icon' | 'static-icon' | 'context-menu';

export interface SearchBarProps {
  placeholder?: string;
  disabled?: boolean;
  results?: SearchResult[];
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  onOpenNewTab?: (result: SearchResult) => void;
  onClear?: () => void;
  width?: number;
  newTabMode?: NewTabMode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Placeholder text',
  disabled = false,
  results,
  loading = false,
  value: controlledValue,
  onChange,
  onSelect,
  onOpenNewTab,
  onClear,
  width = 342,
  newTabMode = 'none',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; result: SearchResult } | null>(null);
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

  const handleContextMenu = (e: React.MouseEvent, result: SearchResult) => {
    if (newTabMode !== 'context-menu') return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, result });
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
      setContextMenu(null);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
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
            <>
              <div className="cm-search__section-header">Recently Viewed</div>
              {results?.map((result, i) => (
                <button
                  key={result.value}
                  className={clsx('cm-search__result', {
                    'cm-search__result--highlighted': i === highlightIndex,
                  })}
                  onMouseEnter={() => setHighlightIndex(i)}
                  onMouseDown={() => handleSelect(result)}
                  onContextMenu={(e) => handleContextMenu(e, result)}
                >
                  <Avatar name={result.label} size="sm" />
                  <div className="cm-search__result-text">
                    <span className="cm-search__result-name">{result.label}</span>
                    {result.subtitle && (
                      <span className="cm-search__result-subtitle">{result.subtitle}</span>
                    )}
                  </div>
                  {(newTabMode === 'hover-icon' || newTabMode === 'static-icon') && (
                    <span
                      className={clsx('cm-search__new-tab-icon', {
                        'cm-search__new-tab-icon--static': newTabMode === 'static-icon',
                      })}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        onOpenNewTab?.(result);
                      }}
                      role="button"
                      aria-label={`Open ${result.label} in new tab`}
                    >
                      <OpenInNewIcon style={{ fontSize: 14 }} />
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {contextMenu && (
        <div
          className="cm-search__context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            className="cm-search__context-menu-item"
            onMouseDown={() => {
              onOpenNewTab?.(contextMenu.result);
              closeContextMenu();
            }}
          >
            <OpenInNewIcon style={{ fontSize: 16 }} />
            Open in new tab
          </button>
        </div>
      )}
    </div>
  );
};
