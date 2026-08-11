<script setup lang="ts">
import { ChevronRight, ChevronDown } from "@lucide/vue";
import { type Ref, ref, onMounted, onUnmounted, computed, toRefs } from "vue";
import UiCheckbox from "@/components/_primitives/UiCheckbox.vue";

interface ColumnDef {
  field: string;
  header: string;
  sortable?: boolean;
  slotName?: string;
  frozen?: boolean;
  alignFrozen?: "left" | "right";
  style?: string | Record<string, string>;
  [key: string]: unknown;
}

interface Props {
  items?: Record<string, unknown>[];
  loading?: boolean;
  columns?: ColumnDef[];
  rows?: number;
  rowsPerPageOptions?: number[];
  enableRowDblClick?: boolean;
  selectionMode?: "single" | "multiple";
  selectedItems?: Record<string, unknown>[];
  stripedRows?: boolean;
  emptyMessage?: string;
  searchEmptyMessage?: string;
  isSearching?: boolean;
  rowGroupMode?: "subheader" | "rowspan";
  groupRowsBy?: string | string[];
  sortMode?: "single" | "multiple";
  sortField?: string;
  sortOrder?: number;
  expanderCondition?: (row: Record<string, unknown>) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: false,
  columns: () => [],
  rows: 10,
  rowsPerPageOptions: () => [10, 20, 50],
  enableRowDblClick: false,
  selectionMode: undefined,
  selectedItems: () => [],
  stripedRows: false,
  emptyMessage: "No data available",
  searchEmptyMessage: "No results found",
  isSearching: false,
  rowGroupMode: undefined,
  groupRowsBy: undefined,
  sortMode: undefined,
  sortField: undefined,
  sortOrder: undefined,
  expanderCondition: undefined,
});

const emit = defineEmits<{
  (e: "row-click", data: unknown): void;
  (e: "row-dblclick", data: unknown): void;
  (e: "selection-change", value: unknown): void;
}>();

const { items, loading, columns } = toRefs(props);

// Selection Handling
const selection = computed({
  get() {
    return props.selectedItems;
  },
  set(value) {
    emit("selection-change", value);
  },
});

const isSelected = (row: Record<string, unknown>) => {
  return selection.value.some((item) => item.id === row.id);
};

const toggleSelection = (row: Record<string, unknown>) => {
  if (props.selectionMode === "multiple") {
    const isSel = isSelected(row);
    if (isSel) {
      selection.value = selection.value.filter((i) => i.id !== row.id);
    } else {
      selection.value = [...selection.value, row];
    }
  } else if (props.selectionMode === "single") {
    selection.value = [row];
  }
};

const selectAll = (checked: boolean) => {
  if (checked) {
    selection.value = [...props.items];
  } else {
    selection.value = [];
  }
};

const allSelected = computed(() => {
  if (!props.items.length) return false;
  return props.items.every((row) => isSelected(row));
});

// Click Handling
let clickTimeout: ReturnType<typeof setTimeout> | null = null;
let lastClickedRow: unknown = null;

const handleRowClick = (currentRow: unknown): void => {
  if (lastClickedRow === currentRow && clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    lastClickedRow = null;
    emit("row-dblclick", currentRow);
  } else {
    lastClickedRow = currentRow;
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
      lastClickedRow = null;
      emit("row-click", currentRow);
    }, 300);
  }
};

const handleCellDblClick = (data: unknown): void => {
  if (props.enableRowDblClick) {
    emit("row-dblclick", data);
  }
};

// Expansion Handling
const expandedRows = ref<Record<string, boolean>>({});

const toggleExpansion = (data: Record<string, unknown>): void => {
  const key = data.id as string;
  expandedRows.value[key] = !expandedRows.value[key];
};

const isExpanded = (data: Record<string, unknown>): boolean => {
  const key = data.id as string;
  return !!expandedRows.value[key];
};

defineExpose({
  exportCSV: () => {
    // Placeholder for CSV export
    console.warn("CSV export not implemented in native table");
  },
});
</script>

<template>
  <div class="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
        <tr>
          <!-- Selection Column -->
          <th v-if="selectionMode === 'multiple'" class="p-4 w-4">
            <UiCheckbox
              :model-value="allSelected"
              @update:model-value="selectAll"
              :binary="true"
            />
          </th>
          <th v-else-if="selectionMode === 'single'" class="p-4 w-4"></th>
          
          <!-- Expander Column -->
          <th v-if="$slots.expansion" class="p-4 w-4"></th>

          <!-- Data Columns -->
          <th
            v-for="(col, index) in columns"
            :key="index"
            class="px-6 py-3 font-semibold"
            :style="col.style"
          >
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="columns.length + (selectionMode ? 1 : 0) + ($slots.expansion ? 1 : 0)" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-p-secondary mx-auto"></div>
            </td>
          </tr>
        </template>
        
        <template v-else-if="!items.length">
          <tr>
            <td :colspan="columns.length + (selectionMode ? 1 : 0) + ($slots.expansion ? 1 : 0)" class="text-center py-8">
              <p class="empty-state-message">
                {{ isSearching ? searchEmptyMessage : emptyMessage }}
              </p>
            </td>
          </tr>
        </template>

        <template v-else>
          <template v-for="(row, rowIndex) in items" :key="row.id || rowIndex">
            <tr
              class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              :class="{ 'bg-gray-50 dark:bg-gray-800': stripedRows && rowIndex % 2 !== 0 }"
              @click="handleRowClick(row)"
            >
              <!-- Selection Cell -->
              <td v-if="selectionMode" class="p-4" @click.stop="toggleSelection(row)">
                <UiCheckbox
                  v-if="selectionMode === 'multiple'"
                  :model-value="isSelected(row)"
                  :binary="true"
                  class="pointer-events-none"
                />
                <input
                  v-else
                  type="radio"
                  :checked="isSelected(row)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
              </td>

              <!-- Expander Cell -->
              <td v-if="$slots.expansion" class="p-4" @click.stop="toggleExpansion(row)">
                <button
                  v-if="!expanderCondition || expanderCondition(row)"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <ChevronDown
                    v-if="isExpanded(row)"
                    class="w-4 h-4"
                  />
                  <ChevronRight
                    v-else
                    class="w-4 h-4"
                  />
                </button>
              </td>

              <!-- Data Cells -->
              <td
                v-for="(col, colIndex) in columns"
                :key="colIndex"
                class="px-6 py-4"
                @dblclick="handleCellDblClick(row)"
              >
                <slot v-if="col.slotName" :name="col.slotName" :data="row" />
                <span v-else>{{ row[col.field] }}</span>
              </td>
            </tr>

            <!-- Expansion Row -->
            <tr v-if="$slots.expansion && isExpanded(row)">
              <td :colspan="columns.length + (selectionMode ? 1 : 0) + 1" class="p-0 border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <slot name="expansion" :data="row" />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>
