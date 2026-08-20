<script setup lang="ts" generic="T">
import PxSelect from "@/components/_primitives/PxSelect.vue";
import PxAvatar from "@/components/base/PxAvatar.vue";
import { computed } from "vue";

// TypeScript interfaces
export interface AvatarOption {
  id?: string | number;
  value?: string | number;
  name: string;
  [key: string]: unknown; // Allow additional properties
}

interface Props<T> {
  modelValue?:
    | string
    | number
    | Record<string, unknown>
    | null
    | (string | number | Record<string, unknown>)[];
  options: T[];
  label?: string;
  reduce?: (option: T) => unknown;
  placeholder?: string;
  selectClass?: string;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props<T>>(), {
  modelValue: null,
  label: "name",
  reduce: (option: T) => {
    const o = option as unknown as Record<string, unknown>;
    return o.id !== undefined ? o.id : o.value;
  },
  placeholder: "",
  selectClass:
    "w-full border border-gray-300 px-4 py-1 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-400",
  disabled: false,
  multiple: false,
  clearable: true,
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
    :class="[selectClass, disabled ? 'is-disabled' : 'is-enabled']"
  >
    <template #option="option">
      <div class="flex items-center gap-3 py-0.5">
        <PxAvatar
          :name="option[label]"
          size="w-7 h-7"
          text-class="text-xs font-bold"
        />
        <span class="font-medium text-gray-700 dark:text-gray-200">{{
          option[label]
        }}</span>
      </div>
    </template>

    <template #selected-option="option">
      <div class="flex items-center gap-2 overflow-hidden max-w-full">
        <PxAvatar
          :name="option[label]"
          size="w-5 h-5"
          text-class="text-[10px] font-semibold"
          class="shrink-0"
        />
        <span
          class="truncate"
          :class="
            multiple ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200'
          "
          >{{ option[label] }}</span
        >
      </div>
    </template>
  </PxSelect>
</template>
