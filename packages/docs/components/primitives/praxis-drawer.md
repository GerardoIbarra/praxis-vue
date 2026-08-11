<script setup>
import { ref } from 'vue'
import PraxisDrawer from '@praxis/ui-src/components/_primitives/PraxisDrawer.vue'

const open = ref(false)
const position = ref('right')

const openDrawer = (pos) => {
  position.value = pos
  open.value = true
}
</script>

# PraxisDrawer

A slide-in side panel (drawer/sidebar) that appears from the edge of the screen. Supports left, right, top, and bottom positions. Useful for detail panels and filter sidebars.

## Usage

<ComponentDemo>
  <div style="display:flex; justify-content:center; gap: 1rem; padding: 2rem 0;">
    <button @click="openDrawer('left')" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Left</button>
    <button @click="openDrawer('right')" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Right</button>
    <button @click="openDrawer('top')" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Top</button>
    <button @click="openDrawer('bottom')" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Bottom</button>
  </div>

  <ClientOnly>
    <PraxisDrawer v-model:visible="open" header="Details" :position="position">
      <div style="padding: 1rem 0; color: var(--vp-c-text-2);">
        <p>Drawer content goes here. This drawer slides in from the <strong>{{ position }}</strong>.</p>
      </div>
    </PraxisDrawer>
  </ClientOnly>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisDrawer } from 'praxis-vue-ui'

const open = ref(false)
const position = ref('right')
</script>

<template>
  <button @click="open = true">Open Drawer</button>

  <PraxisDrawer v-model:visible="open" header="Details" :position="position">
    <p>Drawer content goes here.</p>
  </PraxisDrawer>
</template>
```

  </template>
</ComponentDemo>

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
