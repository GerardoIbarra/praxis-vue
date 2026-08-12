<template>
  <div class="px-theme-toggle-container flex items-center justify-center">
    <input
      id="theme-checkbox"
      type="checkbox"
      class="theme-checkbox"
      :checked="modelValue"
      @change="toggleTheme"
    />
    <label for="theme-checkbox" class="theme-label">
      <span class="sun-icon" :class="{ active: !modelValue }">
        <SunIcon :size="20" />
      </span>
      <span class="moon-icon" :class="{ active: modelValue }">
        <MoonIcon :size="20" />
      </span>
      <div
        class="px-theme-toggle"
        :class="{ 'px-theme-toggle-checked': modelValue }"
      ></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from "@lucide/vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "toggle"]);

const toggleTheme = () => {
  emit("update:modelValue", !props.modelValue);
  emit("toggle", !props.modelValue);
};
</script>

<style scoped>




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

.px-theme-toggle {
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

.px-theme-toggle-checked {
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
