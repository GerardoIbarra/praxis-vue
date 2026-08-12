<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** The variant defines the visual hierarchy and layout of the header */
    variant?: 'page' | 'form' | 'list'
    /** Main title text */
    title?: string
    /** Subtitle text (mostly used in 'page' variant) */
    subtitle?: string
    /** Custom class for the outermost container */
    containerClass?: string
    
    // Form variant specific props
    /** If true, prefixes the title with "Edit " instead of "Create " (only for 'form' variant) */
    isEditMode?: boolean
    /** If true, disables the automatic "Create/Edit" prefix in 'form' variant */
    disablePrefix?: boolean
  }>(),
  {
    variant: 'page',
    isEditMode: false,
    disablePrefix: false,
  }
)

const displayTitle = computed(() => {
  if (props.variant === 'form' && !props.disablePrefix && props.title) {
    return props.isEditMode ? `Edit ${props.title}` : `Create ${props.title}`
  }
  return props.title
})

const defaultContainerClass = computed(() => {
  switch (props.variant) {
    case 'page':
      return 'bg-white dark:bg-surface-800 border border-border-light shadow-xs rounded-2xl p-5 mb-6'
    case 'form':
      return 'section-divider pb-4 mb-4' // Assuming section-divider exists in global CSS
    case 'list':
      return 'mb-2'
    default:
      return ''
  }
})

const titleClass = computed(() => {
  switch (props.variant) {
    case 'page':
      return 'text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white'
    case 'form':
      return 'text-xl font-semibold text-slate-900 dark:text-white flex items-center' 
    case 'list':
      return 'text-lg font-semibold text-gray-700 dark:text-gray-200'
    default:
      return ''
  }
})
</script>

<template>
  <div
    :class="[
      'flex justify-between gap-4',
      props.variant === 'page' ? 'flex-col md:flex-row md:items-center' : 'items-center',
      defaultContainerClass,
      props.containerClass
    ]"
  >
    <div class="space-y-1">
      <component :is="props.variant === 'page' ? 'h1' : (props.variant === 'form' ? 'h2' : 'h3')" :class="titleClass">
        <slot name="title">
          <span>{{ displayTitle }}</span>
        </slot>
      </component>
      
      <p v-if="props.variant === 'page' && ($slots.subtitle || subtitle)" class="text-xs md:text-sm opacity-80 text-slate-900 dark:text-white">
        <slot name="subtitle">
          <span>{{ subtitle }}</span>
        </slot>
      </p>
    </div>

    <!-- Actions / Controls -->
    <div v-if="$slots.actions" :class="['flex items-center gap-2', props.variant === 'page' ? 'w-full md:w-auto gap-3' : '']">
      <slot name="actions" />
    </div>
  </div>
</template>
