<script setup>
import { ref } from 'vue'
import PxDrawer from '@praxis/px-src/components/_primitives/PxDrawer.vue'

const open = ref(false)
const position = ref('right')

const openDrawer = (pos) => {
  position.value = pos
  open.value = true
}
</script>

# PxDrawer

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
    <PxDrawer v-model:visible="open" header="Details" :position="position">
      <div style="padding: 1rem 0; color: var(--vp-c-text-2);">
        <p>Drawer content goes here. This drawer slides in from the <strong>{{ position }}</strong>.</p>
      </div>
    </PxDrawer>
  </ClientOnly>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxDrawer } from 'praxis-vue-ui'

const open = ref(false)
const position = ref('right')
</script>

<template>
  <button @click="open = true">Open Drawer</button>

  <PxDrawer v-model:visible="open" header="Details" :position="position">
    <p>Drawer content goes here.</p>
  </PxDrawer>
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'visible', type: 'boolean', required: true, description: 'Controls drawer open/close state. Use with v-model:visible.' },
  { name: 'header', type: 'string', default: 'undefined', description: 'Drawer header title.' },
  { name: 'position', type: '\'left\' | \'right\' | \'top\' | \'bottom\'', default: '\'right\'', description: 'Which edge the drawer slides in from.' },
  { name: 'closable', type: 'boolean', default: 'true', description: 'Shows the × close button, and enables closing via the Escape key and clicking the backdrop.' },
  { name: 'style', type: 'Record<string, string>', default: 'undefined', description: 'Inline styles for the drawer panel.' },
]" />

::: tip No size prop
The drawer's width (left/right positions) is a fixed 550px and its height (top/bottom) is capped at 80vh, both set in CSS — there's no prop to override this today. The backdrop is also always shown; there's no way to render the drawer without one.
:::

## Emits

<EmitsTable :rows="[
  { name: 'update:visible', payload: 'boolean', description: 'Emitted with false when the drawer should close.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `default` | Drawer body content. |
| `header` | Custom header rendering (replaces the header prop text). |
