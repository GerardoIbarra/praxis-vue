<script setup>
import { ref } from 'vue'
import BaseDataTable from '@praxis/ui-src/components/data-display/BaseDataTable.vue'

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status' },
  { field: 'joined', header: 'Joined' },
]

const items = ref([
  { id: 1, name: 'Alice Johnson', role: 'Designer', status: 'Active', joined: '2023-01-15' },
  { id: 2, name: 'Bob Smith', role: 'Engineer', status: 'Active', joined: '2022-07-20' },
  { id: 3, name: 'Carol Williams', role: 'Product', status: 'Away', joined: '2023-03-08' },
  { id: 4, name: 'David Brown', role: 'Engineer', status: 'Active', joined: '2021-11-30' },
  { id: 5, name: 'Eva Martinez', role: 'Designer', status: 'Inactive', joined: '2024-01-01' },
])

const selectedItems = ref([])
const handleSelection = (val) => { selectedItems.value = val }
</script>

# BaseDataTable

A responsive data table component built on native HTML `<table>`. Supports single/multiple row selection, expandable rows, loading states, striped rows, and custom cell rendering via named slots.

## Basic Usage

<ComponentDemo>
  <div style="width:100%">
    <BaseDataTable :items="items" :columns="columns" />
  </div>

  <template #code>

```vue
<script setup>
import { BaseDataTable } from '@praxis/vue'

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status' },
]

const items = [
  { id: 1, name: 'Alice Johnson', role: 'Designer', status: 'Active' },
  { id: 2, name: 'Bob Smith', role: 'Engineer', status: 'Active' },
]
</script>

<template>
  <BaseDataTable :items="items" :columns="columns" />
</template>
```

  </template>
</ComponentDemo>

## Multiple Selection

<ComponentDemo title="Multiple Selection">
  <div style="width:100%">
    <BaseDataTable
      :items="items"
      :columns="columns"
      selection-mode="multiple"
      :selected-items="selectedItems"
      @selection-change="handleSelection"
    />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Selected: <strong>{{ selectedItems.map(i => i.name).join(', ') || 'None' }}</strong>
    </p>
  </div>

  <template #code>

```vue
<BaseDataTable
  :items="items"
  :columns="columns"
  selection-mode="multiple"
  :selected-items="selectedItems"
  @selection-change="selectedItems = $event"
/>
```

  </template>
</ComponentDemo>

## Striped Rows + Loading

<ComponentDemo title="Striped + Loading">
  <div style="width:100%">
    <BaseDataTable
      :items="items"
      :columns="columns"
      :striped-rows="true"
      :loading="true"
    />
  </div>

  <template #code>

```vue
<BaseDataTable
  :items="items"
  :columns="columns"
  :striped-rows="true"
  :loading="true"
/>
```

  </template>
</ComponentDemo>

## Custom Cell Rendering

Use `slotName` on a column to render custom content in that cell:

```vue
<BaseDataTable :items="items" :columns="columns">
  <template #status="{ data }">
    <span
      class="badge"
      :class="data.status === 'Active' ? 'badge-green' : 'badge-gray'"
    >
      {{ data.status }}
    </span>
  </template>
</BaseDataTable>
```

Define `slotName` on the column definition:
```ts
const columns = [
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status', slotName: 'status' },
]
```

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'items', type: 'Record<string, unknown>[]', default: '[]', description: 'Array of row data objects. Each row should have a unique id field.' },
  { name: 'columns', type: 'ColumnDef[]', default: '[]', description: 'Column definitions. See ColumnDef interface below.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a centered spinner and hides row data.' },
  { name: 'rows', type: 'number', default: '10', description: 'Number of rows per page (for pagination, not yet implemented natively).' },
  { name: 'selectionMode', type: '\'single\' | \'multiple\' | undefined', default: 'undefined', description: 'Enables row selection. \'multiple\' shows checkboxes, \'single\' shows radio buttons.' },
  { name: 'selectedItems', type: 'Record<string, unknown>[]', default: '[]', description: 'Currently selected rows. Use alongside @selection-change.' },
  { name: 'stripedRows', type: 'boolean', default: 'false', description: 'Alternates row background colors for easier scanning.' },
  { name: 'emptyMessage', type: 'string', default: '\'No data available\'', description: 'Message shown when items array is empty and not searching.' },
  { name: 'searchEmptyMessage', type: 'string', default: '\'No results found\'', description: 'Message shown when items is empty and isSearching is true.' },
  { name: 'isSearching', type: 'boolean', default: 'false', description: 'When true, uses searchEmptyMessage for the empty state.' },
  { name: 'enableRowDblClick', type: 'boolean', default: 'false', description: 'Enables double-click events on rows.' },
  { name: 'expanderCondition', type: '(row) => boolean', default: 'undefined', description: 'Function that returns whether a row should show the expander button.' },
]" />

### ColumnDef

```ts
interface ColumnDef {
  field: string          // Property name from the row object
  header: string         // Column header text
  slotName?: string      // Named slot for custom cell rendering
  style?: string | Record<string, string>  // CSS styles for the column
  sortable?: boolean     // Reserved (not implemented)
  frozen?: boolean       // Reserved (not implemented)
}
```

## Emits

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'row-click', payload: 'unknown', description: 'Emitted 300ms after a single click on a row (debounced to avoid conflict with dblclick).' },
  { name: 'row-dblclick', payload: 'unknown', description: 'Emitted on double-click. Requires enableRowDblClick to be true.' },
  { name: 'selection-change', payload: 'unknown', description: 'Emitted when row selection changes. Returns the full updated selection array.' },
]" />

## Slots

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-slots">Slots</span>
</div>

| Slot | Scope | Description |
|------|-------|-------------|
| `[slotName]` | `{ data: row }` | Custom cell content. Name must match `slotName` in the column definition. |
| `expansion` | `{ data: row }` | Expandable row content. Presence of this slot automatically adds an expander column. |
