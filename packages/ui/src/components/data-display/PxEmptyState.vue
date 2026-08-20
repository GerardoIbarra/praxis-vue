<script setup lang="ts">
import type { Component } from 'vue'

export interface PxEmptyStateProps {
  title: string
  description?: string
  icon?: Component
}

defineProps<PxEmptyStateProps>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 text-center rounded-lg border-2 border-dashed border-surface-200 bg-surface-50">
    <div v-if="icon || $slots.icon" class="mb-4 text-surface-400 flex items-center justify-center bg-surface-100 p-4 rounded-full">
      <slot name="icon">
        <component :is="icon" v-if="icon" class="w-8 h-8" stroke-width="1.5" />
      </slot>
    </div>
    
    <h3 class="text-lg font-semibold text-surface-900 mb-2">
      {{ title }}
    </h3>
    
    <p v-if="description" class="text-sm text-surface-500 max-w-sm mb-6">
      {{ description }}
    </p>

    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
