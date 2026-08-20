<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PxSelect from "@/components/_primitives/PxSelect.vue";
import { Search, X } from "@lucide/vue";
import PxAsyncSelect from "@/components/forms/PxAsyncSelect.vue";
import PxAvatar from "@/components/base/PxAvatar.vue";
import type { FormSchemaField } from "@/types/api/common";

// Tipo genérico para items
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectableItem = Record<string, any>;

interface AdditionalField {
  field: string;
  label: string;
  type?: "text" | "select" | "input";
  optionsField?: string;
  labelField?: string;
  placeholder?: string;
  multiple?: boolean;
}

interface Props {
  // Configuración estándar
  options?: SelectableItem[] | any[];
  selectedItems?: SelectableItem[];
  title?: string;
  isRequired?: boolean;
  placeholder?: string;
  labelField?: keyof SelectableItem;
  valueField?: string;
  
  // Configuración desde esquema (opcional)
  field?: FormSchemaField;

  // Funciones y visualización avanzada
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
  options: () => [],
  selectedItems: () => [],
  title: "",
  isRequired: false,
  placeholder: "Choose item...",
  labelField: "name",
  valueField: "id",
  field: undefined,
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

const emit = defineEmits<{
  "update:selectedItems": [items: SelectableItem[]];
  "update:fieldValue": [values: any[]];
  "add-item": [item: SelectableItem];
  "remove-item": [item: SelectableItem];
  search: [query: string];
  "scroll-bottom": [field: FormSchemaField | undefined];
}>();

// Computadas para soportar tanto props directas como la prop `field`
const resolvedOptions = computed(() => {
  return props.field?.options || props.options;
});

const resolvedLabelField = computed(() => {
  return props.field?.option_source?.label_field || (props.labelField as string);
});

const resolvedValueField = computed(() => {
  return props.field?.option_source?.value_field || props.valueField;
});

const resolvedPlaceholder = computed(() => {
  return props.field?.placeholder || props.placeholder;
});

const resolvedIsInfinity = computed(() => {
  if (props.field?.pagination) return true;
  return props.isInfinity;
});

const resolvedHasMore = computed(() => {
  if (props.field?.pagination) return props.field.pagination.hasMore;
  return props.hasMore;
});

const internalSelectedItems = ref<SelectableItem[]>([...props.selectedItems]);

// Sincronizar desde `field.selected_options` (si se usa `field`)
watch(
  () => props.field?.selected_options,
  (newOptions) => {
    if (newOptions && newOptions.length > 0) {
      const vField = resolvedValueField.value;
      let hasChanges = false;

      newOptions.forEach((opt: any) => {
        const isDuplicate = internalSelectedItems.value.some(
          (item) => item[vField] === opt[vField]
        );
        if (!isDuplicate) {
          internalSelectedItems.value.push(opt);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        syncEmits();
      }
    }
  },
  { immediate: true }
);

// Sincronizar desde `selectedItems` (si se usa estándar)
watch(
  () => props.selectedItems,
  (newVal) => {
    internalSelectedItems.value = [...newVal];
  }
);

const selectedItemID = ref<string>("");
const pxSelectRef = ref<InstanceType<typeof PxSelect> | null>(null);

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

const isItemSelected = (option: SelectableItem | null | unknown): boolean => {
  if (!option) return false;
  const opt = option as Record<string, unknown>;
  const vField = resolvedValueField.value;
  const lField = resolvedLabelField.value;

  return internalSelectedItems.value.some((i) => {
    const item = i as Record<string, unknown>;

    const itemId = item.user_id || item[vField];
    const optId = opt.user_id || opt[vField];

    if (itemId && optId) return itemId === optId;
    if (item[vField] && opt[vField]) return item[vField] === opt[vField];
    if (item[lField] && opt[lField]) return item[lField] === opt[lField];

    return JSON.stringify(item) === JSON.stringify(opt);
  });
};

watch(
  () => internalSelectedItems.value.length,
  () => {
    selectedItemID.value = "";
    // We don't have direct access to search input in PxSelect without a method, 
    // but PxSelect clears its own search on selection if multiple=false or upon closing.
  }
);

const syncEmits = () => {
  const updatedItems = [...internalSelectedItems.value];
  emit("update:selectedItems", updatedItems);
  
  if (props.field) {
    const vField = resolvedValueField.value;
    const mappedValues = updatedItems.map((item) => item[vField]);
    emit("update:fieldValue", mappedValues);
  }
};

const addItem = (newItem: SelectableItem | null | string): void => {
  if (!newItem) return;

  // Si nos llega el ID (desde InfiniteScrollSelect), buscamos el objeto completo
  let fullItem = newItem as SelectableItem;
  if (typeof newItem === "string" || typeof newItem === "number") {
    const vField = resolvedValueField.value;
    fullItem = resolvedOptions.value.find((o: any) => o[vField] === newItem) as SelectableItem;
  }

  if (fullItem && !isItemSelected(fullItem)) {
    internalSelectedItems.value.push(fullItem);
    syncEmits();
    emit("add-item", fullItem);
  }
};

const removeItem = (itemToRemove: SelectableItem): void => {
  const vField = resolvedValueField.value;
  const lField = resolvedLabelField.value;

  internalSelectedItems.value = internalSelectedItems.value.filter((item) => {
    const itemId = item.user_id || item[vField];
    const itemToRemoveId = itemToRemove.user_id || itemToRemove[vField];

    if (itemId && itemToRemoveId) return itemId !== itemToRemoveId;
    if (item[vField] && itemToRemove[vField]) return item[vField] !== itemToRemove[vField];
    if (item[lField] && itemToRemove[lField]) return item[lField] !== itemToRemove[lField];
    return JSON.stringify(item) !== JSON.stringify(itemToRemove);
  });

  syncEmits();
  emit("remove-item", itemToRemove);
};

const updateItemColor = (item: SelectableItem, newColor: string): void => {
  const vField = resolvedValueField.value;
  internalSelectedItems.value = internalSelectedItems.value.map((selectedItem) => {
    if (selectedItem[vField] === item[vField]) {
      return { ...selectedItem, [props.colorField]: newColor };
    }
    return selectedItem;
  });
  syncEmits();
};

const getLabel = (item: SelectableItem): string => {
  const lField = resolvedLabelField.value;
  const itemRecord = item as Record<string, unknown>;
  return String(
    itemRecord[lField] ||
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
  <div class="flex flex-col gap-4">
    <div v-if="title" class="border-b border-gray-900/10 dark:border-gray-400/10 py-1 px-4">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h2 class="h2-semibold">
          {{ title }}
          <span v-if="isRequired" class="text-error ml-1">*</span>
        </h2>
      </div>
    </div>

    <!-- Dropdown Selector -->
    <div class="flex gap-2">
      <div class="flex-1 transition-all duration-300">
        <div v-if="resolvedIsInfinity">
          <PxAsyncSelect
            v-model="selectedItemID"
            :options="resolvedOptions"
            :label="resolvedLabelField"
            :filterable="true"
            :searchable="true"
            :placeholder="resolvedPlaceholder"
            :disabled="disabled"
            :custom-class="[
              selectWidth,
              'border border-gray-300 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-secondary w-full',
              disabled ? 'is-disabled' : '',
            ]"
            :selectable="(option) => !isItemSelected(option)"
            :has-more="resolvedHasMore"
            :loading="loadingScroll || loading"
            :show-avatar="showAvatar"
            @search="(query) => { searchFunction?.(query); emit('search', query); }"
            @update:model-value="addItem"
            @scrolling="() => { loadMoreScroll?.(); emit('scroll-bottom', field); }"
          >
            <template v-if="!showAvatar" #option="option">
              <slot name="option-template" v-bind="option" :option="option">
                <div v-if="showCustomOptionTemplate">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ (option as any)[resolvedLabelField] || (option as any).name }}
                    </p>
                    <p v-if="(option as any).description" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ (option as any).description }}
                    </p>
                  </div>
                </div>
                <div v-else class="text-gray-900 dark:text-white">
                  {{
                    (option as any)[resolvedLabelField] ||
                    (option as any).name ||
                    (option as any).label
                  }}
                </div>
              </slot>
            </template>
          </PxAsyncSelect>
        </div>
        <div v-else class="w-full">
          <PxSelect
            v-if="showSelected"
            :key="`select-${internalSelectedItems.length}`"
            ref="pxSelectRef"
            v-model="selectedItemID"
            :options="resolvedOptions"
            :placeholder="resolvedPlaceholder"
            :optionLabel="resolvedLabelField"
            :searchable="true"
            :disabled="disabled"
            :class="[
              selectWidth,
              'w-full',
              disabled ? 'is-disabled' : '',
            ]"
            @update:modelValue="addItem($event)"
            @search="(query: string) => emit('search', query)"
          >

            <template #option="option">
              <div v-if="showColorPicker" class="flex items-center">
                <div 
                  class="w-4 h-4 rounded border border-gray-300 shrink-0" 
                  :style="{ backgroundColor: option.color?.startsWith('#') ? option.color : '#' + option.color }"
                ></div>
                <span class="ml-4">{{ option[resolvedLabelField] || option.name }}</span>
              </div>
              <div v-else-if="showCustomOptionTemplate">
                <slot name="option-template" :option="option">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ option[resolvedLabelField] || option.name }}
                    </p>
                    <p v-if="option.description" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ option.description }}
                    </p>
                  </div>
                </slot>
              </div>
              <div v-else>
                {{ option[resolvedLabelField] || option.name || option.label }}
              </div>
            </template>

            <template v-if="showColorPicker" #selected-option="{ name, color }">
              <div class="flex items-center">
                <div class="w-4 h-4 rounded border border-gray-300 shrink-0" :style="{ backgroundColor: color?.startsWith('#') ? color : '#' + color }"></div>
                <span class="ml-2">{{ name }}</span>
              </div>
            </template>
          </PxSelect>
        </div>
      </div>
    </div>

    <!-- Tabla de items seleccionados -->
    <div class="table-background bg-gray-50/50 dark:bg-surface-800/50 rounded-lg overflow-y-auto" :style="maxHeight ? { maxHeight } : {}">
      <!-- Header de la tabla -->
      <div
        v-if="internalSelectedItems.length >= 1"
        class="grid items-center font-semibold text-gray-600 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700 px-4 pt-3 text-sm"
        :class="`grid-cols-${effectiveColumns.length}`"
      >
        <div v-for="column in effectiveColumns" :key="column" class="flex items-center" :class="{ 'justify-center': column === 'Actions' || column === 'Color' }">
          {{ column }}
        </div>
      </div>

      <!-- Filas de items -->
      <div
        v-for="(item, index) in internalSelectedItems"
        :key="index"
        class="grid items-center gap-4 border-b border-gray-100 dark:border-gray-700 px-4 py-3 text-sm transition-colors hover:bg-gray-100/50 dark:hover:bg-white/5"
        :class="`grid-cols-${effectiveColumns.length}`"
      >
        <!-- Color -->
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
        <div v-if="!hideLabelColumn" class="flex items-center overflow-hidden gap-3 font-medium text-gray-800 dark:text-gray-200">
          <PxAvatar v-if="showAvatar" :name="getLabel(item)" size="w-6 h-6" text-class="text-[10px] font-semibold" class="shrink-0" />
          <span class="truncate pr-4" :title="getLabel(item)">
            {{ getLabel(item).length > 50 ? getLabel(item).substring(0, 50) + "..." : getLabel(item) }}
          </span>
        </div>

        <!-- Campos adicionales -->
        <div v-for="additionalField in additionalFields" :key="additionalField.field" class="flex items-center px-2 relative focus-within:z-50">
          <template v-if="additionalField.type === 'select'">
            <PxSelect
              v-model="item[additionalField.field]"
              :options="(item[additionalField.optionsField || ''] as any[]) || []"
              :optionLabel="additionalField.labelField || 'label'"
              :optionValue="(opt: any) => opt.value || opt.id || opt"
              :placeholder="additionalField.placeholder || 'Select...'"
              :multiple="additionalField.multiple !== false"
              :searchable="true"
              class="w-full min-w-50 dark:bg-secondary"
              :disabled="disabled || (item as any).loadingModifiers"
            >
              <template #selected-option="option">
                <span class="text-xs font-semibold" :title="option[additionalField.labelField || 'label']">
                  {{ option.code || option[additionalField.labelField || "label"] }}
                </span>
              </template>
            </PxSelect>
          </template>
          <template v-else>
            <span class="text-gray-600 dark:text-gray-400">{{ getFieldValue(item, additionalField.field) || "N/A" }}</span>
          </template>
        </div>

        <!-- Acciones -->
        <div v-if="showButtonDelete" class="flex justify-center items-center">
          <button
            v-if="!(nonRemovableField && nonRemovableValue !== undefined && nonRemovableValue !== null && item[nonRemovableField] === nonRemovableValue)"
            type="button"
            class="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer transition-colors"
            :aria-label="`Remove ${getLabel(item)}`"
            :class="{ 'cursor-not-allowed opacity-50': disabled }"
            @click.stop.prevent="removeItem(item)"
          >
            <X class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="internalSelectedItems.length === 0" class="p-8 text-center text-gray-400 text-sm font-medium border-t border-gray-100 dark:border-gray-700">
        No items selected
      </div>
    </div>
  </div>
</template>
