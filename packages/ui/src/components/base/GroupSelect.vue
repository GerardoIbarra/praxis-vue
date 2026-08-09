<script setup lang="ts">
import VueSelect from "vue-select";
import { Users } from "@lucide/vue";
import { computed } from "vue";
import "vue-select/dist/vue-select.css";

// TypeScript interfaces
export interface GroupOption {
  value: string;
  name: string;
  label: string;
  [key: string]: unknown; // Allow additional properties
}

interface Props {
  modelValue?:
    | string
    | number
    | Record<string, unknown>
    | null
    | (string | number | Record<string, unknown>)[];
  options: GroupOption[];
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce?: (option: any) => any;
  placeholder?: string;
  selectClass?: string;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  inputId?: string;
  dataTestid?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: "label",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce: (option: any) => option.value,
  placeholder: "",
  selectClass: "vue-select-standard text-gray-400",
  disabled: false,
  multiple: false,
  clearable: true,
  inputId: "group-select",
  dataTestid: "group-select",
});

const emit = defineEmits<{
  (
    e: "update:modelValue",
    value:
      | string
      | number
      | Record<string, unknown>
      | null
      | (string | number | Record<string, unknown>)[]
  ): void;
}>();

const computedValue = computed<
  | string
  | number
  | Record<string, unknown>
  | null
  | (string | number | Record<string, unknown>)[]
>({
  get: () => props.modelValue ?? null,
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
    :multiple="multiple"
    :clearable="clearable"
    :input-id="inputId"
    :data-testid="dataTestid"
    :class="[selectClass, disabled ? 'is-disabled' : 'is-enabled']"
  >
    <template #option="option">
      <div class="flex items-center gap-2 py-0.5">
        <div
          class="w-7 h-7 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"
        >
          <Users class="w-3.5 h-3.5" />
        </div>
        <span class="font-medium text-gray-700 dark:text-gray-200">
          {{ option[label] }}
        </span>
      </div>
    </template>

    <template #selected-option="option">
      <div class="flex items-center gap-2 overflow-hidden max-w-full">
        <div
          class="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"
        >
          <Users class="w-2.5 h-2.5" />
        </div>
        <span class="truncate text-gray-700 dark:text-gray-200">
          {{ option[label] }}
        </span>
      </div>
    </template>
  </VueSelect>
</template>

<style scoped>
/* Force truncation on vue-select selected option only for single select */
:deep(.vs--single .vs__selected-options) {
  flex-wrap: nowrap !important;
  overflow: hidden !important;
  min-width: 0 !important;
}

:deep(.vs--single .vs__selected) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: 100% !important;
  min-width: 0 !important;
}

:deep(.vs--single .vs__selected > div) {
  overflow: hidden !important;
  max-width: 100% !important;
}

:deep(.vs--single .vs__selected span) {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
