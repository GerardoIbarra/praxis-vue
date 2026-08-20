<script setup lang="ts">
import { computed } from "vue";
import PxSelect from "@/components/_primitives/PxSelect.vue";
import { Users } from "@lucide/vue";

// TypeScript interfaces
export interface VisualOption {
  color?: string; // Used when variant === 'color'
  [key: string]: any; // Allows flexible options
}

interface Props {
  modelValue?:
    | string
    | number
    | Record<string, unknown>
    | null
    | (string | number | Record<string, unknown>)[];
  options: VisualOption[];
  variant?: "color" | "group";
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
  variant: "group",
  label: "label",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce: (option: any) => option?.id || option?.value || option,
  placeholder: "",
  selectClass: "vue-select-standard text-gray-400",
  disabled: false,
  multiple: false,
  clearable: true,
  inputId: "px-visual-select",
  dataTestid: "px-visual-select",
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
  <PxSelect
    v-model="computedValue"
    :options="options"
    :optionLabel="label"
    :optionValue="reduce"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :clearable="clearable"
    :searchable="true"
    :id="inputId"
    :data-testid="dataTestid"
    :class="[selectClass, disabled ? 'is-disabled' : 'is-enabled']"
  >
    <template #option="option">
      <!-- Group Variant -->
      <div v-if="variant === 'group'" class="flex items-center gap-2 py-0.5">
        <div class="w-7 h-7 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
          <Users class="w-3.5 h-3.5" />
        </div>
        <span class="font-medium text-gray-700 dark:text-gray-200">
          {{ option[label] || option.name }}
        </span>
      </div>

      <!-- Color Variant -->
      <div v-else-if="variant === 'color'" class="flex items-center">
        <div 
          class="w-4 h-4 rounded border border-gray-300 shrink-0" 
          :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
        ></div>
        <span class="ml-4 font-medium text-gray-700 dark:text-gray-200">
          {{ option[label] || option.name }}
        </span>
      </div>
    </template>

    <template #selected-option="option">
      <!-- Group Variant -->
      <div v-if="variant === 'group'" class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
          <Users class="w-3 h-3" />
        </div>
        <span class="font-medium text-gray-700 dark:text-gray-200">
          {{ option[label] || option.name }}
        </span>
      </div>

      <!-- Color Variant -->
      <div v-else-if="variant === 'color'" class="flex items-center">
        <div 
          class="w-3 h-3 rounded border border-gray-300 shrink-0" 
          :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
        ></div>
        <span class="ml-2 font-medium text-gray-700 dark:text-gray-200">
          {{ option[label] || option.name }}
        </span>
      </div>

      <!-- Generic -->
      <div v-else class="flex items-center text-gray-700 dark:text-gray-200">
        {{ option[label] || option.name }}
      </div>
    </template>
  </PxSelect>
</template>
