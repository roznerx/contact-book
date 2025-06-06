/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // include TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
