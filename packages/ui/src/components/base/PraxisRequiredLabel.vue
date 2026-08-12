<script setup lang="ts">
/**
 * @deprecated Use UiLabel instead. This component is kept for backward compatibility.
 */
import UiLabel from './UiLabel.vue'

interface Props {
  label: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
})
</script>

<template>
  <UiLabel :label="label" :required="required" />
</template>
