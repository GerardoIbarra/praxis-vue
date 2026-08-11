<script setup>
import PraxisAccordion from '@praxis/ui-src/components/_primitives/PraxisAccordion.vue'

const panels = [
  { value: 'info', header: 'Patient Information', content: 'Name, DOB, ID...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Email...' },
  { value: 'medical', header: 'Medical History', content: 'Diagnoses...' },
]
</script>

# PraxisAccordion

A collapsible accordion component. Renders one or more panels that expand/collapse on header click. Supports single or multiple active panels.

## Usage

<ComponentDemo>
  <div style="width: 100%; max-width: 400px;">
    <PraxisAccordion :items="panels" />
  </div>

  <template #code>

```vue
<script setup>
import { PraxisAccordion } from 'praxis-vue-ui'

const panels = [
  { value: 'info', header: 'Patient Information', content: 'Name, DOB, ID...' },
  { value: 'contact', header: 'Contact Details', content: 'Phone, Email...' },
  { value: 'medical', header: 'Medical History', content: 'Diagnoses...' },
]
</script>

<template>
  <PraxisAccordion :items="panels" />
</template>
```

  </template>
</ComponentDemo>

Or with slot-based content:

<ComponentDemo title="Slots">
  <div style="width: 100%; max-width: 400px;">
    <PraxisAccordion>
      <template #header>Patient Information</template>
      <div style="padding: 1rem; color: var(--vp-c-text-2);">
        <p>Name: Alice Johnson</p>
        <p>DOB: 1985-03-15</p>
      </div>
    </PraxisAccordion>
  </div>

  <template #code>

```vue
<PraxisAccordion>
  <template #header>Patient Information</template>
  <p>Name: Alice Johnson</p>
  <p>DOB: 1985-03-15</p>
</PraxisAccordion>
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
