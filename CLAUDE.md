# CampMinder Prototype - Design System Rules

## Tech Stack

- **Framework:** React 19 + TypeScript (strict mode, `react-jsx`)
- **Build:** Vite 7.3
- **Styling:** Plain CSS with CSS Custom Properties (no Tailwind, no CSS-in-JS)
- **Icons:** lucide-react
- **Class Composition:** clsx
- **Docs/Testing:** Storybook 10.2, Vitest, Playwright
- **Target:** ES2022, ESNext modules

## Project Structure

```
src/
  theme/
    tokens.css          # CSS custom properties (source of truth for styles)
    tokens.ts           # TypeScript mirror of tokens (for programmatic use)
  components/
    ComponentName/
      ComponentName.tsx         # React component
      ComponentName.css         # Component styles
      ComponentName.stories.tsx # Storybook stories
      index.ts                  # Barrel export
  pages/
    PageName/
      PageName.tsx
      PageName.css
      PageName.stories.tsx
      index.ts
  assets/               # Static assets (SVGs, images)
```

## Component Conventions

### File Structure
Every component MUST follow this folder pattern:
```
ComponentName/
  ComponentName.tsx
  ComponentName.css
  ComponentName.stories.tsx
  index.ts
```

### Barrel Exports
```typescript
// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Component Pattern
```typescript
import React from 'react';
import clsx from 'clsx';
import './ComponentName.css';

export interface ComponentNameProps {
  // Props with defaults use `?`
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  children,
}) => {
  return (
    <div className={clsx('cm-component-name', `cm-component-name--${variant}`)}>
      {children}
    </div>
  );
};
```

### CSS Class Naming
- **Prefix:** `cm-` (CampMinder namespace)
- **Convention:** BEM-like with `cm-` prefix
  - Block: `.cm-button`
  - Modifier: `.cm-button--primary`, `.cm-button--sm`
  - Element: `.cm-button__label`, `.cm-button__spinner`
  - State: `.cm-button--loading`

### Imports
```typescript
// Components import from barrel
import { Button } from '../../components/Button';
// Icons from lucide-react
import { Search, ChevronDown } from 'lucide-react';
// CSS imported directly in component file
import './ComponentName.css';
```

## Design Tokens

All styles MUST use CSS custom properties from `src/theme/tokens.css`. Never hardcode color, spacing, radius, or typography values.

### Colors

**Base palette** (6 families, 10 shades each: 100-1000):
- `--color-neutral-{100-1000}` - Grays (#ffffff to #000000)
- `--color-purple-{100-1000}` - Primary brand (#efe8f7 to #27065c)
- `--color-orange-{100-1000}` - Warning/accent (#fff4e4 to #996412)
- `--color-red-{100-1000}` - Error/danger (#f9e7e0 to #7c1f00)
- `--color-green-{100-1000}` - Success (#e6f1e7 to #1c511f)
- `--color-blue-{100-1000}` - Information (#e4edf9 to #143d7a)

**Semantic colors** (use these in components):
| Token | Purpose | Value |
|-------|---------|-------|
| `--color-primary-default` | Primary buttons, active states | purple-800 |
| `--color-primary-hover` | Primary hover | purple-900 |
| `--color-primary-pressed` | Primary active/pressed | purple-800 |
| `--color-primary-focus-border` | Focus ring color | purple-500 |
| `--color-secondary-default` | Secondary button bg | neutral-100 (white) |
| `--color-secondary-hover` | Secondary hover | purple-100 |
| `--color-secondary-pressed` | Secondary pressed | purple-200 |
| `--color-secondary-text-border` | Secondary text/border | purple-800 |
| `--color-secondary-background` | Secondary accent bg | purple-500 |
| `--color-secondary-menu-hover` | Menu hover states | purple-300 |
| `--color-link-text` | Link text | purple-1000 |
| `--color-divider` | Borders, dividers | neutral-500 |
| `--color-page-background` | Page background | #f9fafe |
| `--color-input-border` | Input borders | neutral-600 |
| `--color-dark-gray` | Primary text | neutral-800 |
| `--color-medium-gray` | Secondary text | neutral-600 |
| `--color-light-gray` | Subtle backgrounds | neutral-300 |
| `--color-information` | Info states | blue-600 |
| `--color-error` | Error states | red-700 |
| `--color-warning` | Warning states | orange-700 |
| `--color-success` | Success states | green-700 |

### Spacing

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 12px |
| `--space-lg` | 16px |
| `--space-xl` | 24px |
| `--space-xxl` | 32px |
| `--space-xxxl` | 40px |

### Border Radius

| Token | Value |
|-------|-------|
| `--radius-xs` | 2px |
| `--radius-sm` | 4px |
| `--radius-md` | 6px |
| `--radius-lg` | 8px |
| `--radius-xl` | 12px |
| `--radius-xxl` | 16px |

### Typography

| Token | Value |
|-------|-------|
| `--font-family-title` | 'Jaini Purva', serif |
| `--font-family-body` | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif |
| `--font-size-xs` | 12px |
| `--font-size-sm` | 14px |
| `--font-size-md` | 16px |
| `--font-size-lg` | 18px |
| `--font-size-xl` | 20px |
| `--font-size-xxl` | 24px |
| `--font-size-xxxl` | 32px |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--line-height-tight` | 1.25 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.75 |

### Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0, 0, 0, 0.05) |
| `--shadow-md` | 0 4px 6px rgba(0, 0, 0, 0.07) |
| `--shadow-lg` | 0 10px 15px rgba(0, 0, 0, 0.1) |

### Icon Sizes

| Token | Value |
|-------|-------|
| `--icon-sm` | 16px |
| `--icon-md` | 20px |
| `--icon-lg` | 24px |
| `--icon-xl` | 32px |
| `--icon-xxl` | 40px |

## Styling Rules

### CSS Patterns
```css
/* Always use token variables */
.cm-example {
  background-color: var(--color-primary-default);
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
}

/* Focus states use focus-visible with 3px box-shadow */
.cm-example:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-focus-border);
}

/* Disabled states use opacity */
.cm-example:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transitions: 0.15s ease for interactive states */
.cm-example {
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
```

### Responsive/Layout
- No CSS framework; layouts use flexbox and CSS grid directly
- Page layouts: sidebar (fixed 240px) + main content (flex: 1)
- Card grids use CSS grid with explicit column counts
- Components are not responsive by default (prototype stage)

## Icon System

- **Library:** lucide-react (SVG icon components)
- **Usage:** Import individual icons, pass `size` prop
- **Size mapping:** sm=16, md=20, lg=24 (matches `--icon-*` tokens)

```typescript
import { Search, ChevronDown, Loader2 } from 'lucide-react';
<Search size={20} />
```

## Existing Components

| Component | Variants | Sizes | Key Features |
|-----------|----------|-------|--------------|
| Button | primary, secondary, danger, success | sm, md, lg | loading state, disabled |
| Card | default, elevated | - | title, subtitle, footer |
| TextInput | default, error | - | label, helperText, error |
| SidebarNav | default, collapsed | - | nested items, icons, active state |
| DataTable | - | - | sorting, selection, pagination |

## Storybook

- Every component needs a `.stories.tsx` file
- Storybook backgrounds: Campminder (#f9fafe), White (#ffffff), Dark (#282828)
- Stories import `tokens.css` via `.storybook/preview.ts`
- Run: `npm run storybook` (port 6006)

## When Implementing Figma Designs

1. **Map Figma tokens to CSS variables** - Match colors, spacing, and typography to existing tokens. If a value doesn't exist, add it to both `tokens.css` and `tokens.ts`.
2. **Reuse existing components** before creating new ones.
3. **Follow the folder convention** for any new components.
4. **Use semantic color tokens** (e.g., `--color-primary-default`) rather than base palette tokens (e.g., `--color-purple-800`) in component CSS.
5. **Use clsx** for conditional/dynamic class composition.
6. **Use lucide-react** for icons. If an icon isn't available in lucide, add a custom SVG to `src/assets/`.
7. **Keep tokens.ts in sync** with tokens.css when adding new tokens.
8. **Write Storybook stories** for every new component.
