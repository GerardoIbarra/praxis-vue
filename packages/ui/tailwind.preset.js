/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--ui-primary-50, #eff6ff)',
          100: 'var(--ui-primary-100, #dbeafe)',
          200: 'var(--ui-primary-200, #bfdbfe)',
          300: 'var(--ui-primary-300, #93c5fd)',
          400: 'var(--ui-primary-400, #60a5fa)',
          500: 'var(--ui-primary, #3b82f6)',
          600: 'var(--ui-primary-hover, #2563eb)',
          700: 'var(--ui-primary-700, #1d4ed8)',
          800: 'var(--ui-primary-800, #1e40af)',
          900: 'var(--ui-primary-900, #1e3a8a)',
          950: 'var(--ui-primary-950, #172554)',
        },
        surface: {
          50: 'var(--ui-surface-50, #f8fafc)',
          100: 'var(--ui-surface-100, #f1f5f9)',
          200: 'var(--ui-surface-200, #e2e8f0)',
          300: 'var(--ui-surface-300, #cbd5e1)',
          400: 'var(--ui-surface-400, #94a3b8)',
          500: 'var(--ui-surface-500, #64748b)',
          600: 'var(--ui-surface-600, #475569)',
          700: 'var(--ui-surface-700, #334155)',
          800: 'var(--ui-surface-800, #1e293b)',
          900: 'var(--ui-surface-900, #0f172a)',
          950: 'var(--ui-surface-950, #020617)',
        },
        error: '#ef4444',
        secondary: 'var(--ui-bg-soft)',
        'p-secondary': 'var(--ui-primary)',
        'p-terciary': 'var(--ui-text-muted)',
        'p-primary': 'rgba(59, 130, 246, 0.2)',
        'border-light': 'var(--ui-border)'
      }
    }
  }
}
