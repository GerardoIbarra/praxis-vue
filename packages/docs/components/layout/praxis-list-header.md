<script setup>
import PraxisListHeader from '@praxis/ui-src/components/layout/PraxisListHeader.vue'
</script>

# PraxisListHeader

A header row component for list views. Renders a title with an optional actions slot on the right. Typically placed above a data table.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <PraxisListHeader title="Projects">
      <template #actions>
        <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Add Project</button>
        <button class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Export CSV</button>
      </template>
    </PraxisListHeader>
  </div>

  <template #code>

```vue
<script setup>
import { PraxisListHeader } from 'praxis-vue-ui'
</script>

<template>
  <PraxisListHeader title="Projects">
    <template #actions>
      <button>Add Project</button>
      <button>Export CSV</button>
    </template>
  </PraxisListHeader>
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
