<script setup lang="ts">
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { ChevronDown } from "@lucide/vue";
import { ref, computed } from "vue";
import { Field, validate as veeValidate } from "vee-validate";
import type { PhoneValidationResponse } from "@/types/api/phone";

type ValidationRules =
  string | Record<string, unknown> | ((value: unknown) => boolean | string);

// Props del componente
interface Props {
  modelValue?: string;
  name: string;
  rules?: ValidationRules;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  name: "",
  rules: "",
  disabled: false,
});

const isPhoneValid = ref<boolean>(false);

// Sincronización del v-model
const phone = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});
const emit = defineEmits(["update:modelValue"]);

const combinedRules = computed(() => async (value: unknown) => {
  const r = props.rules;

  const isRequired =
    r === "required" ||
    (typeof r === "object" &&
      r !== null &&
      !!(r as Record<string, unknown>).required);

  if (isRequired && !value) return "Please enter a phone number";
  if (!value) return true;

  if (!isPhoneValid.value) return "Invalid phone number for this country";

  if (typeof r === "object" && r !== null) {
    const obj = r as Record<string, unknown>;
    const rulesToCheck: Record<string, unknown> = {};
    if (obj.unique_contact_number !== undefined)
      rulesToCheck.unique_contact_number = obj.unique_contact_number;

    if (Object.keys(rulesToCheck).length) {
      const result = await veeValidate(value, rulesToCheck);
      if (!result.valid) return result.errors[0];
    }
  }

  return true;
});

const handleValidation = async (
  validationObj: PhoneValidationResponse
): Promise<void> => {
  isPhoneValid.value = validationObj.valid ?? false;
};
</script>

<template>
  <div class="sm:col-span-2">
    <Field
      v-slot="{ field, errors, validate }"
      v-model="phone"
      :name="name"
      :rules="combinedRules"
    >
      <VueTelInput
        v-bind="field"
        v-model="phone"
        default-country="US"
        :valid-characters-only="true"
        :disabled="disabled"
        :class="{ 'is-disabled': disabled }"
        :input-options="{
          maxlength: 25,
        }"
        mode="international"
        @validate="
          (val: PhoneValidationResponse) => {
            handleValidation(val);
            validate();
          }
        "
      >
        <template #arrow-icon>
          <ChevronDown class="w-5 h-5" />
        </template>
      </VueTelInput>
      <span class="text-error" aria-live="polite">
        {{ errors[0] }}
      </span>
    </Field>
  </div>
</template>

<style scoped>
:deep(.vue-tel-input) {
  width: 100%;
  border: 1px solid #d1d5db;
  transition: all 0.2s;
  border-radius: 0.375rem;
  height: 42px;
  background-color: #ffffff;
}

:deep(.vti__input) {
  background-color: #ffffff;
  border-radius: 0.375rem;
  color: rgb(0, 0, 0);
}

:deep(.vti__dropdown) {
  background-color: #ffffff !important;
  cursor: pointer;
  border-radius: 0.375rem;
}

:deep(.vue-tel-input:focus-within) {
  outline: none !important;
  border-color: var(--focus-ring-color) !important;
  box-shadow: 0 0 0 2px var(--focus-ring-color) !important;
}

:deep(.vti__dropdown-item strong),
:deep(.vti__dropdown-item span) {
  font-weight: 400 !important;
  color: #9ca3af;
  font-size: 0.875rem;
}

:deep(.vti__dropdown-item.highlighted),
:deep(.vti__dropdown-item.highlighted strong),
:deep(.vti__dropdown-item.highlighted span) {
  background-color: var(--p-primary-color) !important;
  color: #ffffff !important;
}

/* Ajuste para que el texto de la búsqueda sea visible */
:deep(.vti__searchbar) {
  background-color: #1a1b1c !important;
  color: white !important;
}

/* Estilo cuando está deshabilitado */
:deep(.vue-tel-input.is-disabled) {
  background-color: var(--disabled-bg) !important;
  cursor: not-allowed !important;
}

:deep(.is-disabled .vti__input),
:deep(.is-disabled .vti__dropdown) {
  background-color: transparent !important;
  cursor: not-allowed;
}

/* Quita el borde azul y la sombra cuando está deshabilitado */
:deep(.vue-tel-input.is-disabled:focus-within) {
  border-color: #d1d5db !important;
  box-shadow: none !important;
}
</style>
