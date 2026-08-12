<script setup>
import { ref } from 'vue'
import PraxisSelectableListWithTable from '@praxis/ui-src/components/forms/PraxisSelectableListWithTable.vue'

const options = [
  { id: 1, name: 'Alice Smith', department: 'Engineering' },
  { id: 2, name: 'Bob Jones', department: 'Design' },
]
const selected = ref([])

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'department', header: 'Department' },
]
</script>

# PraxisSelectableListWithTable

An extended version of `PraxisSelectableList` that displays selected items in a full `BaseDataTable` instead of a simple list. Useful when the selected items need sortable columns, expandable rows, or custom cell rendering.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <PraxisSelectableListWithTable
      title="Team Members"
      :options="options"
      :selected-items="selected"
      :columns="columns"
      @update:selected-items="selected = $event"
    />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisSelectableListWithTable } from 'praxis-vue-ui'

const options = [
  { id: 1, name: 'Alice Smith', department: 'Engineering' },
  { id: 2, name: 'Bob Jones', department: 'Design' },
]
const selected = ref([])

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'department', header: 'Department' },
]
</script>

<template>
  <PraxisSelectableListWithTable
    title="Team Members"
    :options="options"
    :selected-items="selected"
    :columns="columns"
    @update:selected-items="selected = $event"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'options', type: 'SelectableItem[]', required: true, description: 'Available options to select from.' },
  { name: 'selectedItems', type: 'SelectableItem[]', required: true, description: 'Currently selected items shown in the table.' },
  { name: 'title', type: 'string', required: true, description: 'Label displayed above the select input.' },
  { name: 'columns', type: 'ColumnDef[]', default: '[]', description: 'Column definitions for the BaseDataTable (same as BaseDataTable columns prop).' },
  { name: 'labelField', type: 'string', default: '\'name\'', description: 'Property name used as display label in the dropdown.' },
  { name: 'valueField', type: 'string', default: '\'id\'', description: 'Property name used as unique key.' },
  { name: 'placeholder', type: 'string', default: '\'Choose item\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select input.' },
  { name: 'showButtonDelete', type: 'boolean', default: 'true', description: 'Shows a delete button column in the table.' },
  { name: 'isInfinity', type: 'boolean', default: 'false', description: 'Enables infinite scroll on the dropdown.' },
  { name: 'hasMore', type: 'boolean', default: 'false', description: 'Indicates more items to load.' },
  { name: 'loadingScroll', type: 'boolean', default: 'false', description: 'Shows loading spinner at the bottom of the dropdown.' },
  { name: 'loadMoreScroll', type: '() => Promise<void>', default: 'undefined', description: 'Callback to load more items.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:selectedItems', payload: 'SelectableItem[]', description: 'Emitted when items are added or removed from the selection.' },
]" />

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `[slotName]` | `{ data }` | Custom cell rendering for table columns with a `slotName` property. |
