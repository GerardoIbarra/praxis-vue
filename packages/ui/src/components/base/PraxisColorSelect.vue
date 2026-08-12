<script setup lang="ts">
import VueSelect from "vue-select";
import { computed } from "vue";
import "vue-select/dist/vue-select.css";

// TypeScript interfaces
export interface ColorOption {
  id?: string | number;
  name: string;
  color: string;
  [key: string]: unknown; // Allow additional properties
}

interface Props {
  modelValue?: string | number | object | null;
  options: any[];
  label?: string;
  reduce?: (option: any) => unknown;
  placeholder?: string;
  selectClass?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: "name",
  reduce: (option: any) => option?.id || option?.value || option,
  placeholder: "",
  selectClass:
    "w-full border border-gray-300 px-4 py-1 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-400",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object | null): void;
}>();

const computedValue = computed<string | number | object | null>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <VueSelect
    v-model="computedValue"
    :options="options"
    :label="label"
    :reduce="reduce"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[selectClass, disabled ? 'is-disabled' : 'is-enabled']"
  >
    <template #option="{ name, color }">
      <div class="flex items-center">
        <div class="w-4 h-4 rounded border border-gray-300 shrink-0" :style="{ backgroundColor: color?.startsWith('#') ? color : '#' + color }"></div>
        <span class="ml-4">{{ name }}</span>
      </div>
    </template>

    <template #selected-option="{ name, color }">
      <div class="flex items-center overflow-hidden max-w-full">
        <div class="w-4 h-4 rounded border border-gray-300 shrink-0" :style="{ backgroundColor: color?.startsWith('#') ? color : '#' + color }"></div>
        <span class="ml-2 truncate">{{ name }}</span>
      </div>
    </template>
  </VueSelect>
</template>

<style scoped>
/* Force truncation on vue-select selected option */
:deep(.vs__selected-options) {
  flex-wrap: nowrap !important;
  overflow: hidden !important;
  min-width: 0 !important;
}

:deep(.vs__selected) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: 100% !important;
  min-width: 0 !important;
}

:deep(.vs__selected > div) {
  overflow: hidden !important;
  max-width: 100% !important;
}

:deep(.vs__selected span) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
