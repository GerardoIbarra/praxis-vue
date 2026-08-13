<script setup>
import { ref } from 'vue'
import PxSchemaForm from '@praxis/px-src/components/forms/PxSchemaForm.vue'

const schema = [
  { key: 'first_name', label: 'First Name', type: 'text', required: true },
  { key: 'last_name', label: 'Last Name', type: 'text', required: true },
  { key: 'dob', label: 'Date of Birth', type: 'date' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    option_source: { label_field: 'label', value_field: 'value' },
  },
]

const formData = ref({})
</script>

# PxSchemaForm

A fully schema-driven form engine. Renders a flat array of field definitions — text, number, date, select, checklists, and more — into a responsive grid. Powers Praxis's form builder.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <PxSchemaForm :schema="schema" v-model="formData" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Form Data: <strong>{{ formData }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxSchemaForm } from 'px-vue-ui'

const schema = [
  { key: 'first_name', label: 'First Name', type: 'text', required: true },
  { key: 'last_name', label: 'Last Name', type: 'text', required: true },
  { key: 'dob', label: 'Date of Birth', type: 'date' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    option_source: { label_field: 'label', value_field: 'value' },
  },
]

const formData = ref({})
</script>

<template>
  <PxSchemaForm :schema="schema" v-model="formData" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'schema', type: 'FormSchemaField[]', required: true, description: 'Flat array of field definitions to render.' },
  { name: 'modelValue', type: 'Record<string, any>', default: '{}', description: 'Current form data, keyed by field.key. Use with v-model.' },
  { name: 'existingData', type: 'Record<string, unknown>', default: 'undefined', description: 'Pre-existing values used to initialize fields not yet present in modelValue.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Passed down to select-type fields to show a loading state.' },
  { name: 'cleanedResults', type: 'string[]', default: '[]', description: 'v-model:cleanedResults — tracks keys touched by multiselect_list fields.' },
  { name: 'calculatedNumbers', type: 'any[]', default: '[]', description: 'v-model:calculatedNumbers — tracks fields of type calculated_number.' },
]" />

## FormSchemaField Interface

```ts
interface FormSchemaField {
  key?: string
  label?: string
  type: 'text' | 'number' | 'integer' | 'double' | 'textarea' | 'select' | 'select_list'
      | 'multiselect_list' | 'date' | 'time' | 'checkbox' | 'row' | 'check_list'
      | 'check_list_input' | 'calculated_number' | 'divider_with_components' | 'hidden'
  required?: boolean
  value?: unknown
  placeholder?: string
  readonly?: boolean
  multiple?: boolean
  options?: unknown[]
  option_source?: { label_field?: string; value_field?: string; type?: string; search_field?: string }
  components?: FormSchemaField[]   // sub-fields for the 'row' type
  [key: string]: unknown
}
```

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'Record<string, any>', description: 'Emitted on any field change with the updated form data.' },
  { name: 'update:cleanedResults', payload: 'string[]', description: 'Emitted when multiselect_list selections change.' },
  { name: 'update:calculatedNumbers', payload: 'any[]', description: 'Emitted when calculated_number fields change.' },
  { name: 'scroll-bottom', payload: 'FormSchemaField', description: 'Emitted when a select-type field\'s dropdown is scrolled near the bottom, for pagination.' },
]" />

> [!NOTE]
> `PxSchemaForm` is the most complex component in the library. See the schema type definitions in `@/types/api/common` for the full `FormSchemaField` interface, and `PxFormRow` / `PxFormMultiSelectList` / `PxSelectListField` for the sub-field types used by the `row`, `multiselect_list`, and `select_list` field types.
