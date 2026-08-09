<template>
  <div class="theme-toggle-container">
    <input
      id="theme-checkbox"
      type="checkbox"
      class="theme-checkbox"
      :checked="isDark"
      @change="toggleTheme"
    />
    <label for="theme-checkbox" class="theme-label">
      <span class="sun-icon" :class="{ active: !isDark }">
        <SunIcon :size="20" />
      </span>
      <span class="moon-icon" :class="{ active: isDark }">
        <MoonIcon :size="20" />
      </span>
      <div
        class="theme-toggle"
        :class="{ 'theme-toggle-checked': isDark }"
      ></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";
import { MoonIcon, SunIcon } from "@lucide/vue";

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<style scoped>
@reference "../../../index.css";

.theme-toggle-container {
  @apply flex items-center justify-center;
}

.theme-checkbox {
  display: none;
}

.theme-label {
  /* Usar variables CSS para el tamaño */
  width: 4rem;
  height: 2rem;
  border-radius: 2rem;
  border: 2px solid var(--border-color);
  padding: 0.2rem;
  font-size: 0.8rem;

  /* Layout */
  align-items: center;
  background: var(--toggle-bg);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: all 0.3s ease;
  justify-content: space-between;
  z-index: 1;
}

.theme-label:hover {
  filter: brightness(1.1);
}

.sun-icon,
.moon-icon {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  /* inactive por defecto */
  opacity: 0.35;
  transform: scale(0.85);
  transition:
    opacity 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.sun-icon {
  color: #94a3b8;
}
.sun-icon.active {
  color: #f59e0b;
  opacity: 1;
  transform: scale(1);
}

.moon-icon {
  color: #000000;
}
.moon-icon.active {
  color: #ffffff;
  opacity: 1;
  transform: scale(1);
}

.theme-toggle {
  position: absolute;
  background-color: var(--toggle-thumb);
  border-radius: 50%;
  top: 0.15rem;
  left: 0.15rem;
  height: 1.5rem;
  width: 1.5rem;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  box-shadow: var(--shadow);
}

.theme-toggle-checked {
  transform: translateX(2rem);
}

/* Los estados de opacidad ahora los maneja la clase .active via Vue */

/* Animaciones adicionales */
.theme-label {
  transform: scale(1);
  transition: all 0.3s ease;
}

.theme-label:active {
  transform: scale(0.95);
}
</style>
