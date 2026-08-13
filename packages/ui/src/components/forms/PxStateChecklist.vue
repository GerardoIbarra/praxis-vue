<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { FormSchemaField } from "@/types/api/common";
import PxCheckbox from "@/components/_primitives/PxCheckbox.vue";
import { ChevronDown, X, Check, Flag } from "@lucide/vue";

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

// Local state for initial values (to avoid reactivity issues if schema is mutated)
const alternValues = ref<Record<string, string>>({});

// Capture initial schema values (static configuration)
watch(
  () => props.field,
  (field) => {
    if (field?.fields?.list_children) {
      field.fields.list_children.forEach((child) => {
        const textComponent = child.components?.find((c) => c.type === "input");
        alternValues.value[child.key] = textComponent?.altern_value || "";
      });
    }
  },
  { immediate: true }
);

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
            const textComponent = child.components.find(
              (comp) => comp.type === "input"
            );

            initialData[child.key] = {
              value: radioComponent?.value || null,
              flagged: checkboxComponent?.checked || false,
              text: textComponent?.value || "",
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
  formData.value[childKey].flagged = checked;
  emit("update:modelValue", formData.value);
};

// Handle text input change
const handleTextInputChange = (childKey: string, text: string) => {
  if (!formData.value[childKey]) {
    formData.value[childKey] = {};
  }
  formData.value[childKey].text = text;

  const alternValue = alternValues.value[childKey] || "";

  if (text === alternValue) {
    // Regresó al texto negativo → restaurar "no"
    formData.value[childKey].value = "no";
  }

  emit("update:modelValue", formData.value);
};

// Handle input father change
const handleInputFatherChange = () => {
  formData.value._input_father = inputFatherValue.value;
  emit("update:modelValue", formData.value);
};

// Get current radio value for a child
const getRadioValue = (childKey: string) => {
  return formData.value[childKey]?.value || null;
};

// Get current checkbox value for a child
const getCheckboxValue = (childKey: string) => {
  return formData.value[childKey]?.flagged || false;
};

// Get current text value for a child
const getTextValue = (childKey: string) => {
  return formData.value[childKey]?.text || "";
};

// Get list children from field
const listChildren = computed(() => {
  return props.field?.fields?.list_children || [];
});

// Check if has input father
const hasInputFather = computed(() => {
  return props.field?.fields?.input_father?.type === "input";
});

// Check if any child has text input
const hasAnyTextInput = computed(() => {
  return listChildren.value.some(child => child.components?.some(c => c.type === 'input'));
});

// Clear all selections
const clearAll = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clearedData: Record<string, any> = {};
  listChildren.value.forEach((child) => {
    const textComponent = child.components?.find(
      (comp) => comp.type === "input"
    );
    clearedData[child.key] = {
      value: null,
      flagged: false,
      text: textComponent?.value || "",
    };
  });
  formData.value = clearedData;
  inputFatherValue.value = "";
  emit("update:modelValue", formData.value);
};

// Set all unselected items to "no" (false)
const setRestFalse = () => {
  listChildren.value.forEach((child) => {
    if (!formData.value[child.key] || !formData.value[child.key].value) {
      if (!formData.value[child.key]) {
        formData.value[child.key] = {};
      }
      formData.value[child.key].value = "no";

      const textComponent = child.components?.find(
        (comp) => comp.type === "input"
      );
      if (textComponent && textComponent.altern_value) {
        formData.value[child.key].text = textComponent.altern_value;
      }
    }
  });
  emit("update:modelValue", formData.value);
};

// Set all items to "no" (false)
const setAllFalse = () => {
  listChildren.value.forEach((child) => {
    if (!formData.value[child.key]) {
      formData.value[child.key] = {};
    }
    formData.value[child.key].value = "no";

    const textComponent = child.components?.find(
      (comp) => comp.type === "input"
    );
    if (textComponent && textComponent.altern_value) {
      formData.value[child.key].text = textComponent.altern_value;
    }
  });
  emit("update:modelValue", formData.value);
};

// Expose methods to parent component
defineExpose({
  clearAll,
  setRestFalse,
  setAllFalse,
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
          <div v-if="hasInputFather" class="mt-4 px-4">
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
                <span><Check class="text-green-500 w-4 h-4" /></span>
                <span><X class="text-red-500 w-4 h-4" /></span>
                <span v-if="!hasAnyTextInput"><Flag class="text-blue-400 w-4 h-4" /></span>
              </div>
            </div>

            <!-- Item rows -->
            <div
              v-for="child in listChildren"
              :key="child.key"
              class="grid grid-cols-[1fr_auto] gap-4 px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 items-center"
            >
              <div class="flex flex-col gap-1 w-full">
                <div class="text-black dark:text-gray-300 font-medium text-sm">
                  {{ child.label }}
                </div>
                <!-- Optional Text Input -->
                <div
                  v-if="child.components?.some((c) => c.type === 'input')"
                  class="w-full"
                >
                  <input
                    type="text"
                    :value="getTextValue(child.key)"
                    class="w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    @input="
                      (e: any) =>
                        handleTextInputChange(child.key, e.target.value)
                    "
                  />
                </div>
              </div>

              <div
                class="grid grid-cols-3 gap-2 justify-items-center items-center w-30"
              >
                <!-- Positive radio -->
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    :name="`item_${child.key}_${field.label}`"
                    value="yes"
                    :checked="getRadioValue(child.key) === 'yes'"
                    class="w-4 h-4 cursor-pointer accent-blue-500 checked:accent-green-500"
                    @change="handleRadioChange(child.key, 'yes')"
                  />
                </label>

                <!-- Negative radio -->
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    :name="`item_${child.key}_${field.label}`"
                    value="no"
                    :checked="getRadioValue(child.key) === 'no'"
                    class="w-4 h-4 cursor-pointer accent-blue-500 checked:accent-red-500"
                    @change="handleRadioChange(child.key, 'no')"
                  />
                </label>

                <!-- Flagged checkbox -->
                <label
                  v-if="child.components?.some((c) => c.type === 'checkbox')"
                  class="flex items-center justify-center cursor-pointer"
                >
                  <PxCheckbox
                    :model-value="getCheckboxValue(child.key)"
                    :binary="true"
                    class="w-4 h-4"
                    @update:model-value="(val) => handleCheckboxChange(child.key, val as boolean)"
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

/* PrimeVue checkbox size override */
:deep(.p-checkbox) {
  width: 1rem;
  height: 1rem;
}

:deep(.p-checkbox-box) {
  width: 1rem;
  height: 1rem;
}
</style>
