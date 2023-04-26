import '../src/app.css';
import { withThemeByDataAttribute } from '@storybook/addon-styling';

/** @type {import('@storybook/sveltekit').Preview} */
export default {};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
