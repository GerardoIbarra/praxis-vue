/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}", // include components
  ],
  darkMode: 'class',
  presets: [
    require('../packages/ui/tailwind.preset.js')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
