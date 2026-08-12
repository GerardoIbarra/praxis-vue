<script setup>
import PraxisListViewWrapper from '@praxis/ui-src/components/layout/PraxisListViewWrapper.vue'
import PraxisListHeader from '@praxis/ui-src/components/layout/PraxisListHeader.vue'
import BaseDataTable from '@praxis/ui-src/components/data-display/BaseDataTable.vue'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

# PraxisListViewWrapper

A layout wrapper for list pages. Provides a consistent structure with header, filters, and table slots.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <PraxisListViewWrapper>
      <template #header>
        <PraxisListHeader title="Projects">
          <template #actions>
            <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Add</button>
          </template>
        </PraxisListHeader>
      </template>
      <template #default>
        <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
          <p style="text-align: center; color: var(--vp-c-text-2);">List view content area (e.g. data table)</p>
        </div>
      </template>
    </PraxisListViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { PraxisListViewWrapper, PraxisListHeader, BaseDataTable } from 'praxis-vue-ui'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

<template>
  <PraxisListViewWrapper>
    <template #header>
      <PraxisListHeader title="Projects">
        <template #actions>
          <button>Add</button>
        </template>
      </PraxisListHeader>
    </template>

    <template #default>
      <BaseDataTable :items="items" :columns="columns" />
    </template>
  </PraxisListViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `header` | Page header area. Typically a `PraxisListHeader`. |
| `default` | Main content area. Typically a `BaseDataTable`. |
