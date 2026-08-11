<script setup lang="ts">
/**
 * SelectableListWithTable Component
 *
 * A reusable component for selecting items from a dropdown and displaying
 * them in a table with remove functionality. Used for Providers and
 * Referring Physicians sections.
 *
 * @example
 * <SelectableListWithTable
 *   label="Providers"
 *   :required="true"
 *   name="providers"
 *   :selected-items="selectedProvider"
 *   :badge-state="getProvidersBadgeState(errors)"
 *   :columns="[
 *     { key: 'name', label: 'Name', getValue: (item) => item.name || item.full_name },
 *     { key: 'specialty', label: 'Specialty' }
 *   ]"
 *   @remove="removeProvider"
 * >
 *   <template #selector>
 *     <VueSelect ... />
 *   </template>
 * </SelectableListWithTable>
 */
import { computed } from "vue";
import { Field } from "vee-validate";
import { X } from "@lucide/vue";
import RequiredLabel from "@/components/base/RequiredLabel.vue";
import UiBadge from "@/components/_primitives/UiBadge.vue";

type ColumnDefinition = {
  key: string;
  label: string;
  getValue?: (item: any) => string;
};

interface BadgeState {
  class?: string;
  severity?: string;
}

// Props del componente
interface Props {
  /** Label for the field */
  label: string;
  /** Whether this field is required */
  required?: boolean;
  /** Field name for vee-validate */
  name: string;
  /** Array of selected items */

  selectedItems: any[];
  /** Badge state object with class and severity */
  badgeState?: BadgeState;
  /**
   * Column definitions for the table
   * Each column: { key: string, label: string, getValue?: (item) => string }
   */
  columns: ColumnDefinition[];
  /** Validation rules for the field */
  rules?: string;
  /** Bottom margin class */
  marginClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  badgeState: () => ({ class: "count-badge", severity: "secondary" }),
  marginClass: "mb-8",
});

const emit = defineEmits(["remove"]);

// Calculate grid columns based on number of columns + action column
const baseColCount = computed((): number => props.columns.length + 1); // +1 for No. column
const headerGridClass = computed((): string => {
  const cols: number = baseColCount.value + 1;

  return `grid-cols-${cols}`;
});
const rowGridClass = computed((): string => {
  const cols: number = baseColCount.value + 1;

  return `grid grid-cols-${cols}`;
});

// Get value from item using column definition
const getCellValue = (
  item: any,
  column: ColumnDefinition
): string => {
  if (column.getValue) {
    return column.getValue(item);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (item as unknown as Record<string, any>)[column.key] || "";
};
</script>

<template>
  <div :class="marginClass">
    <!-- Header with label and badge -->
    <div class="flex items-center gap-2 mb-4">
      <RequiredLabel :label="label" :required="required" />
      <Badge
        :value="selectedItems.length"
        :class="badgeState.class"
        :severity="badgeState.severity"
      />
    </div>

    <!-- Selector slot -->
    <div class="mb-4">
      <slot name="selector" />
    </div>

    <!-- Table with selected items -->
    <Field
      v-slot="{ errors }"
      :name="name"
      :model-value="selectedItems"
      :rules="rules"
    >
      <div class="table-background">
        <!-- Table header -->
        <div class="table-format" :class="headerGridClass">
          <span>No.</span>
          <span v-for="column in columns" :key="column.key">
            {{ column.label }}
          </span>
          <span class="text-center">Action</span>
        </div>

        <!-- Table body -->
        <div>
          <div
            v-for="(item, index) in selectedItems"
            :key="index"
            class="data-table-separation"
            :class="rowGridClass"
          >
            <div class="text-sm">{{ index + 1 }}</div>
            <div v-for="column in columns" :key="column.key" class="text-sm">
              {{ getCellValue(item, column) }}
            </div>
            <div class="flex justify-center">
              <button
                class="btn-delete h-6"
                type="button"
                :aria-label="`Remove item ${index + 1}`"
                @click="emit('remove', item)"
              >
                <X class="w-4 h-4 text-error" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <span class="text-error" aria-live="polite">{{ errors[0] }}</span>
    </Field>
  </div>
</template>

