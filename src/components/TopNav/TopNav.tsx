import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import wordmarkSvg from '../../assets/campminder-wordmark.svg';
import './TopNav.css';

export interface TopNavProps {
  pageTitle?: string;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  pageTitle,
  avatarUrl,
  onNotificationsClick,
  onProfileClick,
}) => {
  return (
    <header className="cm-topnav">
      <div className="cm-topnav__left">
        <img src={wordmarkSvg} alt="campminder" className="cm-topnav__logo" />
        {pageTitle && <span className="cm-topnav__page-title">{pageTitle}</span>}
      </div>
      <div className="cm-topnav__right">
        <div className="cm-topnav__search">
          <SearchIcon className="cm-topnav__search-icon" />
          <input
            type="text"
            className="cm-topnav__search-input"
            placeholder="Search"
          />
        </div>
        <div className="cm-topnav__actions">
          <button
            className="cm-topnav__notification-btn"
            onClick={onNotificationsClick}
            aria-label="Notifications"
          >
            <NotificationsIcon />
          </button>
          <button
            className="cm-topnav__profile-btn"
            onClick={onProfileClick}
            aria-label="Profile menu"
          >
            <div className="cm-topnav__avatar">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="cm-topnav__avatar-img" />
              ) : (
                <div className="cm-topnav__avatar-placeholder" />
              )}
            </div>
            <ArrowDropDownIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
