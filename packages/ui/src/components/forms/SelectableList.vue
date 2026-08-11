<script setup lang="ts">
import { computed, ref, watch } from "vue";
import VueSelect from "vue-select";
import { Search, X } from "@lucide/vue";
import InfiniteScrollSelect from "@/components/forms/InfiniteScrollSelect.vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";

// Tipo genérico para items (Record con cualquier propiedad)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectableItem = Record<string, any>;

// Interface para campos adicionales
interface AdditionalField {
  field: string;
  label: string;
  type?: "text" | "select" | "input";
  optionsField?: string;
  labelField?: string;
  placeholder?: string;
  multiple?: boolean;
}

// Props del componente
interface Props {
  options: SelectableItem[] | any[];
  selectedItems: SelectableItem[];
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  labelField?: keyof SelectableItem;
  valueField?: string;
  showColorPicker?: boolean;
  colorField?: string;
  columns?: string[];
  additionalFields?: AdditionalField[];
  disabled?: boolean;
  selectWidth?: string;
  maxHeight?: string;
  showCustomOptionTemplate?: boolean;
  showSelected?: boolean;
  loading?: boolean;
  showButtonDelete?: boolean;
  hideLabelColumn?: boolean;
  isInfinity?: boolean;
  loadMoreScroll?: () => Promise<void>;
  hasMore?: boolean;
  loadingScroll?: boolean;
  searchFunction?: (query: string) => Promise<void> | void;
  nonRemovableField?: string;
  nonRemovableValue?: string | number | null;
  showAvatar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isRequired: false,
  placeholder: "Choose item",
  labelField: "name",
  valueField: "id",
  showColorPicker: false,
  colorField: "color",
  columns: () => [],
  additionalFields: () => [],
  disabled: false,
  selectWidth: "w-[400px]",
  maxHeight: undefined,
  showCustomOptionTemplate: false,
  showSelected: true,
  loading: false,
  showButtonDelete: true,
  hideLabelColumn: false,
  isInfinity: false,
  hasMore: false,
  loadingScroll: false,
  loadMoreScroll: undefined,
  searchFunction: undefined,
  nonRemovableField: undefined,
  nonRemovableValue: undefined,
  showAvatar: false,
});

// Eventos emitidos
const emit = defineEmits<{
  "update:selectedItems": [items: SelectableItem[]];
  "add-item": [item: SelectableItem];
  "remove-item": [item: SelectableItem];
  search: [query: string];
}>();

const selectedItemID = ref<string>("");
const vueSelectRef = ref<InstanceType<typeof VueSelect> | null>(null);

// Cabeceras derivadas de qué celdas se renderizan realmente por fila
// (showColorPicker / hideLabelColumn / additionalFields / showButtonDelete),
// para que el grid del header nunca se desalinee con el de las filas.
// Si `columns` trae exactamente esa misma cantidad de labels, se respeta
// como override; si no, se ignora y se usan las labels por defecto.
const defaultColumnLabels = computed<string[]>(() => {
  const labels: string[] = [];
  if (props.showColorPicker) labels.push("Color");
  if (!props.hideLabelColumn) labels.push("Name");
  labels.push(...props.additionalFields.map((f) => f.label));
  if (props.showButtonDelete) labels.push("Actions");
  return labels;
});

const effectiveColumns = computed<string[]>(() =>
  props.columns.length === defaultColumnLabels.value.length
    ? props.columns
    : defaultColumnLabels.value
);

// Función para verificar si un item ya está seleccionado
const isItemSelected = (option: SelectableItem | null | unknown): boolean => {
  if (!option) return false;
  const opt = option as Record<string, unknown>;

  return props.selectedItems.some((i) => {
    const item = i as Record<string, unknown>;
    const valueField = props.valueField;
    const labelField = props.labelField as string;

    // Comparar por user_id si está disponible, ya que los usuarios se pueden representar
    // con su id directo (cuando son cargados en el template) o con user_id (cuando vienen de la lista de staff)
    const itemId = item.user_id || item[valueField];
    const optId = opt.user_id || opt[valueField];

    if (itemId && optId) {
      return itemId === optId;
    }

    // Comparar por ID si ambos tienen el campo valueField
    if (item[valueField] && opt[valueField]) {
      return item[valueField] === opt[valueField];
    }

    // Comparar por labelField si no tienen valueField
    if (item[labelField] && opt[labelField]) {
      return item[labelField] === opt[labelField];
    }

    // Comparar objetos completos como fallback
    return JSON.stringify(item) === JSON.stringify(opt);
  });
};

// Watcher para resetear el selector cuando cambian los items seleccionados
watch(
  () => props.selectedItems.length,
  () => {
    selectedItemID.value = "";
    if (vueSelectRef.value) {
      (vueSelectRef.value as unknown as { search: string }).search = "";
    }
  }
);

// Función para agregar un item
const addItem = (newItem: SelectableItem | null): void => {
  if (newItem && !isItemSelected(newItem)) {
    const updatedItems = [...props.selectedItems, newItem];
    emit("update:selectedItems", updatedItems);
    emit("add-item", newItem);
  }
};

// Función para remover un item
const removeItem = (itemToRemove: SelectableItem): void => {
  const updatedItems = props.selectedItems.filter((item) => {
    const itemId = item.user_id || item[props.valueField];
    const itemToRemoveId =
      itemToRemove.user_id || itemToRemove[props.valueField];

    if (itemId && itemToRemoveId) {
      return itemId !== itemToRemoveId;
    }

    // Comparar por ID si ambos tienen el campo valueField
    if (item[props.valueField] && itemToRemove[props.valueField]) {
      const shouldKeep =
        item[props.valueField] !== itemToRemove[props.valueField];

      return shouldKeep;
    }

    // Comparar por labelField si no tienen valueField
    if (item[props.labelField] && itemToRemove[props.labelField]) {
      return item[props.labelField] !== itemToRemove[props.labelField];
    }

    // Comparar objetos completos como fallback
    return JSON.stringify(item) !== JSON.stringify(itemToRemove);
  });

  emit("update:selectedItems", updatedItems);
  emit("remove-item", itemToRemove);
};

// Función para actualizar el color de un item
const updateItemColor = (item: SelectableItem, newColor: string): void => {
  const updatedItems = props.selectedItems.map((selectedItem) => {
    if (selectedItem[props.valueField] === item[props.valueField]) {
      return { ...selectedItem, [props.colorField]: newColor };
    }
    return selectedItem;
  });
  emit("update:selectedItems", updatedItems);
};

const getLabel = (item: SelectableItem): string => {
  const field = props.labelField as string;
  const itemRecord = item as Record<string, unknown>;
  return String(
    itemRecord[field] ||
      itemRecord["full_name"] ||
      itemRecord["name"] ||
      itemRecord["label"] ||
      ""
  );
};

const getFieldValue = (item: SelectableItem, fieldStr: string): unknown => {
  if (!fieldStr) return "";
  const fields = fieldStr.split("||").map((f) => f.trim());
  const itemRecord = item as Record<string, unknown>;
  for (const f of fields) {
    if (
      itemRecord[f] !== undefined &&
      itemRecord[f] !== null &&
      itemRecord[f] !== ""
    ) {
      return itemRecord[f];
    }
  }
  return "";
};
</script>

<template>
  <div>
    <div class="border-b border-gray-900/10 dark:border-gray-400/10 py-1 px-4">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h2 class="h2-semibold">
          {{ title }}
          <span v-if="isRequired" class="text-error ml-1">*</span>
        </h2>
        <div v-if="isInfinity">
          <InfiniteScrollSelect
            v-model="selectedItemID"
            :options="options"
            :label="labelField"
            :filterable="true"
            :searchable="true"
            :placeholder="placeholder"
            :disabled="disabled"
            :custom-class="[
              selectWidth,
              'border border-gray-300 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-secondary',
              disabled ? 'is-disabled' : '',
            ]"
            :selectable="(option) => !isItemSelected(option)"
            :has-more="hasMore"
            :loading="loadingScroll"
            :show-avatar="showAvatar"
            @search="searchFunction"
            @update:model-value="addItem($event as SelectableItem)"
            @scrolling="loadMoreScroll"
          >
            <template v-if="!showAvatar" #option="option">
              <slot name="option-template" v-bind="option" :option="option">
                <div v-if="showCustomOptionTemplate">
                  <div class="flex items-center justify-between">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ (option as any)[labelField] || (option as any).name }}
                    </p>
                    <p
                      v-if="(option as any).description"
                      class="text-xs text-gray-500 dark:text-gray-400"
                    >
                      {{ (option as any).description }}
                    </p>
                  </div>
                </div>
                <div v-else class="text-gray-900 dark:text-white">
                  {{
                    (option as any)[labelField] ||
                    (option as any).name ||
                    (option as any).label
                  }}
                </div>
              </slot>
            </template>
          </InfiniteScrollSelect>
        </div>
        <div v-else>
          <VueSelect
            v-if="showSelected"
            :key="`select-${selectedItems.length}`"
            ref="vueSelectRef"
            v-model="selectedItemID"
            :options="options"
            :placeholder="placeholder"
            :label="labelField"
            :selectable="
              (option: SelectableItem) =>
                !isItemSelected(option) && !option.disabled
            "
            :disabled="disabled"
            :class="[
              selectWidth,
              'border border-gray-300 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-secondary',
              disabled ? 'is-disabled' : '',
            ]"
            :loading="loading"
            @update:model-value="addItem($event)"
            @search="(query: string) => emit('search', query)"
          >
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes">
                <Search class="w-4 h-4" />
              </span>
            </template>

            <template #option="option">
              <div v-if="showColorPicker" class="flex items-center">
                <div 
                  class="w-4 h-4 rounded border border-gray-300 shrink-0" 
                  :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
                ></div>
                <span class="ml-4">{{
                  option[labelField] || option.name
                }}</span>
              </div>
              <div v-else-if="showCustomOptionTemplate">
                <slot name="option-template" :option="option">
                  <div class="flex items-center justify-between">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ option[labelField] || option.name }}
                    </p>
                    <p
                      v-if="option.description"
                      class="text-xs text-gray-500 dark:text-gray-400"
                    >
                      {{ option.description }}
                    </p>
                  </div>
                </slot>
              </div>
              <div v-else>
                {{ option[labelField] || option.name || option.label }}
              </div>
            </template>

            <template v-if="showColorPicker" #selected-option="{ name, color }">
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded border border-gray-300 shrink-0" 
                  :style="{ backgroundColor: color?.startsWith('#') ? color : '#' + color }"
                ></div>
                <span class="ml-2">{{ name }}</span>
              </div>
            </template>
          </VueSelect>
        </div>
      </div>
    </div>

    <div class="overflow-y-auto" :style="maxHeight ? { maxHeight } : {}">
      <!-- Header de la tabla -->
      <div
        v-if="selectedItems.length >= 1"
        class="grid items-center bg-gray-400 text-white font-semibold px-4 py-2 rounded-t-md"
        :class="`grid-cols-${columns.length}`"
      >
        <div
          v-for="column in columns"
          :key="column"
          class="flex justify-center items-center"
        >
          {{ column }}
        </div>
      </div>

      <!-- Filas de items -->
      <div
        v-for="(item, index) in selectedItems"
        :key="index"
        class="grid items-center gap-4 border-b border-gray-900/10 dark:border-border-light px-4 py-2"
        :class="`grid-cols-${columns.length}`"
      >
        <!-- Color (si está habilitado) -->
        <div v-if="showColorPicker" class="flex justify-center items-center">
          <span v-if="item[colorField]">
            <input
              type="color"
              :value="item[colorField]?.startsWith('#') ? item[colorField] : '#' + item[colorField]"
              disabled
              class="w-6 h-6 p-0 border-0 rounded cursor-not-allowed opacity-70"
              @change="(e) => updateItemColor(item, (e.target as HTMLInputElement).value)"
            />
          </span>
          <span v-else>No Color</span>
        </div>

        <!-- Nombre/Label -->
        <div
          v-if="!hideLabelColumn"
          class="flex justify-center items-center overflow-hidden gap-2"
        >
          <BaseAvatar
            v-if="showAvatar"
            :name="getLabel(item)"
            size="w-6 h-6"
            text-class="text-[10px] font-semibold"
            class="shrink-0"
          />
          <span class="truncate max-w-full" :title="getLabel(item)">
            {{
              getLabel(item).length > 50
                ? getLabel(item).substring(0, 50) + "..."
                : getLabel(item)
            }}
          </span>
        </div>

        <!-- Campos adicionales -->
        <div
          v-for="additionalField in additionalFields"
          :key="additionalField.field"
          class="flex justify-center items-center px-2 relative focus-within:z-50"
        >
          <template v-if="additionalField.type === 'select'">
            <VueSelect
              v-model="item[additionalField.field]"
              :options="
                (item[additionalField.optionsField || ''] as any[]) || []
              "
              :label="additionalField.labelField || 'label'"
              :reduce="(opt: any) => opt.value || opt.id || opt"
              :selectable="
                (option: any) => {
                  const selectedArr =
                    (item[additionalField.field] as any[]) || [];
                  const optVal = option.value || option.id || option;
                  return !selectedArr.includes(optVal) && !option.disabled;
                }
              "
              :placeholder="additionalField.placeholder || 'Select...'"
              :multiple="additionalField.multiple !== false"
              class="vue-select-standard w-full min-w-50 dark:bg-secondary"
              :disabled="disabled || (item as any).loadingModifiers"
              :loading="(item as any).loadingModifiers"
            >
              <template #selected-option="option">
                <span
                  class="text-xs font-semibold"
                  :title="option[additionalField.labelField || 'label']"
                >
                  {{
                    option.code || option[additionalField.labelField || "label"]
                  }}
                </span>
              </template>
            </VueSelect>
          </template>
          <template v-else>
            {{ getFieldValue(item, additionalField.field) || "N/A" }}
          </template>
        </div>

        <!-- Acciones -->
        <div v-if="showButtonDelete" class="flex justify-center items-center">
          <button
            v-if="
              !(
                nonRemovableField &&
                nonRemovableValue !== undefined &&
                nonRemovableValue !== null &&
                item[nonRemovableField] === nonRemovableValue
              )
            "
            type="button"
            class="p-1 bg-red-100 rounded-md hover:bg-red-200 cursor-pointer"
            :aria-label="`Remove ${getLabel(item)}`"
            :class="{ 'cursor-not-allowed opacity-50': disabled }"
            @click.stop.prevent="removeItem(item)"
          >
            <X class="w-5 h-5 text-error" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Mensaje cuando no hay items -->
      <div
        v-if="selectedItems.length === 0"
        class="p-4 text-center text-gray-500"
      >
        No items selected
      </div>
    </div>
  </div>
</template>

