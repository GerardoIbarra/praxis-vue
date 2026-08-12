<script setup>
import UiAccordion from '@praxis/ui-src/components/_primitives/UiAccordion.vue'

const panels = [
  { value: 'info', header: 'User Information', content: 'Name, Email, Role...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Address...' },
  { value: 'history', header: 'Account History', content: 'Past transactions...' },
]
</script>

# UiAccordion

A collapsible accordion component. Renders one or more panels that expand/collapse on header click. Supports single or multiple active panels.

## Usage

<ComponentDemo>
  <div style="width: 100%; max-width: 400px;">
    <UiAccordion :items="panels" />
  </div>

  <template #code>

```vue
<script setup>
import { UiAccordion } from 'praxis-vue-ui'

const panels = [
  { value: 'info', header: 'User Information', content: 'Name, Email, Role...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Address...' },
  { value: 'history', header: 'Account History', content: 'Past transactions...' },
]
</script>

<template>
  <UiAccordion :items="panels" />
</template>
```

  </template>
</ComponentDemo>

Or with slot-based content:

<ComponentDemo title="Slots">
  <div style="width: 100%; max-width: 400px;">
    <UiAccordion>
      <template #header>User Information</template>
      <div style="padding: 1rem; color: var(--vp-c-text-2);">
        <p>Name: Alice Johnson</p>
        <p>Role: Administrator</p>
      </div>
    </UiAccordion>
  </div>

  <template #code>

```vue
<UiAccordion>
  <template #header>User Information</template>
  <p>Name: Alice Johnson</p>
  <p>Role: Administrator</p>
</UiAccordion>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'multiple', type: 'boolean', default: 'false', description: 'When true, multiple panels can be open simultaneously.' },
  { name: 'activeIndex', type: 'number | number[]', default: 'undefined', description: 'Index or array of indexes of initially expanded panels.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:activeIndex', payload: 'number | number[]', description: 'Emitted when the active panel changes.' },
  { name: 'tab-open', payload: '{ index: number }', description: 'Emitted when a panel opens.' },
  { name: 'tab-close', payload: '{ index: number }', description: 'Emitted when a panel closes.' },
]" />
