<script setup>
import { Edit, Trash2, Eye, Download } from '@lucide/vue'
import ActionMenu from '@praxis/ui-src/components/navigation/ActionMenu.vue'

const items = [
  { label: 'View', lucideIcon: Eye, command: () => alert('View') },
  { label: 'Edit', lucideIcon: Edit, command: () => alert('Edit') },
  { label: 'Download', lucideIcon: Download, command: () => alert('Download') },
  { label: 'Delete', lucideIcon: Trash2, class: 'text-red-500', command: () => alert('Delete') },
]
</script>

# ActionMenu

A compact ⋮ (three-dot) vertical menu that shows a dropdown list of actions on click. Closes automatically on outside click.

## Basic Usage

<ComponentDemo>
  <div style="height:180px;display:flex;align-items:flex-start;justify-content:center;padding-top:1rem">
    <ActionMenu :items="items" />
  </div>

  <template #code>

```vue
<script setup>
import { Edit, Trash2, Eye } from '@lucide/vue'
import { ActionMenu } from 'praxis-vue-ui'

const items = [
  { label: 'View', lucideIcon: Eye, command: () => console.log('view') },
  { label: 'Edit', lucideIcon: Edit, command: () => console.log('edit') },
  { label: 'Delete', lucideIcon: Trash2, class: 'text-red-500', command: () => console.log('delete') },
]
</script>

<template>
  <ActionMenu :items="items" />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'items', type: 'ActionMenuItem[]', required: true, description: 'Array of menu items to render in the dropdown.' },
]" />

## ActionMenuItem Interface

```ts
interface ActionMenuItem {
  label: string               // Display text for the menu item
  lucideIcon?: Component      // Lucide Vue icon component (imported directly)
  class?: string              // CSS class for the icon (e.g. 'text-red-500')
  command?: () => void        // Function to call when the item is clicked
}
```

## Accessibility

- The trigger button has `aria-label="Open actions menu"` and `aria-haspopup="true"`.
- Closes on outside click via a global `click` event listener.
- Each menu item is clickable via keyboard (inherits from native click handling).
