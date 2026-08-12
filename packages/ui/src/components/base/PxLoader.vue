<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** If true, the loader will overlay the entire screen with a backdrop blur */
    fullscreen?: boolean
    /** The main text to display below the spinner */
    message?: string
    /** Additional subtext, mostly used in fullscreen mode */
    subMessage?: string
  }>(),
  {
    fullscreen: false,
    message: 'Loading...',
    subMessage: 'Please wait while we process your request.',
  }
)
</script>

<template>
  <!-- Fullscreen Mode -->
  <div
    v-if="fullscreen"
    class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md transition-all duration-300 animate-fade-in-blur"
  >
    <div
      class="relative flex flex-col items-center p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-white/20 dark:border-gray-700/30"
    >
      <!-- Premium Spinner -->
      <div class="relative w-20 h-20 mb-6">
        <div class="absolute inset-0 border-4 border-p-secondary/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-p-secondary border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-2 border-2 border-p-secondary/10 rounded-full animate-ping"></div>
      </div>

      <div class="text-center">
        <p class="text-xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">
          {{ message }}
        </p>
        <p v-if="subMessage" class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {{ subMessage }}
        </p>
      </div>
    </div>
  </div>

  <!-- Inline/Lazy Mode -->
  <div
    v-else
    class="lazy-loading-container flex flex-col items-center justify-center min-h-32 w-full p-6 animate-fade-in-up"
  >
    <div class="spinner animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
    <p class="loading-text text-gray-600 dark:text-gray-400 text-sm font-medium">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
.animate-fade-in-blur {
  animation: fadeInBlur 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-in-out;
}

@keyframes fadeInBlur {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
}

@keyframes fadeInUp {
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
