<script setup lang="ts">
/**
 * @deprecated Use PxLabel instead. This component is kept for backward compatibility.
 */
import PxLabel from './PxLabel.vue'

interface Props {
  label: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
})
</script>

<template>
  <PxLabel :label="label" :required="required" />
</template>
