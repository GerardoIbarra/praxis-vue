<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ChevronRight } from "@lucide/vue";
import { type Ref, ref, onMounted, onUnmounted, computed, toRefs } from "vue";

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
  /** When provided, the expand toggle only appears for rows where this function returns true */
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

// Computed para manejar la selección
const selection = computed({
  get() {
    return props.selectedItems;
  },
  set(value) {
    emit("selection-change", value);
  },
});

// Detectar si es pantalla mediana/pequeña
const isMediumOrSmall = ref<boolean>(false);

const checkScreenSize = (): void => {
  isMediumOrSmall.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// Variables para detectar doble clic
let clickTimeout: ReturnType<typeof setTimeout> | null = null;
let lastClickedRow: unknown = null;

const handleRowClick = (event: { data: unknown }): void => {
  const currentRow = event.data;

  if (lastClickedRow === currentRow && clickTimeout) {
    // Es un doble clic
    clearTimeout(clickTimeout);
    clickTimeout = null;
    lastClickedRow = null;
    emit("row-dblclick", currentRow);
  } else {
    // Es un clic simple
    lastClickedRow = currentRow;
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
      lastClickedRow = null;
      emit("row-click", currentRow);
    }, 300); // 300ms para detectar doble clic
  }
};

const handleCellDblClick = (data: unknown): void => {
  if (props.enableRowDblClick) {
    emit("row-dblclick", data);
  }
};

//const slots = useSlots();
const expandedRows: Ref<unknown[] | Record<string, boolean>> = ref({});
const dt = ref();

/** Manually toggle a row's expanded state (used when expanderCondition is set) */
const toggleExpansion = (data: Record<string, unknown>): void => {
  const key = data.id as string;
  const current = expandedRows.value as Record<string, boolean>;
  if (current[key]) {
    const updated = { ...current };
    delete updated[key];
    expandedRows.value = updated;
  } else {
    expandedRows.value = { ...current, [key]: true };
  }
};

const isExpanded = (data: Record<string, unknown>): boolean => {
  const key = data.id as string;
  return !!(expandedRows.value as Record<string, boolean>)[key];
};

defineExpose({
  exportCSV: () => {
    dt.value.exportCSV();
  },
});
</script>

<template>
  <DataTable
    ref="dt"
    v-model:selection="selection"
    v-model:expanded-rows="expandedRows"
    :value="items"
    :loading="loading"
    :selection-mode="selectionMode"
    :striped-rows="stripedRows"
    removable-sort
    resizable-columns
    column-resize-mode="expand"
    table-style="min-width: 100%"
    scrollable
    scroll-height="flex"
    data-key="id"
    :meta-key-selection="false"
    :row-group-mode="rowGroupMode"
    :group-rows-by="groupRowsBy"
    :sort-mode="sortMode"
    :sort-field="sortField"
    :sort-order="sortOrder"
    @row-click="handleRowClick"
  >
    <!-- Native expander: shows for all rows -->
    <Column
      v-if="$slots.expansion && !expanderCondition"
      expander
      style="width: 3rem; min-width: 3rem"
    />

    <!-- Conditional expander: shows toggle only for rows that pass the condition -->
    <Column
      v-else-if="$slots.expansion && expanderCondition"
      style="width: 3rem; min-width: 3rem"
    >
      <template #body="{ data }">
        <button
          v-if="expanderCondition(data)"
          class="p-datatable-row-toggle-button"
          type="button"
          @click.stop="toggleExpansion(data)"
        >
          <ChevronRight
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isExpanded(data) ? 'rotate-90' : '',
            ]"
          />
        </button>
      </template>
    </Column>

    <template #expansion="slotProps">
      <slot name="expansion" v-bind="slotProps"></slot>
    </template>

    <template #empty>
      <div class="flex flex-col items-center justify-center py-8">
        <div
          v-if="isSearching"
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-p-secondary mb-2"
        ></div>
        <p class="empty-state-message text-center">
          {{ isSearching ? searchEmptyMessage : emptyMessage }}
        </p>
      </div>
    </template>

    <!-- Columna de selección -->
    <Column
      v-if="selectionMode"
      selection-mode="multiple"
      header-style="width: 3rem"
    ></Column>

    <template v-for="(col, index) in columns" :key="index">
      <Column
        :field="col.field"
        :header="col.header"
        :frozen="col.header === 'Actions' || !!col.frozen"
        :align-frozen="col.header === 'Actions' ? 'right' : col.alignFrozen"
        :align-header="col.header === 'Actions' ? 'center' : null"
        :align="col.header === 'Actions' ? 'center' : null"
        :header-style="
          col.header === 'Actions'
            ? 'text-align: center; display: flex; justify-content: center;'
            : ''
        "
        :style="
          col.header === 'Actions'
            ? 'min-width: 100px; max-width: 100px'
            : col.style || 'min-width: 150px'
        "
        :pt="col.pt as any"
      >
        <template v-if="col.slotName" #body="slotProps">
          <div
            v-if="enableRowDblClick && col.header !== 'Actions'"
            class="w-full h-full"
            @dblclick="handleCellDblClick(slotProps.data)"
          >
            <slot :name="col.slotName" v-bind="slotProps" />
          </div>
          <slot v-else :name="col.slotName" v-bind="slotProps" />
        </template>
        <template v-else #body="slotProps">
          <div
            v-if="enableRowDblClick && col.header !== 'Actions'"
            class="w-full h-full"
            @dblclick="handleCellDblClick(slotProps.data)"
          >
            {{ slotProps.data[col.field] }}
          </div>
          <span v-else>{{ slotProps.data[col.field] }}</span>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<style scoped>
:deep(.p-datatable-wrapper) {
  overflow-x: auto;
  display: block;
}

/* Personalización del scrollbar horizontal para que sea más visible */
:deep(.p-datatable-wrapper::-webkit-scrollbar) {
  height: 8px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb) {
  background: #4b5563; /* Gray-600 */
  border-radius: 10px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb:hover) {
  background: #374151; /* Gray-700 */
}

/* Ajuste para dispositivos móviles */
@media (max-width: 768px) {
  :deep(.p-datatable-wrapper::-webkit-scrollbar) {
    height: 4px;
  }
}
</style>
