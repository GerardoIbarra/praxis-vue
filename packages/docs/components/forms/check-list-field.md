# CheckListField

An accordion-style checklist component for schema-driven forms. Renders a collapsible group of checkbox/radio fields driven by a `FormSchemaField` configuration object.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { CheckListField } from 'praxis-vue-ui'

const field = {
  label: 'Medical Conditions',
  fields: {
    list_children: [
      { components: [{ type: 'checkbox', name: 'diabetes', value: false }] },
      { components: [{ type: 'checkbox', name: 'hypertension', value: false }] },
    ]
  }
}

const data = ref({})
</script>

<template>
  <CheckListField :field="field" v-model="data" :default-open="true" />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'field', type: 'FormSchemaField', required: true, description: 'Schema definition for the checklist group including fields, labels, and types.' },
  { name: 'modelValue', type: 'Record<string, any>', default: '{}', description: 'Current values for the checklist. Use with v-model.' },
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: 'Whether the accordion is expanded by default.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'Record<string, any>', description: 'Emitted whenever a checkbox or radio value changes.' },
]" />

> [!NOTE]
> This component is designed for schema-driven dynamic forms. For simple checklist needs without a schema, consider using `PraxisCheckbox` or `CheckListInputField` directly.
