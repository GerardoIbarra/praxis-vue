# SelectListField

A single-select or multi-select field backed by a searchable dropdown. Wraps `vue-select` with Praxis styling and an optional required label.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { SelectListField } from '@praxis/vue'

const options = ['Option A', 'Option B', 'Option C']
const selected = ref(null)
</script>

<template>
  <SelectListField
    v-model="selected"
    :options="options"
    label="Category"
    :required="true"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Currently selected value. Use with v-model.' },
  { name: 'options', type: 'unknown[]', required: true, description: 'Array of options to display in the dropdown.' },
  { name: 'label', type: 'string', default: '\'name\'', description: 'Property name to use as display label for object options.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Placeholder text shown when no option is selected.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk on the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the dropdown.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Enables multi-select mode.' },
  { name: 'reduce', type: '(option) => unknown', default: 'undefined', description: 'Function to extract the emitted value from a selected option object.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
