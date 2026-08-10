# BaseTree

A hierarchical tree component for displaying nested data structures. Supports expand/collapse, selection, drag-and-drop reordering, and custom node rendering via slots.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { BaseTree } from 'praxis-vue-ui'

const nodes = ref([
  {
    id: 1,
    name: 'Cardiology',
    children: [
      { id: 2, name: 'Pediatric Cardiology', children: [] },
      { id: 3, name: 'Interventional Cardiology', children: [] },
    ]
  },
  {
    id: 4,
    name: 'Neurology',
    children: [
      { id: 5, name: 'Clinical Neurology', children: [] },
    ]
  },
])
</script>

<template>
  <BaseTree :nodes="nodes" label-field="name" />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'nodes', type: 'TreeNode[]', required: true, description: 'Array of root tree nodes. Each node can have a children array for nested nodes.' },
  { name: 'labelField', type: 'string', default: '\'name\'', description: 'Property name to use as the node display label.' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Enables node selection with checkboxes.' },
  { name: 'draggable', type: 'boolean', default: 'false', description: 'Enables drag-and-drop reordering of nodes.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows skeleton loading state.' },
]" />

## TreeNode Interface

```ts
interface TreeNode {
  id: string | number
  name: string           // Display label (or whatever labelField points to)
  children?: TreeNode[]  // Nested child nodes
  [key: string]: unknown // Any additional properties
}
```

## Emits

<EmitsTable :rows="[
  { name: 'update:nodes', payload: 'TreeNode[]', description: 'Emitted when nodes are reordered via drag-and-drop.' },
  { name: 'node-click', payload: 'TreeNode', description: 'Emitted when a node is clicked.' },
  { name: 'selection-change', payload: 'TreeNode[]', description: 'Emitted when node selection changes.' },
]" />

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `node-label` | `{ node: TreeNode }` | Custom node label rendering. |
| `node-actions` | `{ node: TreeNode }` | Action buttons rendered on the right side of each node. |
