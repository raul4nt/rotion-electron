/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    // onde ficarão os meus componentes(front-end react)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
    },
  },
  plugins: [],
};
