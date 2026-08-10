# FormMultiSelectList

A compact multi-select component that combines a select dropdown with a tag/badge display of selected items. Styled for use inside form layouts.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { FormMultiSelectList } from 'praxis-vue-ui'

const tags = [
  { id: 1, name: 'Urgent' },
  { id: 2, name: 'Follow-up' },
  { id: 3, name: 'Reviewed' },
]
const selected = ref([])
</script>

<template>
  <FormMultiSelectList
    v-model="selected"
    :options="tags"
    label="Tags"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown[]', default: '[]', description: 'Array of selected values. Use with v-model.' },
  { name: 'options', type: 'unknown[]', required: true, description: 'Available options for the dropdown.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label displayed above the select.' },
  { name: 'placeholder', type: 'string', default: '\'Select...\'', description: 'Placeholder for the dropdown.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown[]', description: 'Emitted on selection change.' },
]" />
