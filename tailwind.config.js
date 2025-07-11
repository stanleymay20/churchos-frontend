/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scroll: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f59347',
          500: '#f2751f',
          600: '#e35a14',
          700: '#bc4312',
          800: '#963615',
          900: '#7a2f16',
        },
        prophetic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sacred: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        exousia: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        'scroll': ['Cinzel', 'serif'],
        'prophetic': ['Crimson Text', 'serif'],
        'sacred': ['Playfair Display', 'serif'],
      },
      animation: {
        'scroll-glow': 'scroll-glow 2s ease-in-out infinite alternate',
        'prophetic-pulse': 'prophetic-pulse 3s ease-in-out infinite',
        'sacred-fade': 'sacred-fade 4s ease-in-out infinite',
      },
      keyframes: {
        'scroll-glow': {
          '0%': { boxShadow: '0 0 5px #f2751f, 0 0 10px #f2751f, 0 0 15px #f2751f' },
          '100%': { boxShadow: '0 0 10px #f2751f, 0 0 20px #f2751f, 0 0 30px #f2751f' },
        },
        'prophetic-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'sacred-fade': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
} 