<script setup lang="ts">
interface Props {
  label: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  required: false,
});
</script>
<template>
  <label
    class="block text-[15px] text-gray-600 font-semibold mb-1 dark:text-gray-400"
  >
    {{ label }}
    <span v-if="required" class="text-error">*</span>
  </label>
</template>
