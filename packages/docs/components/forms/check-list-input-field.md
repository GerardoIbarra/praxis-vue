<script setup>
import { ref } from 'vue'
import CheckListInputField from '@praxis/ui-src/components/forms/CheckListInputField.vue'

const items = ref({})
const fieldSchema = {
  label: 'Symptoms & Severity',
  fields: {
    list_children: [
      {
        components: [
          { type: 'checkbox', name: 'fever', value: false, text: 'Fever' },
          { type: 'text', name: 'fever_severity', placeholder: 'Severity (1-10)' }
        ]
      },
      {
        components: [
          { type: 'checkbox', name: 'cough', value: false, text: 'Cough' },
          { type: 'text', name: 'cough_duration', placeholder: 'Duration (days)' }
        ]
      }
    ]
  }
}
</script>

# CheckListInputField

An enhanced checklist component that combines checkboxes with inline text/select inputs per row. Useful for forms where each checklist item also requires additional data entry.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 500px;">
    <CheckListInputField
      v-model="items"
      label="Symptoms"
      :field="fieldSchema"
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Data: <strong>{{ items }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { CheckListInputField } from 'praxis-vue-ui'

const items = ref({})
const fieldSchema = {
  label: 'Symptoms & Severity',
  fields: {
    list_children: [
      {
        components: [
          { type: 'checkbox', name: 'fever', value: false, text: 'Fever' },
          { type: 'text', name: 'fever_severity', placeholder: 'Severity (1-10)' }
        ]
      },
      {
        components: [
          { type: 'checkbox', name: 'cough', value: false, text: 'Cough' },
          { type: 'text', name: 'cough_duration', placeholder: 'Duration (days)' }
        ]
      }
    ]
  }
}
</script>

<template>
  <CheckListInputField
    v-model="items"
    label="Symptoms"
    :field="fieldSchema"
  />
</template>
```

  </template>
</ComponentDemo>

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
