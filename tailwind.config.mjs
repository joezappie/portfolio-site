import defaultTheme from 'tailwindcss/defaultTheme';

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
      colors: {
        accent: '#24ccc1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
