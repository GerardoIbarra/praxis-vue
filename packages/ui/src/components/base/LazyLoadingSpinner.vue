<script setup lang="ts">
// Props del componente
interface Props {
  loadingText: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: "Cargando módulo...",
});
</script>

<template>
  <div class="lazy-loading-container">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p class="loading-text">{{ props.loadingText }}</p>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../index.css";

.lazy-loading-container {
  @apply flex items-center justify-center min-h-50 w-full;
}

.loading-spinner {
  @apply text-center;
}

.spinner {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-p-secondary mx-auto mb-4;
}

.loading-text {
  @apply text-gray-600 text-sm font-medium;
}

/* Animación suave de entrada */
.lazy-loading-container {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
