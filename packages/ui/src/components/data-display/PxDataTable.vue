<script setup lang="ts">
import { ChevronRight, ChevronDown, ChevronUp, ChevronsUpDown, Inbox, Search, ChevronLeft, ChevronsLeft, ChevronsRight } from "@lucide/vue";
import { type Ref, ref, computed, toRefs, watch } from "vue";
import PxCheckbox from "@/components/_primitives/PxCheckbox.vue";

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
  paginated?: boolean;
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
  sortMode: "single",
  sortField: undefined,
  sortOrder: 1, // 1 for asc, -1 for desc
  expanderCondition: undefined,
  paginated: true,
});

const emit = defineEmits<{
  (e: "row-click", data: unknown): void;
  (e: "row-dblclick", data: unknown): void;
  (e: "selection-change", value: unknown): void;
  (e: "sort", event: { field: string; order: number }): void;
  (e: "page", event: { page: number; rows: number }): void;
}>();

const { items, loading, columns } = toRefs(props);

// State for pagination and sorting
const currentPage = ref(1);
const rowsPerPage = ref(props.rows);
const currentSortField = ref<string | undefined>(props.sortField);
const currentSortOrder = ref<number>(props.sortOrder);

watch(() => props.rows, (newVal) => { rowsPerPage.value = newVal; });
watch(() => props.sortField, (newVal) => { currentSortField.value = newVal; });
watch(() => props.sortOrder, (newVal) => { currentSortOrder.value = newVal; });

// Reset page when items change
watch(() => props.items, () => {
  currentPage.value = 1;
});

// Sorted Data
const sortedItems = computed(() => {
  let sorted = [...props.items];
  if (currentSortField.value) {
    sorted.sort((a, b) => {
      const valA = a[currentSortField.value as string];
      const valB = b[currentSortField.value as string];
      
      let result = 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        result = valA.localeCompare(valB);
      } else if (valA < valB) {
        result = -1;
      } else if (valA > valB) {
        result = 1;
      }
      
      return currentSortOrder.value === 1 ? result : -result;
    });
  }
  return sorted;
});

// Paginated Data
const processedItems = computed(() => {
  if (!props.paginated) return sortedItems.value;
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return props.paginated ? Math.ceil(props.items.length / rowsPerPage.value) : 1;
});

// Handlers
const handleSort = (field: string, isSortable: boolean | undefined) => {
  if (!isSortable) return;
  if (currentSortField.value === field) {
    currentSortOrder.value = currentSortOrder.value === 1 ? -1 : 1;
  } else {
    currentSortField.value = field;
    currentSortOrder.value = 1;
  }
  emit("sort", { field: currentSortField.value, order: currentSortOrder.value });
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page", { page: currentPage.value, rows: rowsPerPage.value });
  }
};

const changeRowsPerPage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  rowsPerPage.value = Number(target.value);
  currentPage.value = 1;
  emit("page", { page: currentPage.value, rows: rowsPerPage.value });
};

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
    console.warn("CSV export not implemented in native table");
  },
});
</script>

<template>
  <div class="flex flex-col bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-full text-sm text-left text-surface-600 dark:text-surface-400 border-collapse" style="display: table; width: 100%;">
        <thead class="text-xs text-surface-700 dark:text-surface-300 uppercase bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
          <tr>
            <!-- Selection Column -->
            <th v-if="selectionMode === 'multiple'" class="p-4 w-4">
              <PxCheckbox
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
              class="px-6 py-4 font-bold tracking-wider transition-colors select-none"
              :class="{ 'cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700': col.sortable }"
              :style="col.style"
              @click="handleSort(col.field, col.sortable)"
            >
              <div class="flex items-center gap-2">
                <span>{{ col.header }}</span>
                <span v-if="col.sortable" class="text-surface-400 dark:text-surface-500">
                  <ChevronUp v-if="currentSortField === col.field && currentSortOrder === 1" class="w-3 h-3 text-p-primary" />
                  <ChevronDown v-else-if="currentSortField === col.field && currentSortOrder === -1" class="w-3 h-3 text-p-primary" />
                  <ChevronsUpDown v-else class="w-3 h-3 opacity-50" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading State (Skeleton) -->
          <template v-if="loading">
            <tr v-for="i in 5" :key="'skeleton-' + i" class="border-b border-surface-200 dark:border-surface-700 last:border-0">
              <td v-if="selectionMode" class="p-4 w-4">
                <div class="w-4 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
              </td>
              <td v-if="$slots.expansion" class="p-4 w-4">
                <div class="w-4 h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
              </td>
              <td v-for="col in columns" :key="'skeleton-col-' + col.field" class="px-6 py-4">
                <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse w-2/3"></div>
              </td>
            </tr>
          </template>
          
          <!-- Empty State -->
          <template v-else-if="!processedItems.length">
            <tr>
              <td :colspan="columns.length + (selectionMode ? 1 : 0) + ($slots.expansion ? 1 : 0)" class="text-center py-16">
                <div class="flex flex-col items-center justify-center text-surface-400 dark:text-surface-500 space-y-3">
                  <Search v-if="isSearching" class="w-12 h-12 opacity-20" />
                  <Inbox v-else class="w-12 h-12 opacity-20" />
                  <p class="text-base font-medium">
                    {{ isSearching ? searchEmptyMessage : emptyMessage }}
                  </p>
                </div>
              </td>
            </tr>
          </template>
  
          <!-- Data Rows -->
          <template v-else>
            <template v-for="(row, rowIndex) in processedItems" :key="row.id || rowIndex">
              <tr
                class="border-b dark:border-surface-700/50 hover:bg-surface-50/80 dark:hover:bg-surface-800/80 transition-colors group"
                :class="{ 'bg-surface-50/50 dark:bg-surface-800/30': stripedRows && rowIndex % 2 !== 0 }"
                @click="handleRowClick(row)"
              >
                <!-- Selection Cell -->
                <td v-if="selectionMode" class="p-4" @click.stop="toggleSelection(row)">
                  <PxCheckbox
                    v-if="selectionMode === 'multiple'"
                    :model-value="isSelected(row)"
                    :binary="true"
                    class="pointer-events-none"
                  />
                  <input
                    v-else
                    type="radio"
                    :checked="isSelected(row)"
                    class="w-4 h-4 text-p-primary bg-surface-100 border-surface-300 focus:ring-p-primary/50"
                  />
                </td>
  
                <!-- Expander Cell -->
                <td v-if="$slots.expansion" class="p-4" @click.stop="toggleExpansion(row)">
                  <button
                    v-if="!expanderCondition || expanderCondition(row)"
                    class="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-full transition-colors text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                  >
                    <ChevronDown v-if="isExpanded(row)" class="w-4 h-4" />
                    <ChevronRight v-else class="w-4 h-4" />
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
                <td :colspan="columns.length + (selectionMode ? 1 : 0) + 1" class="p-0 border-b dark:border-surface-700 bg-surface-50/30 dark:bg-surface-900/30 shadow-inner">
                  <slot name="expansion" :data="row" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div v-if="paginated && items.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50 gap-4">
      <div class="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
        <span>Showing {{ (currentPage - 1) * rowsPerPage + 1 }} to {{ Math.min(currentPage * rowsPerPage, items.length) }} of {{ items.length }} items</span>
      </div>
      
      <div class="flex items-center gap-4">
        <!-- Rows per page selector -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-surface-500">Rows:</label>
          <select 
            class="text-sm border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 rounded-md py-1 px-2 focus:ring-p-primary focus:border-p-primary"
            :value="rowsPerPage"
            @change="changeRowsPerPage"
          >
            <option v-for="opt in rowsPerPageOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-1">
          <button 
            @click="goToPage(1)" 
            :disabled="currentPage === 1"
            class="p-1 rounded-md text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="First Page"
          >
            <ChevronsLeft class="w-4 h-4" />
          </button>
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="p-1 rounded-md text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          
          <span class="text-sm font-medium px-2 text-surface-700 dark:text-surface-300">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="p-1 rounded-md text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
          <button 
            @click="goToPage(totalPages)" 
            :disabled="currentPage === totalPages"
            class="p-1 rounded-md text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Last Page"
          >
            <ChevronsRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
