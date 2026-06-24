/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scroll': 'scroll 5s linear infinite',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'archive-brown': '#2c221b',
        'archive-paper': '#fef7e8',
        'archive-dark': '#1e1610',
        'archive-gold': '#E1933B',
        'archive-grey': '#6E6E6E',
        'archive-footer': '#D9D9D9',
        'archive-hero':'#E1933B',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% + 40px))' },
        }
      }
    },
  },
  plugins: [],
}