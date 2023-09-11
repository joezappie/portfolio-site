import defaultTheme from 'tailwindcss/defaultTheme';

import { createThemes } from 'tw-colors';

export default {
  content: ['./*.html', './src/**/*.{js,html,css}', './*.yaml'],
  theme: {
    extend: {
      borderRadius: {
        box: '1em',
      },
      padding: {
        box: '1em',
      },
      fontFamily: {
        heading: 'rokkitt',
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    createThemes({
      light: {},
      dark: {
        accent: '#1393e2',
        page: '#0c1319',
        surface: {
          DEFAULT: '#131e26',
          dim: '#0b1114',
          bright: '#1b262d',
          frost: {
            DEFAULT: 'rgb(255 255 255 / 10%)',
            50: 'rgb(255 255 255 / 3%)',
            100: 'rgb(255 255 255 / 4%)',
            200: 'rgb(255 255 255 / 5%)',
            300: 'rgb(255 255 255 / 6%)',
            400: 'rgb(255 255 255 / 7%)',
            500: 'rgb(255 255 255 / 8%)',
            600: 'rgb(255 255 255 / 10%)',
            700: 'rgb(255 255 255 / 12%)',
            800: 'rgb(255 255 255 / 14%)',
            900: 'rgb(255 255 255 / 16%)',
          },
        },
        on: {
          DEFAULT: 'white',
          surface: {
            DEFAULT: 'rgb(255 255 255 / 80%)',
            50: 'rgb(255 255 255 / 30%)',
            100: 'rgb(255 255 255 / 40%)',
            200: 'rgb(255 255 255 / 50%)',
            300: 'rgb(255 255 255 / 60%)',
            400: 'rgb(255 255 255 / 70%)',
            500: 'rgb(255 255 255 / 80%)',
            600: 'rgb(255 255 255 / 85%)',
            700: 'rgb(255 255 255 / 90%)',
            800: 'rgb(255 255 255 / 95%)',
            900: 'rgb(255 255 255 / 100%)',
          },
        },
      },
    }),
  ],
};
