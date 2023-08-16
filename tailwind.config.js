/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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