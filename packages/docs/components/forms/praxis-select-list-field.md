<script setup>
import { ref } from 'vue'
import PraxisSelectListField from '@praxis/ui-src/components/forms/PraxisSelectListField.vue'

const field = {
  options: [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Design' },
  ],
  option_source: { label_field: 'name', value_field: 'id' },
  placeholder: 'Search department...',
}
const selected = ref([])
</script>

# PraxisSelectListField

A searchable "add to list" field backed by `PraxisInfiniteScrollSelect`. Driven by a schema-style `field` descriptor (as used by `PraxisDynamicForm`); selected items are added to a list below the dropdown and can be removed individually.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 320px;">
    <PraxisSelectListField v-model="selected" :field="field" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Selected: <strong>{{ selected.map(s => s.name).join(', ') || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisSelectListField } from 'praxis-vue-ui'

const field = {
  options: [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Design' },
  ],
  option_source: { label_field: 'name', value_field: 'id' },
  placeholder: 'Search department...',
}
const selected = ref([])
</script>

<template>
  <PraxisSelectListField v-model="selected" :field="field" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'field', type: 'FormSchemaField', required: true, description: 'Field descriptor. Must include `options` and `option_source: { label_field, value_field }`; optionally `selected_options`, `placeholder`, `pagination`.' },
  { name: 'modelValue', type: 'unknown[]', default: '[]', description: 'Currently selected items (full option objects). Use with v-model.' },
  { name: 'loadingSelect', type: 'boolean', default: 'false', description: 'Shows a loading state in the dropdown (e.g. while fetching more options).' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown[]', description: 'Emitted with the full list of selected items when one is added or removed.' },
  { name: 'update:fieldValue', payload: 'unknown[]', description: 'Emitted with just the `value_field` values of the selected items.' },
  { name: 'search', payload: 'string', description: 'Emitted as the user types in the search box.' },
]" />
