<script setup>
import ListViewWrapper from '@praxis/ui-src/components/layout/ListViewWrapper.vue'
import ListHeader from '@praxis/ui-src/components/layout/ListHeader.vue'
import BaseDataTable from '@praxis/ui-src/components/data-display/BaseDataTable.vue'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

# ListViewWrapper

A layout wrapper for list pages. Provides a consistent structure with header, filters, and table slots.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <ListViewWrapper>
      <template #header>
        <ListHeader title="Patients">
          <template #actions>
            <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Add</button>
          </template>
        </ListHeader>
      </template>
      <template #default>
        <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
          <p style="text-align: center; color: var(--vp-c-text-2);">List view content area (e.g. data table)</p>
        </div>
      </template>
    </ListViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { ListViewWrapper, ListHeader, BaseDataTable } from 'praxis-vue-ui'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

<template>
  <ListViewWrapper>
    <template #header>
      <ListHeader title="Patients">
        <template #actions>
          <button>Add</button>
        </template>
      </ListHeader>
    </template>

    <template #default>
      <BaseDataTable :items="items" :columns="columns" />
    </template>
  </ListViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `header` | Page header area. Typically a `ListHeader`. |
| `default` | Main content area. Typically a `BaseDataTable`. |
