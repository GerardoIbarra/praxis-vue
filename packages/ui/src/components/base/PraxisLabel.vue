<script setup lang="ts">
interface Props {
  /** Text content of the label */
  label: string
  /** Associates the label with an input via its id */
  for?: string
  /** Shows a red asterisk indicating the associated field is required */
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
})
</script>

<template>
  <label
    :for="$props.for"
    class="praxis-label"
  >
    {{ label }}
    <span v-if="required" class="praxis-label-required" aria-hidden="true">*</span>
  </label>
</template>

<style scoped>
.praxis-label {
  display: block;
  font-size: 0.9375rem; /* 15px */
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.dark .praxis-label {
  color: #9ca3af;
}

.praxis-label-required {
  color: #ef4444;
  margin-left: 0.2rem;
}
</style>
