<script setup>
import PxListLayout from '@praxis/px-src/components/layout/PxListLayout.vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
import PxFilterBar from '@praxis/px-src/components/layout/PxFilterBar.vue'
</script>

# PxListLayout

A card wrapper for list pages. It exposes `tabs` and `filter` slots that render above the card, and a default slot for the main content (typically a data table) that renders inside it.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px; padding: 1rem;">
    <PxHeader variant="list" title="Projects" />
    <PxListLayout>
      <template #filter>
        <PxFilterBar>
          <input type="search" placeholder="Search..." class="input-base" style="padding: 0.5rem; max-width: 200px;" />
        </PxFilterBar>
      </template>
      <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
        <p style="text-align: center; color: var(--vp-c-text-2); margin: 0;">Main content area (e.g. a PxDataTable)</p>
      </div>
    </PxListLayout>
  </div>

  <template #code>

```vue
<script setup>
import { PxListLayout, PxHeader, PxFilterBar, PxDataTable } from 'praxis-vue-ui'

const items = [{ id: 1, name: 'John Doe' }]
const columns = [{ field: 'name', header: 'Name' }]
</script>

<template>
  <!-- PxHeader lives outside PxListLayout — there's no "header" slot -->
  <PxHeader variant="list" title="Projects" />

  <PxListLayout>
    <template #filter>
      <PxFilterBar>
        <input type="search" placeholder="Search..." />
      </PxFilterBar>
    </template>

    <!-- default (unnamed) slot: the card's main content -->
    <PxDataTable :items="items" :columns="columns" />
  </PxListLayout>
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'class', type: 'string | null', default: '\'px-4\'', description: 'Custom class applied to the wrapper around the default slot.' },
  { name: 'noCard', type: 'boolean', default: 'false', description: 'When true, renders the default slot without the card background/border/shadow.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `tabs` | Rendered above everything else — typically a `PxTabs` for switching between list views. |
| `filter` | Rendered below `tabs`, above the card — typically a `PxFilterBar`. |
| _default_ | The main content, rendered inside the card (unless `noCard` is set) — typically a `PxDataTable`. |
