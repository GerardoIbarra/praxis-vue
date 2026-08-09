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
  <div class="lazy-loading-container flex items-center justify-center min-h-48 w-full">
    <div class="loading-spinner text-center">
      <div class="spinner animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p class="loading-text text-gray-600 text-sm font-medium">{{ props.loadingText }}</p>
    </div>
  </div>
</template>

<style scoped>



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
