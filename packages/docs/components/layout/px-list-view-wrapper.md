<script setup>
import PxListViewWrapper from '@praxis/px-src/components/layout/PxListViewWrapper.vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
import PxDataTable from '@praxis/px-src/components/data-display/PxDataTable.vue'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

# PxListViewWrapper

A layout wrapper for list pages. Provides a consistent structure with header, filters, and table slots.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <PxListViewWrapper>
      <template #header>
        <PxHeader variant="list" title="Projects">
          <template #actions>
            <button class="text-sm font-medium text-blue-600 dark:text-blue-400">View All</button>
          </template>
        </PxHeader>
      </template>
      <template #default>
        <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
          <p style="text-align: center; color: var(--vp-c-text-2);">List view content area (e.g. data table)</p>
        </div>
      </template>
    </PxListViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { PxListViewWrapper, PxHeader, PxDataTable } from 'px-vue-ui'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

<template>
  <PxListViewWrapper>
    <template #header>
      <PxListHeader title="Projects">
        <template #actions>
          <button>Add</button>
        </template>
      </PxListHeader>
    </template>

    <template #default>
      <PxDataTable :items="items" :columns="columns" />
    </template>
  </PxListViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `header` | Page header area. Typically a `PxHeader` with variant="list". |
| `default` | Main content area. Typically a `PxDataTable`. |
