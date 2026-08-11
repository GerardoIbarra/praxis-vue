/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./.vitepress/**/*.{vue,js,ts}",
    "./components/**/*.md",
    "../ui/src/**/*.{vue,js,ts,jsx,tsx}", // include library components used in demos
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 500: '#3b82f6', 600: '#2563eb' },
        surface: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
        // These names appear directly in packages/ui/src component templates
        // (bg-secondary, text-error, border-p-secondary, etc.) but were never
        // defined anywhere, so Tailwind silently produced no CSS for them.
        // They're aliased to the CSS vars from @praxis/ui-src/styles/base.css
        // so they track light/dark automatically instead of needing a shade.
        error: '#ef4444',
        secondary: 'var(--praxis-bg-soft)',
        'p-secondary': 'var(--praxis-primary)',
        'p-terciary': 'var(--praxis-text-muted)',
        'p-primary': 'rgba(59, 130, 246, 0.2)',
        'border-light': 'var(--praxis-border)',
      }
    },
  },
  plugins: [],
}
