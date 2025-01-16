/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        'custom': '992px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: {
          DEFAULT: '#004d40',
          dark: '#00332e',
          gray: '#1A202C',
          light: '#edf7ee',
          white: '#ffffff',
        },
        primary: {
          DEFAULT: '#4caf50',
          active: '#388e3c',
          focus: '#edf7ee',
          hover: '#43a047',
          light: '#c9e7cb',
          label: '#4caf50',
          muted: '#c9e7cb',
        },
        text: {
          DEFAULT: '#ffebee',
          black: '#1a1a1a',
          bright: '#fff3e0',
        },
        secondary: {
          DEFAULT: '#ff9800',
          hover: '#fb8c00',
          active: '#f57c00',
          light: '#fff3e0',
          focus: '#ffccbc',
          label: '#ff9800',
          muted: '#ffccbc',
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
