# PraxisDrawer

A slide-in side panel (drawer/sidebar) that appears from the edge of the screen. Supports left, right, top, and bottom positions. Useful for detail panels and filter sidebars.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { PraxisDrawer } from 'praxis-vue-ui'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Drawer</button>

  <PraxisDrawer v-model:visible="open" header="Details" position="right">
    <p>Drawer content goes here.</p>
  </PraxisDrawer>
</template>
```

## Props

<PropsTable :rows="[
  { name: 'visible', type: 'boolean', required: true, description: 'Controls drawer open/close state. Use with v-model:visible.' },
  { name: 'header', type: 'string', default: 'undefined', description: 'Drawer header title.' },
  { name: 'position', type: '\'left\' | \'right\' | \'top\' | \'bottom\'', default: '\'right\'', description: 'Which edge the drawer slides in from.' },
  { name: 'size', type: 'string', default: '\'30rem\'', description: 'Width (for left/right) or height (for top/bottom) of the drawer.' },
  { name: 'dismissable', type: 'boolean', default: 'true', description: 'Closes the drawer when clicking outside.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Shows an overlay backdrop.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:visible', payload: 'boolean', description: 'Emitted when the drawer is closed.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `default` | Drawer body content. |
| `header` | Custom header rendering. |
| `footer` | Footer area, typically action buttons. |
