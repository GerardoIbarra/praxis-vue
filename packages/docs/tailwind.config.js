/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./.vitepress/**/*.{vue,js,ts}",
    "./components/**/*.md",
    "../ui/src/**/*.{vue,js,ts,jsx,tsx}", // include library components used in demos
  ],
  darkMode: 'class',
  presets: [
    require('../ui/tailwind.preset.js')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
