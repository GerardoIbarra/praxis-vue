<script setup lang="ts">
import { ref, watch } from "vue";
import type { FormSchemaField } from "@/types/api/common";
import { X } from "@lucide/vue";
import PraxisInfiniteScrollSelect from "@/components/forms/PraxisInfiniteScrollSelect.vue";

const props = defineProps<{
  field: FormSchemaField;
  loadingSelect?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: any[];
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "update:modelValue", value: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "update:fieldValue", value: any[]): void;
  (e: "search", searchTerm: string): void;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tempSelection = ref<any>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedItems = ref<any[]>([...(props.modelValue || [])]);

// Sincronizar con el modelValue externo
watch(
  () => props.modelValue,
  (newValue) => {
    selectedItems.value = [...(newValue || [])];
  }
);

// Sincronizar con selected_options del field (backend)
watch(
  () => props.field.selected_options,
  (newOptions) => {
    if (newOptions && newOptions.length > 0) {
      const valueField = props.field.option_source?.value_field || "id";
      let hasChanges = false;

      newOptions.forEach((opt) => {
        const isDuplicate = selectedItems.value.some(
          (item) =>
            (item as unknown as Record<string, unknown>)[valueField] ===
            (opt as unknown as Record<string, unknown>)[valueField]
        );

        if (!isDuplicate) {
          selectedItems.value.push(opt);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        const updatedValues = selectedItems.value.map(
          (item) => (item as unknown as Record<string, unknown>)[valueField]
        );
        emit("update:fieldValue", updatedValues);
        emit("update:modelValue", selectedItems.value);
      }
    }
  },
  { immediate: true }
);

const addItemToList = () => {
  if (!tempSelection.value) return;

  // Buscar el objeto completo en las opciones
  const valueField = props.field.option_source?.value_field || "id";
  const fullItem = (props.field.options || []).find((opt: unknown) => {
    return (opt as Record<string, unknown>)[valueField] === tempSelection.value;
  });

  if (!fullItem) return;

  // Verificar que no esté duplicado
  const isDuplicate = selectedItems.value.some(
    (item) =>
      (item as unknown as Record<string, unknown>)[valueField] ===
      (fullItem as unknown as Record<string, unknown>)[valueField]
  );

  if (!isDuplicate) {
    selectedItems.value.push(fullItem);
    // Emitir el valor actualizado
    const updatedValues = selectedItems.value.map(
      (item) => (item as unknown as Record<string, unknown>)[valueField]
    );
    emit("update:fieldValue", updatedValues);
    emit("update:modelValue", selectedItems.value);
  }

  // Limpiar selección temporal
  tempSelection.value = null;
};

// Función para eliminar un item de la lista
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeItemFromList = (item: any) => {
  const valueField = props.field.option_source?.value_field || "id";
  selectedItems.value = selectedItems.value.filter(
    (i) => i[valueField] !== item[valueField]
  );

  // Emitir el valor actualizado
  const updatedValues = selectedItems.value.map((item) => item[valueField]);
  emit("update:fieldValue", updatedValues);
  emit("update:modelValue", selectedItems.value);
};

// Emitir evento de búsqueda
const handleSearch = (searchTerm: string) => {
  emit("search", searchTerm);
};

// Función para verificar si una opción ya está seleccionada
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOptionSelectable = (option: any) => {
  const valueField = props.field.option_source?.value_field || "id";
  return !selectedItems.value.some(
    (item) => item[valueField] === option[valueField]
  );
};
</script>

<template>
  <div class="space-y-4">
    <!-- VueSelect para agregar items -->
    <div class="flex gap-2">
      <div class="flex-1 group transition-all duration-300">
        <PraxisInfiniteScrollSelect
          v-model="tempSelection"
          :options="field.options"
          :label="field.option_source?.label_field || 'label'"
          :selectable="isOptionSelectable"
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
          :placeholder="field.placeholder || 'Search to add...'"
          :filterable="true"
          :searchable="true"
          :has-more="field.pagination?.hasMore || false"
          :loading="props.loadingSelect"
          class="vue-select-standard text-gray-400 is-enabled flex-1"
          @search="handleSearch"
          @update:model-value="addItemToList"
          @scrolling="emit('scroll-bottom', field)"
        />
      </div>
    </div>

    <!-- Tabla de elementos seleccionados (AFUERA del flex para que se vea debajo) -->
    <div class="table-background mt-4">
      <div
        class="grid items-center font-semibold text-gray-600 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-600 px-2"
        :class="
          selectedItems.length > 1
            ? 'grid-cols-[2rem_1fr_3rem]'
            : 'grid-cols-[2rem_1fr]'
        "
      >
        <span>No.</span>
        <span>Name</span>
        <span v-if="selectedItems.length > 1" class="text-center">Action</span>
      </div>
      <div>
        <div
          v-for="(item, index) in selectedItems"
          :key="item[field.option_source?.value_field || 'id'] || index"
          class="grid items-center py-2 border-b border-gray-100 dark:border-gray-600 last:border-b-0 px-2 hover:bg-gray-50/5 dark:hover:bg-white/5 transition-colors grid-cols-[2rem_1fr_3rem]"
        >
          <div class="text-xs text-gray-500">{{ index + 1 }}</div>
          <div
            class="text-sm font-medium truncate pr-4 text-gray-800 dark:text-gray-200"
          >
            {{
              item[field.option_source?.label_field || "name"] ||
              item.name ||
              item.label
            }}
          </div>
          <div class="flex justify-center">
            <button
              class="btn-delete"
              type="button"
              :aria-label="`Remove item ${index + 1}`"
              @click.stop="removeItemFromList(item)"
            >
              <X class="w-4 h-4 text-error" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


/* Increase dropdown list height to show more options */
:deep(.vs__dropdown-menu) {
  max-height: 13rem;
  min-height: 6rem;
  overflow-y: auto;
}

/* Ensure dropdown items have proper padding */
:deep(.vs__dropdown-option) {
  padding: 0.5rem 0.75rem;
}
</style>

