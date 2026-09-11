<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ThemePalette {
  name: string
  label: string
  primary: string
  shades: Record<string, string>
}

const palettes: ThemePalette[] = [
  {
    name: 'blue',
    label: 'Blue',
    primary: '#3b82f6',
    shades: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
    },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    primary: '#10b981',
    shades: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
      500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b',
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    primary: '#8b5cf6',
    shades: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
      500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    primary: '#f43f5e',
    shades: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
      500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337',
    },
  },
  {
    name: 'amber',
    label: 'Amber',
    primary: '#f59e0b',
    shades: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
    },
  },
]

const activeColor = ref('blue')
const isOpen = ref(false)

const applyTheme = (palette: ThemePalette) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  
  for (const [shade, val] of Object.entries(palette.shades)) {
    root.style.setProperty(`--p-primary-${shade}`, val)
  }

  root.style.setProperty('--vp-c-brand-1', palette.shades[600])
  root.style.setProperty('--vp-c-brand-2', palette.shades[500])
  root.style.setProperty('--vp-c-brand-3', palette.shades[400])
  root.style.setProperty('--vp-c-brand-soft', palette.shades[50])

  activeColor.value = palette.name
  try {
    localStorage.setItem('praxis-theme-color', palette.name)
  } catch (_) {}
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('praxis-theme-color')
    if (saved) {
      const p = palettes.find((item) => item.name === saved)
      if (p) applyTheme(p)
    }
  } catch (_) {}
})
</script>

<template>
  <div class="praxis-color-picker">
    <button
      class="praxis-color-toggle-btn"
      :title="`Theme color: ${activeColor} (click to change)`"
      @click="isOpen = !isOpen"
    >
      <span
        class="active-color-dot"
        :style="{ backgroundColor: palettes.find(p => p.name === activeColor)?.primary }"
      ></span>
      <span class="color-label">{{ activeColor }}</span>
      <svg class="chevron" :class="{ 'rotate-180': isOpen }" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Dropdown Popover -->
    <div v-show="isOpen" class="praxis-color-dropdown">
      <div class="dropdown-header">Primary Accent</div>
      <div class="color-options">
        <button
          v-for="p in palettes"
          :key="p.name"
          class="color-option-btn"
          :class="{ 'is-selected': activeColor === p.name }"
          @click="applyTheme(p); isOpen = false"
        >
          <span class="option-dot" :style="{ backgroundColor: p.primary }"></span>
          <span class="option-name">{{ p.label }}</span>
          <svg v-if="activeColor === p.name" class="check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.praxis-color-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
}

.praxis-color-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-border);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.15s ease;
}

.praxis-color-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.active-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.1);
}

.chevron {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.praxis-color-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 155px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 0.4rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.dark .praxis-color-dropdown {
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.5);
}

.dropdown-header {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  padding: 0.3rem 0.5rem 0.2rem;
}

.color-options {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.color-option-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.color-option-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.color-option-btn.is-selected {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.option-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.option-name {
  flex: 1;
}

.check-icon {
  color: var(--vp-c-brand-1);
}
</style>
