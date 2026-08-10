# ListHeader

A header row component for list views. Renders a title with an optional actions slot on the right. Typically placed above a data table.

## Usage

```vue
<script setup>
import { ListHeader } from '@praxis/vue'
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

## Props

<PropsTable :rows="[
  { name: 'title', type: 'string', required: true, description: 'Header title text displayed on the left.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `actions` | Right-aligned content. Use for action buttons, search inputs, or filters. |
