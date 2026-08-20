<script setup lang="ts">
import { computed, useSlots, type Component } from 'vue'
import { Loader2 } from '@lucide/vue'

export interface PxButtonProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
  loading?: boolean
  disabled?: boolean
  iconLeft?: Component
  iconRight?: Component
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
}

const props = withDefaults(defineProps<PxButtonProps>(), {
  size: 'md',
  variant: 'primary',
  loading: false,
  disabled: false,
  type: 'button',
  block: false
})

const slots = useSlots()

const computedClasses = computed(() => {
  return [
    'px-btn',
    `px-btn-${props.size}`,
    `px-btn-${props.variant}`,
    {
      'w-full': props.block,
      'opacity-60 cursor-not-allowed': props.disabled || props.loading
    }
  ]
})
</script>

<template>
  <button
    :class="computedClasses"
    :disabled="disabled || loading"
    :type="type"
    class="inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  >
    <!-- Loading spinner -->
    <Loader2 v-if="loading" class="w-4 h-4 animate-spin shrink-0" />
    
    <!-- Left Icon (only if not loading) -->
    <component 
      :is="iconLeft" 
      v-else-if="iconLeft" 
      class="w-4 h-4 shrink-0" 
    />
    
    <!-- Label or default slot -->
    <span v-if="label || slots.default" class="truncate">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right Icon -->
    <component 
      :is="iconRight" 
      v-if="iconRight" 
      class="w-4 h-4 shrink-0" 
    />
  </button>
</template>

<style scoped>
/* Base Styles */
.px-btn {
  border-radius: 0.375rem;
  border: 1px solid transparent;
  margin: 0;
}

/* Sizes */
.px-btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
.px-btn-md {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.px-btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Variants */
.px-btn-primary {
  background-color: var(--ui-primary, #3b82f6);
  color: white;
}
.px-btn-primary:hover:not(:disabled) {
  background-color: var(--ui-primary-hover, #2563eb);
}

.px-btn-secondary {
  background-color: var(--ui-surface-100, #f1f5f9);
  color: var(--ui-surface-800, #1e293b);
  border-color: var(--ui-surface-300, #cbd5e1);
}
.px-btn-secondary:hover:not(:disabled) {
  background-color: var(--ui-surface-200, #e2e8f0);
}

.px-btn-danger {
  background-color: var(--ui-error, #ef4444);
  color: white;
}
.px-btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.px-btn-ghost {
  background-color: transparent;
  color: var(--ui-surface-700, #334155);
}
.px-btn-ghost:hover:not(:disabled) {
  background-color: var(--ui-surface-100, #f1f5f9);
}

.px-btn-link {
  background-color: transparent;
  color: var(--ui-primary, #3b82f6);
  padding: 0.25rem 0.5rem;
}
.px-btn-link:hover:not(:disabled) {
  text-decoration: underline;
}
</style>
