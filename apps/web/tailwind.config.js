/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        content: 'min(90vw, 800px)',
      },
      colors: {
        modal: 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
