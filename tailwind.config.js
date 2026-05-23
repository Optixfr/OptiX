/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Matches the M3 azure primary palette approx. surface tones
        primary: {
          DEFAULT: '#0b57d0',   // M3 azure primary
          container: '#d3e3fd', // M3 primary container
          on: '#ffffff',
        },
        tertiary: {
          DEFAULT: '#006874',   // M3 cyan tertiary
          container: '#97f0ff', // M3 tertiary container
          on: '#ffffff',
        },
        // App-specific brand for the sidebar (custom, not from M3 palette)
        brand: {
          DEFAULT: '#29525f',
          dark:    '#1a3a4a',
        },
      },
      fontFamily: {
        sans: ['Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'card':     '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'elevated': '0 4px 24px rgba(0,0,0,0.10)',
      },
      transitionTimingFunction: {
        material: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
