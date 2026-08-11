<script setup lang="ts">
/**
 * @deprecated Use PraxisLabel instead. This component is kept for backward compatibility.
 */
import PraxisLabel from './PraxisLabel.vue'

interface Props {
  label: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
})
</script>

<template>
  <PraxisLabel :label="label" :required="required" />
</template>
