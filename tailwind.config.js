/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html, js}", "./public/assets/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Ubuntu"
      },
      backgroundImage: {
        'wave-pattern': "url('../icons/waves-bg.svg')"
      }
    },
  },
  plugins: [],
}