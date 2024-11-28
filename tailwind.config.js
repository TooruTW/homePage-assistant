/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing:{
        "70p":"70%"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

