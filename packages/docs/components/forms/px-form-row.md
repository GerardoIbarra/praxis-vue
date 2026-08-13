<script setup>
import { ref } from 'vue'
import PxFormRow from '@praxis/px-src/components/forms/PxFormRow.vue'

const field = ref({
  required: false,
  components: [
    { type: 'static_text', label: 'Between' },
    { key: 'min_age', type: 'integer', value: 18 },
    { type: 'static_text', label: 'and' },
    { key: 'max_age', type: 'integer', value: 65 },
  ],
})
</script>

# PxFormRow

A schema-driven row of sub-fields. Renders a mix of static text, number inputs, and searchable selects side by side from a `field.components` definition — e.g. a "between X and Y" range field. Used internally by `PxSchemaForm`.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 500px;">
    <PxFormRow :field="field" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxFormRow } from 'px-vue-ui'

const field = ref({
  required: false,
  components: [
    { type: 'static_text', label: 'Between' },
    { key: 'min_age', type: 'integer', value: 18 },
    { type: 'static_text', label: 'and' },
    { key: 'max_age', type: 'integer', value: 65 },
  ],
})
</script>

<template>
  <PxFormRow :field="field" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'field', type: 'object', required: true, description: 'Field definition. `field.components` is a list of sub-components (static_text, integer, select) rendered side by side.' },
  { name: 'getFieldRules', type: '(comp) => string', default: '() => \'\'', description: 'Returns a vee-validate rules string for a given sub-component.' },
  { name: 'getMinNumberValue', type: '(comp) => number | null', default: '() => null', description: 'Returns the min value for an integer sub-component.' },
  { name: 'getMaxNumberValue', type: '(comp) => number | null', default: '() => null', description: 'Returns the max value for an integer sub-component.' },
  { name: 'validateMinRange', type: '(comp) => void', default: '() => {}', description: 'Called to validate the lower bound of an integer sub-component.' },
  { name: 'validateMaxRange', type: '(comp) => void', default: '() => {}', description: 'Called to validate the upper bound of an integer sub-component.' },
]" />

## FieldComponent Interface

```ts
interface FieldComponent {
  key?: string
  type: 'static_text' | 'integer' | 'select'
  label?: string
  value?: unknown
  rules?: Record<string, unknown>
  option_source?: { options: { label: string; value: unknown }[] }
}
```

## Emits

<EmitsTable :rows="[
  { name: 'search', payload: '{ field, searchTerm }', description: 'Emitted while typing in a select-type sub-component.' },
  { name: 'change', payload: '{ option, field }', description: 'Emitted when a select-type sub-component value changes.' },
]" />
