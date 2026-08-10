# CheckListInputField

An enhanced checklist component that combines checkboxes with inline text/select inputs per row. Useful for forms where each checklist item also requires additional data entry.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { CheckListInputField } from 'praxis-vue-ui'

const items = ref([])
</script>

<template>
  <CheckListInputField
    v-model="items"
    label="Symptoms"
    :field="fieldSchema"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'Record<string, any>', default: '{}', description: 'Current values. Use with v-model.' },
  { name: 'field', type: 'FormSchemaField', required: true, description: 'Schema field definition including sub-fields for the checklist rows.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all inputs.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'Record<string, any>', description: 'Emitted whenever any field value changes.' },
]" />
