<script setup>
import { ref } from 'vue'
import PxTree from '@praxis/px-src/components/data-display/PxTree.vue'

const nodes = ref([
  {
    key: '1',
    label: 'Engineering',
    has_children: true,
    children: [
      { key: '2', label: 'Frontend Engineering', has_children: false },
      { key: '3', label: 'Backend Engineering', has_children: false },
    ]
  },
  {
    key: '4',
    label: 'Design',
    has_children: true,
    children: [
      { key: '5', label: 'Product Design', has_children: false },
    ]
  },
])

const expandedKeys = ref({ '1': true })
const selectedKey = ref(null)
</script>

# PxTree

A recursive tree component for browsing hierarchical catalogs (e.g. document template folders). Supports expand/collapse, node selection, and inline add/edit-child flows via the `newChild*` props.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px; border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem;">
    <PxTree
      :nodes="nodes"
      v-model:expanded-keys="expandedKeys"
      :selected-key="selectedKey"
      @node-click="(node) => (selectedKey = node.key)"
    />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxTree } from 'px-vue-ui'

const nodes = ref([
  {
    key: '1',
    label: 'Engineering',
    has_children: true,
    children: [
      { key: '2', label: 'Frontend Engineering', has_children: false },
      { key: '3', label: 'Backend Engineering', has_children: false },
    ]
  },
  {
    key: '4',
    label: 'Design',
    has_children: true,
    children: [
      { key: '5', label: 'Product Design', has_children: false },
    ]
  },
])

const expandedKeys = ref({ '1': true })
const selectedKey = ref(null)
</script>

<template>
  <PxTree
    :nodes="nodes"
    v-model:expanded-keys="expandedKeys"
    :selected-key="selectedKey"
    @node-click="(node) => (selectedKey = node.key)"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'nodes', type: 'TreeNode[]', required: true, description: 'Array of root tree nodes. Each node can have a children array for nested nodes.' },
  { name: 'expandedKeys', type: 'Record<string, boolean>', required: true, description: 'Map of node key to expanded state. Use with v-model:expanded-keys.' },
  { name: 'selectedKey', type: 'string | null', default: 'null', description: 'Currently selected node key.' },
  { name: 'selectable', type: 'boolean', default: 'true', description: 'Highlights the selected node.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables inline add/edit interactions.' },
  { name: 'level', type: 'number', default: '1', description: 'Nesting depth, used internally for indentation on recursive calls.' },
  { name: 'newChildName', type: 'string | null', default: 'null', description: 'v-model for the name input shown while adding a child node.' },
  { name: 'newChildType', type: 'boolean | string | null', default: 'null', description: 'v-model for the type selector shown while adding a child node.' },
  { name: 'newChildTypeOptions', type: 'Record<string, unknown>[] | null', default: 'null', description: 'Options for the new-child type selector.' },
  { name: 'catalogItemId', type: 'string | null', default: 'null', description: 'v-model for the catalog item selector, shown when newChildType is template or form.' },
  { name: 'catalogOptions', type: 'Record<string, unknown>[] | null', default: 'null', description: 'Options for the catalog item selector.' },
  { name: 'newChildRequiered', type: 'boolean', default: 'false', description: 'Whether the new child name is required.' },
]" />

## TreeNode Interface

```ts
interface TreeNode {
  key: string
  label: string
  children?: TreeNode[]
  has_children?: boolean
  type?: string          // 'folder' | 'template' | 'placeholder' | 'form' | ...
  isEditing?: boolean     // renders the inline add/edit row instead of the label
  isAddButton?: boolean   // renders an "add child" button instead of the label
  [key: string]: unknown
}
```

## Emits

<EmitsTable :rows="[
  { name: 'node-click', payload: 'TreeNode', description: 'Emitted when a non-editing node is clicked.' },
  { name: 'update:expandedKeys', payload: 'Record<string, boolean>', description: 'Emitted when a node is expanded or collapsed.' },
  { name: 'start-add-child', payload: 'TreeNode', description: 'Emitted when the add-child button is clicked.' },
  { name: 'confirm-add-child', payload: 'TreeNode', description: 'Emitted to confirm adding a new child node.' },
  { name: 'cancel-add-child', payload: '—', description: 'Emitted to cancel adding a new child node.' },
  { name: 'confirm-edit-node', payload: 'TreeNode', description: 'Emitted to confirm editing an existing node.' },
  { name: 'cancel-edit-node', payload: '—', description: 'Emitted to cancel editing an existing node.' },
]" />

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `actions` | `{ node: TreeNode }` | Action buttons rendered on the right side of each non-editing node. |
