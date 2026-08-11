<script setup lang="ts">
/**
 * @deprecated Use PraxisAvatar instead. Kept for backward compatibility.
 */
import PraxisAvatar from './PraxisAvatar.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string | null
    /** Legacy Tailwind class string (e.g. 'w-7 h-7'). Mapped to nearest size preset. */
    size?: string
    textClass?: string
  }>(),
  {
    name: 'User',
    size: 'w-7 h-7',
    textClass: 'text-xs font-bold',
  }
)

/** Map legacy Tailwind size class to PraxisAvatar size preset */
const sizePreset = computed(() => {
  const s = props.size || ''
  if (s.includes('w-16') || s.includes('w-20')) return 'xl'
  if (s.includes('w-10') || s.includes('w-12')) return 'lg'
  if (s.includes('w-8') || s.includes('w-9')) return 'md'
  return 'sm'
})
</script>

<template>
  <PraxisAvatar :name="props.name" :size="sizePreset" />
</template>
