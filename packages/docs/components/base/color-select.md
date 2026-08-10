# ColorSelect

A dropdown selector where each option displays a colored swatch alongside its label. Ideal for category or tag selection where color coding matters.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { ColorSelect } from '@praxis/vue'

const statuses = [
  { id: 1, name: 'Active', color: '22c55e' },
  { id: 2, name: 'Pending', color: 'f59e0b' },
  { id: 3, name: 'Inactive', color: 'ef4444' },
]
const selected = ref(null)
</script>

<template>
  <ColorSelect
    v-model="selected"
    :options="statuses"
    label="Status"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Selected value. Use with v-model.' },
  { name: 'options', type: 'object[]', required: true, description: 'Options with name and color (hex without #) properties.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label.' },
  { name: 'placeholder', type: 'string', default: '\'Select...\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'reduce', type: '(option) => unknown', default: 'option => option.id', description: 'Value extractor.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
