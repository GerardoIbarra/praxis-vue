<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { FormSchemaField } from "@/types/api/common";
import UiCheckbox from "@/components/_primitives/UiCheckbox.vue";
import { ChevronDown, Heading, Minus, Plus } from "@lucide/vue";

const props = defineProps<{
  field: FormSchemaField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: Record<string, any>;
  defaultOpen?: boolean;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "update:modelValue", value: Record<string, any>): void;
}>();

// Control accordion state
const isOpen = ref(props.defaultOpen ?? true);

// Local state for form data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = ref<Record<string, any>>({});

// Input father field (optional text input at the top)
const inputFatherValue = ref("");

// Initialize form data from field schema or modelValue
watch(
  [() => props.field, () => props.modelValue],
  ([field, modelValue]) => {
    // Priority 1: Use modelValue if it has data (for v-model binding)
    if (modelValue && Object.keys(modelValue).length > 0) {
      formData.value = { ...modelValue };
      if (modelValue._input_father) {
        inputFatherValue.value = modelValue._input_father;
      }
      return;
    }

    // Priority 2: Initialize from schema fields (when opening form)
    if (field?.fields) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialData: Record<string, any> = {};

      // Get input_father value from schema
      if (field.fields.input_father?.value) {
        inputFatherValue.value = field.fields.input_father.value;
        initialData._input_father = field.fields.input_father.value;
      }

      // Get checked values from list_children components
      if (
        field.fields.list_children &&
        Array.isArray(field.fields.list_children)
      ) {
        field.fields.list_children.forEach((child) => {
          if (child.components && Array.isArray(child.components)) {
            const radioComponent = child.components.find(
              (comp) => comp.type === "radio" && comp.checked === true
            );
            const checkboxComponent = child.components.find(
              (comp) => comp.type === "checkbox"
            );

            initialData[child.key] = {
              value: radioComponent?.value || null,
              history: checkboxComponent?.checked || false,
            };
          }
        });
      }

      formData.value = initialData;
      emit("update:modelValue", initialData);
    }
  },
  { immediate: true, deep: true }
);

// Handle radio button change
const handleRadioChange = (childKey: string, value: string) => {
  if (!formData.value[childKey]) {
    formData.value[childKey] = {};
  }
  formData.value[childKey].value = value;
  emit("update:modelValue", formData.value);
};

// Handle checkbox change
const handleCheckboxChange = (childKey: string, checked: boolean) => {
  if (!formData.value[childKey]) {
    formData.value[childKey] = {};
  }
  formData.value[childKey].history = checked;
  emit("update:modelValue", formData.value);
};

// Get current radio value for a child
const getRadioValue = (childKey: string) => {
  return formData.value[childKey]?.value || null;
};

// Get current checkbox value for a child
const getCheckboxValue = (childKey: string) => {
  return formData.value[childKey]?.history || false;
};

// Handle input father change
const handleInputFatherChange = () => {
  formData.value._input_father = inputFatherValue.value;
  emit("update:modelValue", formData.value);
};

// Get list children from field
const listChildren = computed(() => {
  return props.field?.fields?.list_children || [];
});

// Check if has input father
const hasInputFather = computed(() => {
  return props.field?.fields?.input_father?.type === "input";
});

// Clear all selections
const clearAll = () => {
  listChildren.value.forEach((child) => {
    if (formData.value[child.key]) {
      formData.value[child.key].value = null;
      formData.value[child.key].history = false;
    }
  });

  inputFatherValue.value = "";
  formData.value._input_father = "";
  emit("update:modelValue", formData.value);
};

// Set all unselected items to "no" (negative)
const setRestNegative = () => {
  listChildren.value.forEach((child) => {
    if (!formData.value[child.key] || !formData.value[child.key].value) {
      if (!formData.value[child.key]) {
        formData.value[child.key] = {};
      }
      formData.value[child.key].value = "no";
    }
  });
  emit("update:modelValue", formData.value);
};

// Set all items to "no" (negative)
const setAllNegative = () => {
  listChildren.value.forEach((child) => {
    if (!formData.value[child.key]) {
      formData.value[child.key] = {};
    }
    formData.value[child.key].value = "no";
  });
  emit("update:modelValue", formData.value);
};

// Expose methods to parent component
defineExpose({
  clearAll,
  setRestNegative,
  setAllNegative,
});
</script>

<template>
  <div class="w-full">
    <!-- Accordion for the section -->
    <div class="border border-gray-200 rounded-md overflow-hidden">
      <!-- Accordion Header -->
      <button
        type="button"
        class="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        @click="isOpen = !isOpen"
      >
        <span class="font-semibold text-black dark:text-white">{{ field.label }}</span>
        <ChevronDown
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <!-- Accordion Content -->
      <div v-show="isOpen">
          <!-- Input Father Field -->
          <div v-if="hasInputFather" class="mt-4">
            <textarea
              v-model="inputFatherValue"
              class="input-base is-enabled"
              placeholder="Additional notes..."
              @input="handleInputFatherChange"
            />
          </div>

          <div class="p-2">
            <!-- Header row -->
            <div class="grid grid-cols-[1fr_auto] gap-4 px-3 py-2 items-center">
              <div class="text-sm text-gray-600"></div>
              <div
                class="grid grid-cols-3 gap-2 justify-items-center items-center w-30"
              >
                <span><Plus class="text-red-400 w-4 h-4" /></span>
                <span><Minus class="text-green-400 w-4 h-4" /></span>
                <span><Heading class="text-blue-400 w-4 h-4" /></span>
              </div>
            </div>

            <!-- Symptom rows -->
            <div
              v-for="child in listChildren"
              :key="child.key"
              class="grid grid-cols-[1fr_auto] gap-4 px-3 py-2 border-b border-gray-100 last:border-b-0 items-center"
            >
              <div class="text-black dark:text-gray-300 font-medium text-sm">
                {{ child.label }}
              </div>

              <div
                class="grid grid-cols-3 gap-2 justify-items-center items-center w-30"
              >
                <!-- Positive radio -->
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    :name="`symptom_${child.key}`"
                    value="yes"
                    :checked="getRadioValue(child.key) === 'yes'"
                    class="w-4 h-4 cursor-pointer accent-blue-500 checked:accent-red-500"
                    @change="handleRadioChange(child.key, 'yes')"
                  />
                </label>

                <!-- Negative radio -->
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    :name="`symptom_${child.key}`"
                    value="no"
                    :checked="getRadioValue(child.key) === 'no'"
                    class="w-4 h-4 cursor-pointer accent-blue-500 checked:accent-green-500"
                    @change="handleRadioChange(child.key, 'no')"
                  />
                </label>

                <!-- History checkbox -->
                <label class="flex items-center justify-center cursor-pointer">
                <UiCheckbox
                    :model-value="getCheckboxValue(child.key)"
                    :binary="true"
                    class="w-4 h-4"
                    @update:model-value="
                      (val) => handleCheckboxChange(child.key, val as boolean)
                    "
                  />
                </label>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom accent colors for radio buttons when checked */
.checked\:accent-red-500:checked {
  accent-color: #ef4444;
}

.checked\:accent-green-500:checked {
  accent-color: #10b981;
}
</style>
