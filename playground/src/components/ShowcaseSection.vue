<script setup lang="ts">
defineProps<{
  title: string
  description: string
  id?: string
}>()
</script>

<template>
  <div :id="id" class="flex flex-col gap-6 mb-24 scroll-mt-32">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-bold text-surface-900 dark:text-white tracking-tight">
        {{ title }}
      </h3>
      <p class="text-surface-500 dark:text-surface-400 text-base leading-relaxed max-w-3xl">
        {{ description }}
      </p>
    </div>

    <!-- Card Container -->
    <div class="group relative w-full rounded-2xl border border-surface-200/50 dark:border-surface-700/50 bg-white/50 dark:bg-surface-900/40 backdrop-blur-md shadow-sm transition-all duration-500 hover:shadow-xl hover:border-surface-300/50 dark:hover:border-surface-600/50 hover:-translate-y-1">
      
      <!-- Top Bar (macOS style) -->
      <div class="h-10 border-b border-surface-200/50 dark:border-surface-700/50 bg-surface-50/50 dark:bg-surface-800/30 rounded-t-2xl flex items-center px-5 gap-2.5">
        <div class="w-3 h-3 rounded-full bg-surface-300/50 dark:bg-surface-600/50 transition-colors group-hover:bg-red-400"></div>
        <div class="w-3 h-3 rounded-full bg-surface-300/50 dark:bg-surface-600/50 transition-colors group-hover:bg-amber-400"></div>
        <div class="w-3 h-3 rounded-full bg-surface-300/50 dark:bg-surface-600/50 transition-colors group-hover:bg-green-400"></div>
      </div>
      
      <!-- Content Area -->
      <div class="p-8 sm:p-12 flex items-center justify-center min-h-[240px] relative overflow-hidden">
        <!-- Subtle Glow Effect -->
        <div class="absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-r from-primary-400 to-indigo-400 blur-2xl z-0 pointer-events-none rounded-b-2xl"></div>
        
        <div class="w-full max-w-4xl flex flex-col gap-8 relative z-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
