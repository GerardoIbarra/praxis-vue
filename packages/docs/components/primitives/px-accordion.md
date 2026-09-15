<script setup>
import PxAccordion from '@praxis/px-src/components/_primitives/PxAccordion.vue'

const panels = [
  { value: 'info', header: 'User Information', content: 'Name, Email, Role...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Address...' },
  { value: 'history', header: 'Account History', content: 'Past transactions...' },
]
</script>

# PxAccordion

A collapsible accordion component. Renders one or more panels that expand/collapse on header click. Supports single or multiple active panels.

## Usage

<ComponentDemo>
  <div style="width: 100%; max-width: 400px;">
    <PxAccordion :items="panels" />
  </div>

  <template #code>

```vue
<script setup>
import { PxAccordion } from 'praxis-vue-ui'

const panels = [
  { value: 'info', header: 'User Information', content: 'Name, Email, Role...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Address...' },
  { value: 'history', header: 'Account History', content: 'Past transactions...' },
]
</script>

<template>
  <PxAccordion :items="panels" />
</template>
```

  </template>
</ComponentDemo>

Without `items`, `PxAccordion` renders a single default scoped slot instead — build your own panel markup and call `toggle`/`isOpen` yourself:

<ComponentDemo title="Slot-based">
  <div style="width: 100%; max-width: 400px;">
    <PxAccordion v-slot="{ isOpen, toggle }">
      <div class="px-accordion-panel">
        <button type="button" class="px-accordion-header" @click="toggle('info')">
          User Information
        </button>
        <div v-show="isOpen('info')" class="px-accordion-content-inner">
          <p style="margin:0;">Name: Alice Johnson</p>
          <p style="margin:0;">Role: Administrator</p>
        </div>
      </div>
    </PxAccordion>
  </div>

  <template #code>

```vue
<PxAccordion v-slot="{ isOpen, toggle }">
  <div class="px-accordion-panel">
    <button type="button" class="px-accordion-header" @click="toggle('info')">
      User Information
    </button>
    <div v-show="isOpen('info')" class="px-accordion-content-inner">
      <p>Name: Alice Johnson</p>
      <p>Role: Administrator</p>
    </div>
  </div>
</PxAccordion>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'items', type: 'AccordionItem[]', default: 'undefined', description: 'Renders panels programmatically (header/content pairs). Omit to use the default scoped slot instead.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'When true, multiple panels can be open simultaneously.' },
  { name: 'value', type: 'string | string[]', default: 'undefined', description: 'Value (or array of values, if multiple) of initially expanded panel(s).' },
]" />

## Slots

<SlotsTable :rows="[
  { name: 'default', props: '{ isOpen, toggle }', description: 'Rendered instead of items — isOpen(value) checks a panel\'s state, toggle(value) opens/closes it.' },
]" />

This component has no emits — it's fully uncontrolled; use the `value` prop only to set the initial state.
