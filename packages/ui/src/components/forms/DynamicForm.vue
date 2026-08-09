<script setup lang="ts">
import { Checkbox, DatePicker, InputText } from "primevue";
import { ref, watch, computed } from "vue";
import VueSelect from "vue-select";
import RequiredLabel from "@/components/ui/base/RequiredLabel.vue";
import CheckListField from "@/components/ui/forms/CheckListField.vue";
import CheckListInputField from "@/components/ui/forms/CheckListInputField.vue";
import SelectListField from "@/components/ui/forms/SelectListField.vue";
import FormFieldRow from "@/components/ui/forms/FormFieldRow.vue";
import FormMultiSelectList from "@/components/ui/forms/FormMultiSelectList.vue";
import VitalSignsHistory from "@/components/medical-charts/history/VitalSignsHistory.vue";
import InfiniteScrollSelect from "@/components/ui/forms/InfiniteScrollSelect.vue";
import FormDividerWithComponents from "@/components/ui/layout/FormDividerWithComponents.vue";
import { ChevronDown, Search } from "@lucide/vue";
import { Field } from "vee-validate";
import { setupVeeValidate } from "@/utils/veeValidateConfig";
import { useFieldValidation } from "@/composables/useFieldValidation";
import { useSelectOptions } from "@/composables/useSelectOptions";
import { useFieldAutofill } from "@/composables/useFieldAutofill";
import { useMedicalChartDocumentStore } from "@/stores/medicalChart/document";
import { storeToRefs } from "pinia";
import type { FormSchemaField, FormValue } from "@/types/api/common";

import { useSearchFieldDependency } from "@/composables/useSearchFieldDependency";
import { useMedicalChartModalFormSection } from "@/stores/medicalChart/modalForm";
const ModalSection = useMedicalChartModalFormSection();
const { getMoreDataScroll } = ModalSection;
const { formData, loading } = storeToRefs(ModalSection);

// Vital signs
import { useMedicalChartVitalSigns } from "@/stores/medicalChart/vitalSigns";
const vitalSigns = useMedicalChartVitalSigns();
const { getFieldsValues } = vitalSigns;
const { cleanedResults, calculatedNumbers } = storeToRefs(vitalSigns);

// Setup vee-validate with centralized configuration
setupVeeValidate();

const props = defineProps<{
  schema: FormSchemaField[];
  existingData?: Record<string, unknown>;
}>();

const documentStore = useMedicalChartDocumentStore();
const { SelectedDocumentId } = storeToRefs(documentStore);

// Creamos un objeto reactivo para almacenar los valores

export interface CheckListInstance {
  clearAll: () => void;
  setRestNegative: () => void;
  setAllNegative: () => void;
}

const checkListRefs = ref<(CheckListInstance | null)[]>([]); // Para almacenar referencias a CheckListField components

// Use select options composable
const { loadingSelect, selectedItems, setSelected, flattenWithIndentation } =
  useSelectOptions();

// Use field autofill composable
const { selectedRow, handleSelected } = useFieldAutofill(
  formData,
  computed(() => props.schema)
);

//const mapCalculatedValues = new Map();

const visibleFields = computed(() =>
  props.schema.filter(
    (field) =>
      (field.type !== "hidden" &&
        (field.key ||
          field.type === "check_list" ||
          field.type === "row" ||
          field.type === "multiselect_list")) ||
      field.type === "check_list_input"
  )
);

// Use validation composable
const {
  isFieldDisabled,
  getFieldRules,
  getMinDate,
  getMaxDate,
  getMinNumberValue,
  getMaxNumberValue,
  validateMinRange,
  validateMaxRange,
} = useFieldValidation(
  formData,
  computed(() => props.schema)
);

// Emite los datos completos si quieres capturarlos arriba
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, unknown>): void;
}>();

watch(
  formData,
  (newFormData) => {
    getFieldsValues(newFormData);
  },
  { deep: true } // Es crucial usar deep: true ya que formData es un objeto.
);

// Inicializamos valores
watch(
  () => props.schema,
  (schema) => {
    if (!cleanedResults.value.includes("row_left_arm")) {
      cleanedResults.value.push("row_left_arm");
    }
    schema.forEach((field) => {
      // calculatedNumbers
      if (field.type === "calculated_number") {
        const index = calculatedNumbers.value.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (f: any) => f.key === field.key
        );

        if (index !== -1) {
          // Si ya existe, actualizamos la referencia al nuevo objeto del schema
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          calculatedNumbers.value[index] = field as any;
        } else {
          // Si es nuevo, lo agregamos
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          calculatedNumbers.value.push(field as any);
        }
      }

      if (field.key) {
        formData.value[field.key] =
          (props.existingData?.[field.key] as FormValue) || "";
      }

      if (field.type === "row") {
        // Iteramos sobre todos los componentes dentro
        (field.components || []).forEach((comp) => {
          // Si el componente interno tiene su propia

          if (comp.key) {
            formData.value[comp.key] =
              (props.existingData?.[comp.key] as FormValue) ||
              (comp.value as FormValue) ||
              "";

            if (
              comp.type === "select" &&
              (comp.key === "weight_unit" || comp.key === "height_unit")
            ) {
              const options = comp.option_source?.options;
              if (selectedRow.value !== null && options) {
                comp.value = options[selectedRow.value].value;
              }
            }

            //rows anidados dentro de multiselect_list
            if (comp.type === "row") {
              (comp.components || []).forEach((subComp) => {
                if (subComp.key) {
                  formData.value[subComp.key] =
                    (props.existingData?.[subComp.key] as string) ||
                    (subComp.value as string) ||
                    "";
                }
              });
            }
          }
        });
      }

      // Inicializar selectedItems para select_list con persistencia
      if (
        field.type === "select_list" &&
        field.value &&
        Array.isArray(field.value) &&
        field.key
      ) {
        const valueField = field.option_source?.value_field || "id";

        // Mantenemos lo que ya esté seleccionado y siga siendo válido
        const currentItems = selectedItems.value[field.key] || [];
        const stillSelected = currentItems.filter((item) =>
          (field.value as string[]).includes(
            (item as Record<string, unknown>)[valueField] as string
          )
        );

        // Buscamos nuevos matches en las opciones actuales del schema
        const optionsMatches = (field.options || []).filter((opt: unknown) =>
          (field.value as string[]).includes(
            (opt as Record<string, unknown>)[valueField] as string
          )
        );

        // Items desde selected_options (backend pre-load)
        const selectedOptionsMatches = (field.selected_options || []).filter(
          (opt: unknown) =>
            (field.value as string[]).includes(
              (opt as Record<string, unknown>)[valueField] as string
            )
        );

        // Mezclar y eliminar duplicados
        const allMatches = [
          ...stillSelected,
          ...optionsMatches,
          ...selectedOptionsMatches,
        ];
        const uniqueMatches: unknown[] = [];
        const seenIds = new Set();

        allMatches.forEach((item: unknown) => {
          const id = (item as Record<string, unknown>)[valueField] as string;
          if (!seenIds.has(id)) {
            seenIds.add(id);
            uniqueMatches.push(item);
          }
        });

        selectedItems.value[field.key] = uniqueMatches;
      }
    });
  },
  { immediate: true, deep: true }
);

watch(formData, (val) => emit("update:modelValue", val), { deep: true });

// Recarga automática de opciones para campos que dependen del valor de otro
// campo (via option_source.search_field), p.ej. SNOMED que depende de ICD-10.
useSearchFieldDependency(
  formData,
  computed(() => props.schema)
);

// Watch props.schema to synchronize field.value and comp.value with formData
watch(
  () => props.schema,
  (newSchema) => {
    newSchema.forEach((field) => {
      // 1. Sync main field value to formData (especially for text/select/number)
      if (field.key !== undefined && field.value !== undefined) {
        if (formData.value[field.key] !== field.value) {
          formData.value[field.key] = field.value;
        }
      }

      // 2. Sync specific back-to-field logic for check_list components
      if (
        (field.type === "check_list" || field.type === "check_list_input") &&
        field.label
      ) {
        // Here we ensure the schema field.value stays in sync with formData for check_lists
        field.value =
          (formData.value[field.label] as FormSchemaField["value"]) || {};
      }

      // 3. Sync row internal components to formData
      if (field.type === "row" && field.components) {
        field.components.forEach((comp) => {
          if (comp.key !== undefined && comp.value !== undefined) {
            if (formData.value[comp.key] !== comp.value) {
              formData.value[comp.key] = comp.value;
            }
          }
        });
      }
    });
  },
  { deep: true, immediate: true }
);

// Methods to control all CheckListField components
const clearAllCheckLists = () => {
  checkListRefs.value.forEach((checkListRef) => {
    if (checkListRef && typeof checkListRef.clearAll === "function") {
      checkListRef.clearAll();
    }
  });
};

const setAllRestNegative = () => {
  checkListRefs.value.forEach((checkListRef) => {
    if (checkListRef && typeof checkListRef.setRestNegative === "function") {
      checkListRef.setRestNegative();
    }
  });
};

const setAllNegative = () => {
  checkListRefs.value.forEach((checkListRef) => {
    if (checkListRef && typeof checkListRef.setAllNegative === "function") {
      checkListRef.setAllNegative();
    }
  });
};

// Expose methods to parent component
defineExpose({
  clearAllCheckLists,
  setAllRestNegative,
  setAllNegative,
});
</script>

<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="grid gap-4"
    :class="
      SelectedDocumentId === 'vital_signs_single_entry'
        ? 'grid-cols-1 px-2 overflow-auto h-128'
        : SelectedDocumentId === 'review_of_systems' ||
            SelectedDocumentId === 'physical_exam'
          ? 'grid-cols-3'
          : props.schema.length === 1
            ? 'grid-cols-1'
            : props.schema.length <= 16 && props.schema.length > 1
              ? 'grid-cols-2'
              : 'grid-cols-4'
    "
  >
    <div
      v-for="(field, index) in visibleFields"
      :key="field.key || `check_list_${index}`"
      class="flex flex-col gap-1 transition-all duration-300 focus-within:z-50 relative"
      :class="{ 'col-span-full': field.type === 'divider_with_components' }"
    >
      <RequiredLabel
        v-if="
          SelectedDocumentId !== 'review_of_systems' &&
          SelectedDocumentId !== 'physical_exam' &&
          field.type !== 'divider_with_components'
        "
        :label="field.label || ''"
        :required="field.required"
      />

      <!-- 🔹 CHECK LIST INPUT (physical exam) -->
      <CheckListInputField
        v-if="field.type === 'check_list_input'"
        :ref="
          (el: any) => {
            if (el) checkListRefs[index as number] = el;
          }
        "
        v-model="formData[field.label!] as any"
        :field="field"
        :default-open="(index as number) < 3"
      />

      <!-- 🔹 CHECK LIST (review of systems) -->
      <CheckListField
        v-else-if="field.type === 'check_list'"
        :ref="
          (el: any) => {
            if (el) checkListRefs[index as number] = el;
          }
        "
        v-model="formData[field.label!] as any"
        :field="field"
        :default-open="(index as number) < 3"
      />

      <!--row-->
      <FormFieldRow
        v-else-if="field.type === 'row'"
        :field="field"
        :get-field-rules="getFieldRules"
        :get-min-number-value="getMinNumberValue"
        :get-max-number-value="getMaxNumberValue"
        :validate-min-range="validateMinRange"
        :validate-max-range="validateMaxRange"
        @search="({ field, searchTerm }) => setSelected(field, searchTerm)"
        @change="({ option, field: f }) => handleSelected(option || f.value, f)"
      />

      <!--calculated_number -->
      <div v-else-if="field.type === 'calculated_number'">
        <InputText
          v-model="field.value as any"
          fluid
          class="input-base is-readonly bg-gray-100"
          :placeholder="field.placeholder || ''"
          :readonly="true"
        />
      </div>

      <!--multiselect_list -->
      <FormMultiSelectList
        v-else-if="field.type === 'multiselect_list'"
        v-model="cleanedResults"
        :field="field"
      />

      <Field
        v-else
        v-slot="{ errors }"
        v-model="field.value as any"
        :name="field.key || ''"
        :rules="getFieldRules(field)"
      >
        <!-- 🔹 TEXT -->
        <InputText
          v-if="field.type === 'text'"
          v-model="field.value as any"
          fluid
          :class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
          :placeholder="field.placeholder || ''"
          :readonly="field.readonly"
          :disabled="isFieldDisabled(field)"
        />

        <!-- 🔹 NUMBER -->
        <InputText
          v-else-if="field.type === 'number'"
          v-model="field.value as any"
          type="number"
          :class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
          :placeholder="field.placeholder || ''"
          :readonly="field.readonly"
          :disabled="isFieldDisabled(field)"
        />

        <!-- Number -->
        <InputText
          v-else-if="field.type === 'integer'"
          v-model="field.value as any"
          v-keyfilter.int
          fluid
          :class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
          :placeholder="field.placeholder || ''"
          :readonly="field.readonly"
          :disabled="isFieldDisabled(field)"
          :min="getMinNumberValue(field) ?? undefined"
          :max="getMaxNumberValue(field) ?? undefined"
        />

        <!-- Double -->
        <InputText
          v-else-if="field.type === 'double'"
          v-model="field.value as any"
          v-keyfilter.num
          fluid
          maxlength="10"
          :class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
          :placeholder="field.placeholder || ''"
          :readonly="field.readonly"
          :disabled="isFieldDisabled(field)"
          :min="getMinNumberValue(field) ?? undefined"
          :max="getMaxNumberValue(field) ?? undefined"
        />

        <!-- 🔹 TEXTAREA -->
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="field.value as any"
          :class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
          :placeholder="field.placeholder || ''"
          :disabled="isFieldDisabled(field)"
          autoResize
        />

        <!-- Agrupaciones Select (aplanadas con indentación visual) -->
        <!-- 🔹 SELECT de agrupaciones de un mismo nivel -->
        <VueSelect
          v-else-if="field.directories === true && field.type === 'select'"
          v-model="field.value"
          :class="{
            'vue-select-standard is-enabled premium-focus':
              !isFieldDisabled(field),
            'vue-select-standard is-disabled': isFieldDisabled(field),
          }"
          :options="flattenWithIndentation(field.options || [])"
          :label="field.option_source?.label_field || 'label'"
          :multiple="field.multiple"
          :selectable="(option: any) => !option.disabled"
          :reduce="
            (option: any) => {
              if (!option) return null;
              if (
                field.option_source?.value_field &&
                option[field.option_source.value_field]
              ) {
                return option[field.option_source.value_field];
              }
              return option.value || option.id || null;
            }
          "
          :placeholder="field.placeholder || 'Select...'"
          :no-options-text="
            loadingSelect ? 'Loading...' : 'No options available'
          "
          :clearable="
            field.required && !field.rules?.required_if ? false : true
          "
          :disabled="isFieldDisabled(field)"
          @search="(searchTerm: string) => setSelected(field, searchTerm)"
          @update:model-value="(value: unknown) => handleSelected(value, field)"
          @option:selected="(value: unknown) => handleSelected(value, field)"
        >
          <template #open-indicator="{ attributes }">
            <span v-if="field.search" v-bind="attributes">
              <Search class="w-4 h-4" />
            </span>
            <span v-else v-bind="attributes">
              <ChevronDown class="w-4 h-4" />
            </span>
          </template>
        </VueSelect>

        <!-- 🔹 SELECT -->
        <InfiniteScrollSelect
          v-else-if="
            field.type === 'select' && field.option_source?.type === 'reference'
          "
          v-model="field.value as any"
          :class="{
            'vue-select-standard is-enabled premium-focus':
              !isFieldDisabled(field),
            'vue-select-standard is-disabled': isFieldDisabled(field),
          }"
          :options="field.options"
          :label="field.option_source?.label_field || 'label'"
          :multiple="field.multiple"
          :disabled="isFieldDisabled(field)"
          :has-more="field.pagination?.hasMore"
          :loading="loading || loadingSelect"
          :clearable="
            field.required && !field.rules?.required_if ? false : true
          "
          :searchable="field.option_source?.search_field == null"
          :input-free="field.open_text"
          :reduce="
            (option: any) => {
              if (!option) return null;
              if (typeof option === 'string') return option;
              if (
                field.option_source?.value_field &&
                option[field.option_source.value_field]
              ) {
                return option[field.option_source.value_field];
              }
              return option.value || option.id || null;
            }
          "
          :placeholder="field.placeholder || 'Select...'"
          :no-options-text="
            loadingSelect ? 'Loading...' : 'No options available'
          "
          @search="
            (searchTerm: string) => {
              field.searchActive = !!searchTerm;
              setSelected(field, searchTerm);
            }
          "
          @update:model-value="(value: unknown) => handleSelected(value, field)"
          @option:selected="(value: unknown) => handleSelected(value, field)"
          @scrolling="getMoreDataScroll(field)"
        />

        <VueSelect
          v-else-if="field.type === 'select'"
          v-model="field.value"
          :class="{
            'vue-select-standard is-enabled premium-focus':
              !isFieldDisabled(field),
            'vue-select-standard is-disabled': isFieldDisabled(field),
          }"
          :options="field.options"
          :label="field.option_source?.label_field || 'label'"
          :multiple="field.multiple"
          :disabled="isFieldDisabled(field)"
          :clearable="
            field.required && !field.rules?.required_if ? false : true
          "
          :reduce="
            (option: any) => {
              if (!option) return null;
              if (
                field.option_source?.value_field &&
                option[field.option_source.value_field]
              ) {
                return option[field.option_source.value_field];
              }
              return option.value || option.id || null;
            }
          "
          :placeholder="field.placeholder || 'Select...'"
          :no-options-text="
            loadingSelect ? 'Loading...' : 'No options available'
          "
          @search="(searchTerm: string) => setSelected(field, searchTerm)"
          @update:model-value="(value: unknown) => handleSelected(value, field)"
          @option:selected="(value: unknown) => handleSelected(value, field)"
        >
          <template #open-indicator="{ attributes }">
            <span v-if="field.search" v-bind="attributes">
              <Search class="w-4 h-4" />
            </span>
            <span v-else v-bind="attributes">
              <ChevronDown class="w-4 h-4" />
            </span>
          </template>
        </VueSelect>

        <!-- Select-List -->
        <SelectListField
          v-else-if="field.type === 'select_list'"
          v-model="selectedItems[field.key || '']"
          :field="field"
          :loading-select="loadingSelect"
          @search="(searchTerm: string) => setSelected(field, searchTerm)"
          @update:field-value="(value: any) => (field.value = value)"
        />

        <!-- 🔹 DATE -->
        <DatePicker
          v-else-if="field.type === 'date'"
          v-model="field.value as any"
          show-icon
          fluid
          icon-display="input"
          date-format="mm/dd/yy"
          :min-date="getMinDate(field) ?? undefined"
          :max-date="getMaxDate(field) ?? undefined"
          :disabled="isFieldDisabled(field)"
          class="w-full"
          :input-class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
        />

        <!-- Time -->
        <DatePicker
          v-else-if="field.type === 'time'"
          v-model="field.value as any"
          time-only
          hour-format="12"
          fluid
          icon-display="input"
          :disabled="isFieldDisabled(field)"
          class="w-full"
          :input-class="{
            'input-base is-enabled premium-focus': !isFieldDisabled(field),
            'input-base is-disabled opacity-60': isFieldDisabled(field),
          }"
        />

        <!-- 🔹 CHECKBOX -->
        <Checkbox
          v-else-if="field.type === 'checkbox'"
          v-model="field.value"
          fluid
          :disabled="isFieldDisabled(field)"
          :binary="true"
        />

        <Transition name="fade-error">
          <span
            v-if="errors[0]"
            class="text-error text-xs italic"
            aria-live="polite"
          >
            {{ errors[0] }}
          </span>
        </Transition>
      </Field>

      <!--divider_with_components para foem adentro del modal -->
      <FormDividerWithComponents
        v-if="field.type === 'divider_with_components'"
        :field="field"
      />
    </div>
  </TransitionGroup>

  <!--vital signs history -->
  <VitalSignsHistory v-if="SelectedDocumentId === 'vital_signs_single_entry'" />
</template>

<style scoped>
/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.list-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Error transition */
.fade-error-enter-active,
.fade-error-leave-active {
  transition: all 0.2s ease;
}
.fade-error-enter-from,
.fade-error-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}

/* Premium focus effect */
.premium-focus {
  transition: all 0.3s border;
}

.premium-focus:focus-within {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  transform: translateY(-1px);
}

:deep(.vs__dropdown-toggle) {
  transition: all 0.3s ease;
}

:deep(.vs--open .vs__dropdown-toggle) {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
```
