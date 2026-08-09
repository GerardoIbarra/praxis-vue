<script setup lang="ts">
defineProps<{
  title: string
  description: string
  id?: string
}>()
</script>

<template>
  <div :id="id" class="flex flex-col gap-4 mb-16 scroll-mt-24">
    <div class="flex flex-col gap-1">
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
        {{ title }}
      </h3>
      <p class="text-surface-500 dark:text-surface-400 text-sm leading-relaxed max-w-3xl">
        {{ description }}
      </p>
    </div>

    <div class="relative w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900">
      <!-- Top Bar for aesthetics -->
      <div class="h-8 border-b border-surface-200 dark:border-surface-700 bg-surface-100/50 dark:bg-surface-800/50 rounded-t-xl flex items-center px-4 gap-2">
        <div class="w-2.5 h-2.5 rounded-full bg-surface-300 dark:bg-surface-600"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-surface-300 dark:bg-surface-600"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-surface-300 dark:bg-surface-600"></div>
      </div>
      
      <!-- Content Area -->
      <div class="p-6 sm:p-8 flex items-center justify-center min-h-[200px]">
        <div class="w-full max-w-4xl flex flex-col gap-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
