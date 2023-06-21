/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rgb: {
          '212-212-212': 'rgb(212, 212, 212)',
        },
      },
    },
  },
  plugins: [],
}