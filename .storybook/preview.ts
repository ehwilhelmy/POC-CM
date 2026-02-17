import type { Preview } from '@storybook/react-vite';
import '../src/theme/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Campminder',
      values: [
        { name: 'Campminder', value: '#f9fafe' },
        { name: 'White', value: '#ffffff' },
        { name: 'Dark', value: '#282828' },
      ],
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Icons', 'Shadows'],
          'Components',
          'Prototypes',
          ['Reports', 'Staff Pipeline'],
          'Pages',
        ],
      },
    },
  },
};

export default preview;
