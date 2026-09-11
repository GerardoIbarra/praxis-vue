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

<ComponentDemo title="Basic Usage">
  <div style="width:100%">
    <PxGridSelect
      v-model:selectedItems="selectedItems"
      :options="options"
      title="Selected Items"
    />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxGridSelect } from 'praxis-vue-ui'

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

  </template>
</ComponentDemo>

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

## API Reference

<ApiReference component="PxGridSelect" />
