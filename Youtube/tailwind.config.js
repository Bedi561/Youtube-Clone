/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // For Roboto font
        pathway: ['"Pathway Gothic One"', 'sans-serif'], // For Pathway Gothic One
      },
    },
  },
  plugins: [],
}