<script setup>
import ListHeader from '@praxis/ui-src/components/layout/ListHeader.vue'
</script>

# ListHeader

A header row component for list views. Renders a title with an optional actions slot on the right. Typically placed above a data table.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <ListHeader title="Patients">
      <template #actions>
        <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Add Patient</button>
        <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Export CSV</button>
      </template>
    </ListHeader>
  </div>

  <template #code>

```vue
<script setup>
import { ListHeader } from 'praxis-vue-ui'
</script>

<template>
  <ListHeader title="Patients">
    <template #actions>
      <button>Add Patient</button>
      <button>Export CSV</button>
    </template>
  </ListHeader>
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'title', type: 'string', required: true, description: 'Header title text displayed on the left.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `actions` | Right-aligned content. Use for action buttons, search inputs, or filters. |
