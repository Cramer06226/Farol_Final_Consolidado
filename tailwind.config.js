/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        cream: '#f5f0dc',
        gold: {
          light: '#f5f0dc',
          DEFAULT: '#d4af37',
          dark: '#b8963c',
          darker: '#8b6914',
        },
        navy: {
          dark: '#0a1628',
          darker: '#0d1e36',
          DEFAULT: '#1e3a5f',
          light: '#162544',
          accent: '#4464a6',
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
