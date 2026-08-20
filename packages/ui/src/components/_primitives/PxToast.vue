<script setup lang="ts">
import { usePxToast } from '@/composables/usePxToast';
import { X, CheckCircle, Info, AlertTriangle, XCircle } from '@lucide/vue';
import { Teleport } from 'vue';

const { toasts, remove } = usePxToast();

const getIcon = (severity: string) => {
  switch (severity) {
    case 'success': return CheckCircle;
    case 'info': return Info;
    case 'warn': return AlertTriangle;
    case 'error': return XCircle;
    default: return Info;
  }
};

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case 'success': return 'bg-green-50 text-green-900 border-green-500 dark:bg-green-900/20 dark:text-green-300';
    case 'info': return 'bg-blue-50 text-blue-900 border-blue-500 dark:bg-blue-900/20 dark:text-blue-300';
    case 'warn': return 'bg-orange-50 text-orange-900 border-orange-500 dark:bg-orange-900/20 dark:text-orange-300';
    case 'error': return 'bg-red-50 text-red-900 border-red-500 dark:bg-red-900/20 dark:text-red-300';
    default: return 'bg-surface-50 text-surface-900 border-surface-500 dark:bg-surface-800 dark:text-surface-300';
  }
};
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] w-full sm:w-96 flex flex-col gap-4 pointer-events-none p-4 sm:p-0">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-lg shadow-lg border-l-4 overflow-hidden flex items-start p-4 gap-3 bg-opacity-100 backdrop-blur-md"
          :class="getSeverityClass(toast.severity)"
          role="alert"
        >
          <component :is="getIcon(toast.severity)" class="w-6 h-6 shrink-0" />
          
          <div class="flex-1">
            <h4 class="font-semibold text-sm">{{ toast.summary }}</h4>
            <p v-if="toast.detail" class="mt-1 text-sm opacity-90">{{ toast.detail }}</p>
          </div>
          
          <button 
            @click="remove(toast.id)"
            class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:ring-2 focus:ring-current focus:outline-none shrink-0 -mt-1 -mr-1"
            aria-label="Cerrar"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
