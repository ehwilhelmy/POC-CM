import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import type { SvgIconComponent } from '@mui/icons-material';
import './SidebarNav.css';

export interface NavItem {
  label: string;
  icon?: SvgIconComponent;
  href?: string;
  active?: boolean;
}

export interface SidebarNavProps {
  items: NavItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  collapsed = false,
  onToggleCollapse,
}) => {
  return (
    <nav className={clsx('cm-sidebar', { 'cm-sidebar--collapsed': collapsed })}>
      <div className="cm-sidebar__header">
        {onToggleCollapse && (
          <button
            className="cm-sidebar__toggle"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </button>
        )}
      </div>
      <ul className="cm-sidebar__list">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <a
                href={item.href || '#'}
                className={clsx('cm-sidebar__link', {
                  'cm-sidebar__link--active': item.active,
                  'cm-sidebar__link--collapsed': collapsed,
                })}
                title={collapsed ? item.label : undefined}
              >
                {Icon && <Icon className="cm-sidebar__icon" />}
                {!collapsed && (
                  <span className="cm-sidebar__label">{item.label}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
