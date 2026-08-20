<script setup>
import { ref } from 'vue'
import PxGridSelect from '@praxis/px-src/components/forms/PxGridSelect.vue'

const selectedItems = ref([])
const options = [
  { id: 1, name: 'Option A', description: 'This is option A' },
  { id: 2, name: 'Option B', description: 'This is option B' }
]
</script>

# PxGridSelect

A complex selector that combines a searchable dropdown with a data grid (table) for selected items. Useful for scenarios where users need to select multiple items and see their details (like name, color, and custom fields) in a structured format before saving. Built natively using `PxSelect`.

## Basic Usage

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxGridSelect
    v-model:selectedItems="selectedItems"
    :options="options"
    title="Selected Items"
  />
</div>

```vue
<script setup>
import { ref } from 'vue'
import { PxGridSelect } from 'px-vue-ui'

const selectedItems = ref([])
const options = [
  { id: 1, name: 'Option A' },
  { id: 2, name: 'Option B' }
]
</script>

<template>
  <PxGridSelect
    v-model:selectedItems="selectedItems"
    :options="options"
    title="Selected Items"
  />
</template>
```

## Schema-Driven Usage (Backend Field)

When using `PxSchemaForm`, you can pass a `FormSchemaField` directly using the `field` prop. The component will automatically extract `options`, `label_field`, `value_field`, and handle pagination via infinite scroll if configured.

```vue
<PxGridSelect
  v-model:selectedItems="selected"
  :field="mySchemaField"
  @search="handleSearch"
  @scroll-bottom="loadMore"
/>
```

## API

### Key Props

| Name | Type | Default | Description |
|---|---|---|---|
| `options` | `Array` | `[]` | List of available options for selection. |
| `selectedItems` | `Array` | `[]` | The currently selected items (use `v-model:selectedItems`). |
| `field` | `FormSchemaField` | `undefined` | Optional. If provided, overrides options and fields based on the schema. |
| `title` | `string` | `""` | Title to display above the dropdown. |
| `showColorPicker` | `boolean` | `false` | Whether to display a color picker column in the table. |
| `additionalFields` | `Array` | `[]` | Extra columns to render for each selected item (e.g., text, select). |
