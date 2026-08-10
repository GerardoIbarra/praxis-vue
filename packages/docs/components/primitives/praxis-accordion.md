# PraxisAccordion

A collapsible accordion component. Renders one or more panels that expand/collapse on header click. Supports single or multiple active panels.

## Usage

```vue
<script setup>
import { PraxisAccordion } from 'praxis-vue-ui'

const panels = [
  { id: 'info', header: 'Patient Information', content: 'Name, DOB, ID...' },
  { id: 'contact', header: 'Contact Details', content: 'Phone, Email...' },
  { id: 'medical', header: 'Medical History', content: 'Diagnoses...' },
]
</script>

<template>
  <PraxisAccordion :panels="panels" />
</template>
```

Or with slot-based content:

```vue
<PraxisAccordion>
  <template #header>Patient Information</template>
  <p>Name: Alice Johnson</p>
  <p>DOB: 1985-03-15</p>
</PraxisAccordion>
```

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
