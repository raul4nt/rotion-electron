import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    // onde ficarão os meus componentes(front-end react)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        rotion: {
          50: '#ebeaed',
          100: '#c1bfc7',
          200: '#a3a0ac',
          300: '#797486',
          400: '#5f596e',
          500: '#37304a',
          600: '#322c43',
          700: '#272235',
          800: '#1e1a29',
          900: '#17141f',
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.regin-drag': {
          '-webkit-app-region': 'drag',
        },

        '.region-no-drag': {
          '-webkit-app-region': 'no-drag',
        },
      })
    }),
  ],
}
