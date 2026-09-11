<script setup>
import { ref } from 'vue'
import PxDataTable from '@praxis/px-src/components/data-display/PxDataTable.vue'

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

# PxDataTable

A responsive data table component built on native HTML `<table>`. Supports single/multiple row selection, expandable rows, skeleton loading states, striped rows, elegant empty states, and custom cell rendering via named slots.

## Basic Usage

<ComponentDemo>
  <div style="width:100%">
    <PxDataTable :items="items" :columns="columns" />
  </div>

  <template #code>

```vue
<script setup>
import { PxDataTable } from 'praxis-vue-ui'

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
  <PxDataTable :items="items" :columns="columns" />
</template>
```

  </template>
</ComponentDemo>

## Multiple Selection

<ComponentDemo title="Multiple Selection">
  <div style="width:100%">
    <PxDataTable
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
<PxDataTable
  :items="items"
  :columns="columns"
  selection-mode="multiple"
  :selected-items="selectedItems"
  @selection-change="selectedItems = $event"
/>
```

  </template>
</ComponentDemo>

## Striped Rows & Skeleton Loading

<ComponentDemo title="Skeleton Loaders">
  <div style="width:100%">
    <PxDataTable
      :items="items"
      :columns="columns"
      :striped-rows="true"
      :loading="true"
    />
  </div>

  <template #code>

```vue
<PxDataTable
  :items="items"
  :columns="columns"
  :striped-rows="true"
  :loading="true"
/>
```

  </template>
</ComponentDemo>

## Empty States (Icons)

<ComponentDemo title="Empty States">
  <div style="width:100%; display: flex; flex-direction: column; gap: 1rem;">
    <PxDataTable
      :items="[]"
      :columns="columns"
      empty-message="No data found in your inbox"
    />
    <PxDataTable
      :items="[]"
      :columns="columns"
      :is-searching="true"
      search-empty-message="No results match your search"
    />
  </div>

  <template #code>

```vue
<!-- Standard Empty State (Inbox Icon) -->
<PxDataTable
  :items="[]"
  :columns="columns"
  empty-message="No data found in your inbox"
/>

<!-- Search Empty State (Search Icon) -->
<PxDataTable
  :items="[]"
  :columns="columns"
  :is-searching="true"
  search-empty-message="No results match your search"
/>
```

  </template>
</ComponentDemo>

## Custom Cell Rendering

Use `slotName` on a column to render custom content in that cell:

```vue
<PxDataTable :items="items" :columns="columns">
  <template #status="{ data }">
    <span
      class="badge"
      :class="data.status === 'Active' ? 'badge-green' : 'badge-gray'"
    >
      {{ data.status }}
    </span>
  </template>
</PxDataTable>
```

Define `slotName` on the column definition:
```ts
const columns = [
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status', slotName: 'status' },
]
```

## Export to Excel & CSV

<ComponentDemo title="Exportable Table">
  <div style="width:100%">
    <PxDataTable
      :items="items"
      :columns="columns"
      title="Team Directory"
      :exportable="true"
      export-file-name="company-team"
      selection-mode="multiple"
      :selected-items="selectedItems"
      @selection-change="handleSelection"
    />
  </div>

  <template #code>

```vue
<template>
  <PxDataTable
    :items="items"
    :columns="columns"
    title="Team Directory"
    :exportable="true"
    export-file-name="company-team"
    selection-mode="multiple"
    @export="(e) => console.log('Exported', e)"
  />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxDataTable" />

### ColumnDef Interface

```ts
interface ColumnDef {
  field: string          // Property name from the row object
  header: string         // Column header text
  slotName?: string      // Named slot for custom cell rendering
  style?: string | Record<string, string>  // CSS styles for the column
  sortable?: boolean     // When true, enables column sorting on click
  frozen?: boolean       // Reserved (not implemented)
}
```

## Exposed Methods

Access these methods via template ref:

```ts
const tableRef = ref<InstanceType<typeof PxDataTable> | null>(null)

// Export programmatically
tableRef.value?.exportCSV({ filename: 'custom-export', selectedOnly: false })
tableRef.value?.exportExcel({ filename: 'custom-export', selectedOnly: false })
```

