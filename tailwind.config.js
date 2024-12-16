/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: {
          DEFAULT: '#004d40',
          dark: '#00332e',
          light: '#edf7ee',
          gray: '#1A202C',
          white: '#ffffff',
        },
        text: {
          DEFAULT: '#ffebee',
          muted: '#ffccbc',
          bright: '#fff3e0',
          label: '#ff9800',
          black: '#1a1a1a',
          header: '#00332e',
        },
        primary: {
          DEFAULT: '#4caf50',
          hover: '#43a047',
          active: '#388e3c',
          light: '#c9e7cb',
          focus: '#edf7ee',
        },
        secondary: {
          DEFAULT: '#ff9800',
          hover: '#fb8c00',
          active: '#f57c00',
          light: '#fff3e0',
          focus: '#ffccbc',
        },
        toast: {
          success: {
            bg: '#34c759',
            text: '#d7f7e5',
          },
          error: {
            bg: '#e53935',
            text: '#f9d6d5',
          },
          info: {
            bg: '#2196f3',
            text: '#fff3e0',
          },
          warning: {
            bg: '#ffa726',
            text: '#edf7ee',
          },
        },
      },
    },
  },
};
