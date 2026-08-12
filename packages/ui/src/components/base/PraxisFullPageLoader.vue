<template>
  <div
    class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md transition-all duration-300"
  >
    <div
      class="relative flex flex-col items-center p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-white/20 dark:border-gray-700/30"
    >
      <!-- Premium Spinner -->
      <div class="relative w-20 h-20 mb-6">
        <div
          class="absolute inset-0 border-4 border-p-secondary/20 rounded-full"
        ></div>
        <div
          class="absolute inset-0 border-4 border-p-secondary border-t-transparent rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-2 border-2 border-p-secondary/10 rounded-full animate-ping"
        ></div>
      </div>

      <div class="text-center">
        <p
          class="text-xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight"
        >
          {{ props.message }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Please wait while we process your request.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: "Loading...",
});
</script>

<style scoped>
/* Smooth fade-in animation */
div.fixed {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
}
</style>
