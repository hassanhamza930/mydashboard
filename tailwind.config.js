/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": "#EDFAFF",
        primary: "#1F63EA",
        black: "#000000",
        darkgray: "#47474E",
        lightgray: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
