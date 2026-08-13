<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<template>
  <Toast
    :pt="{
      root: { class: 'w-full sm:w-96' },
      message: ({ state }: any) => ({
        class: [
          'mb-4 rounded-lg shadow-lg border-l-4 overflow-hidden',
          {
            'bg-green-50 text-green-900 border-green-500 dark:bg-green-900/20 dark:text-green-300': state.messages?.[0]?.severity === 'success',
            'bg-blue-50 text-blue-900 border-blue-500 dark:bg-blue-900/20 dark:text-blue-300': state.messages?.[0]?.severity === 'info',
            'bg-orange-50 text-orange-900 border-orange-500 dark:bg-orange-900/20 dark:text-orange-300': state.messages?.[0]?.severity === 'warn',
            'bg-red-50 text-red-900 border-red-500 dark:bg-red-900/20 dark:text-red-300': state.messages?.[0]?.severity === 'error',
          }
        ]
      }),
      content: { class: 'flex items-start p-4 gap-3' },
      icon: { class: 'w-6 h-6 text-current' },
      text: { class: 'flex-1' },
      summary: { class: 'font-semibold text-sm' },
      detail: { class: 'mt-1 text-sm opacity-90' },
      closeButton: { class: 'w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:ring-2 focus:ring-current' },
      closeIcon: { class: 'w-4 h-4' }
    }"
  />
</template>
