/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors : {
        textBlack : "#333333",
        textGray : "#A6A6A6",
        textGreen : "#4B8B6F",
        textWhite : "#F9FBFA",
        bgWhite : "#FFFFFF",
        bgGreen : "#307A59",
        bgGray : "#FAFAFA",
        bgLightGreen : "#c6e0d4",
        red : "#ff0000",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
