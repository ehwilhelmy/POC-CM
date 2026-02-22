import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import horizontalColor from '../assets/logo/cm-logo-hortizontal-color.svg';
import horizontalDark from '../assets/logo/cm-logo-hortizontal-dark.svg';
import horizontalLight from '../assets/logo/cm-logo-hortizontal-light.svg';
import horizontalTaglineColor from '../assets/logo/cm-logo-hortizontal-tagline-color.svg';
import horizontalTaglineDark from '../assets/logo/cm-logo-hortizontal-tagline-dark.svg';
import horizontalTaglineLight from '../assets/logo/cm-logo-hortizontal-tagline-light.svg';
import stackedColor from '../assets/logo/cm-logo-stacked-color.svg';
import stackedDark from '../assets/logo/cm-logo-stacked-dark.svg';
import stackedLight from '../assets/logo/cm-logo-stacked-light.svg';
import slugColor from '../assets/logo/cm-logo-slug-color.svg';
import slugDark from '../assets/logo/cm-logo-slug-dark.svg';
import slugLight from '../assets/logo/cm-logo-slug-light.svg';
import slugTaglineColor from '../assets/logo/cm-logo-slug-tagline-color.svg';
import slugTaglineDark from '../assets/logo/cm-logo-slug-tagline-dark.svg';
import slugTaglineLight from '../assets/logo/cm-logo-slug-tagline-light.svg';

interface LogoEntry {
  label: string;
  src: string;
  filename: string;
}

interface LogoGroup {
  type: string;
  logos: LogoEntry[];
}

const groups: LogoGroup[] = [
  {
    type: 'Horizontal',
    logos: [
      { label: 'Color', src: horizontalColor, filename: 'cm-logo-hortizontal-color.svg' },
      { label: 'Dark', src: horizontalDark, filename: 'cm-logo-hortizontal-dark.svg' },
      { label: 'Light', src: horizontalLight, filename: 'cm-logo-hortizontal-light.svg' },
    ],
  },
  {
    type: 'Horizontal + Tagline',
    logos: [
      { label: 'Color', src: horizontalTaglineColor, filename: 'cm-logo-hortizontal-tagline-color.svg' },
      { label: 'Dark', src: horizontalTaglineDark, filename: 'cm-logo-hortizontal-tagline-dark.svg' },
      { label: 'Light', src: horizontalTaglineLight, filename: 'cm-logo-hortizontal-tagline-light.svg' },
    ],
  },
  {
    type: 'Stacked',
    logos: [
      { label: 'Color', src: stackedColor, filename: 'cm-logo-stacked-color.svg' },
      { label: 'Dark', src: stackedDark, filename: 'cm-logo-stacked-dark.svg' },
      { label: 'Light', src: stackedLight, filename: 'cm-logo-stacked-light.svg' },
    ],
  },
  {
    type: 'Slug',
    logos: [
      { label: 'Color', src: slugColor, filename: 'cm-logo-slug-color.svg' },
      { label: 'Dark', src: slugDark, filename: 'cm-logo-slug-dark.svg' },
      { label: 'Light', src: slugLight, filename: 'cm-logo-slug-light.svg' },
    ],
  },
  {
    type: 'Slug + Tagline',
    logos: [
      { label: 'Color', src: slugTaglineColor, filename: 'cm-logo-slug-tagline-color.svg' },
      { label: 'Dark', src: slugTaglineDark, filename: 'cm-logo-slug-tagline-dark.svg' },
      { label: 'Light', src: slugTaglineLight, filename: 'cm-logo-slug-tagline-light.svg' },
    ],
  },
];

const cellStyle = (isLight: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: 24,
  borderRadius: 8,
  background: isLight ? '#27065c' : '#ffffff',
  border: isLight ? 'none' : '1px solid #ddd',
});

const Gallery: React.FC = () => (
  <div style={{ fontFamily: 'var(--font-family-body)', maxWidth: 960 }}>
    {groups.map((group) => (
      <div key={group.type} style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{group.type}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {group.logos.map((logo) => (
            <div key={logo.filename} style={cellStyle(logo.label === 'Light')}>
              <img
                src={logo.src}
                alt={`${group.type} ${logo.label}`}
                style={{ maxWidth: '100%', height: 50 }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: logo.label === 'Light' ? '#ded0ef' : '#808080',
                  fontFamily: 'monospace',
                }}
              >
                {logo.filename}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: 'Foundations/Logo Gallery',
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => <Gallery />,
};
