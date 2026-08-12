<script setup lang="ts">
// Props del componente
interface Props {
  label: string;
  value?: string | number;
  valueClass?: string;
}

withDefaults(defineProps<Props>(), {
  value: "N/A",
  valueClass: "",
});
</script>

<template>
  <div class="flex items-center gap-2">
    <slot name="icon" />
    <label class="block field-description font-medium">{{ label }}</label>
    <h5
      class="text-sm text-gray-800 dark:text-white font-medium"
      :class="valueClass"
    >
      {{ value }}
    </h5>
  </div>
</template>
