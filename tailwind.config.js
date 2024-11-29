/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing:{
        "75p":"75%"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

