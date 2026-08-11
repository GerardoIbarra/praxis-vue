<script setup>
import { ref } from 'vue'
import DynamicForm from '@praxis/ui-src/components/forms/DynamicForm.vue'

const schema = {
  sections: [
    {
      title: 'Personal Info',
      fields: [
        { name: 'first_name', label: 'First Name', type: 'text', required: true },
        { name: 'last_name', label: 'Last Name', type: 'text', required: true },
        { name: 'dob', label: 'Date of Birth', type: 'date' },
      ]
    }
  ]
}

const formData = ref({})
</script>

# DynamicForm

A fully schema-driven form engine. Renders any combination of input types, selects, date pickers, checklists, and file uploads from a `FormSchema` JSON definition. Powers Praxis's form builder.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <DynamicForm
      :schema="schema"
      v-model="formData"
      @submit="console.log"
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Form Data: <strong>{{ formData }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { DynamicForm } from 'praxis-vue-ui'

const schema = {
  sections: [
    {
      title: 'Personal Info',
      fields: [
        { name: 'first_name', label: 'First Name', type: 'text', required: true },
        { name: 'last_name', label: 'Last Name', type: 'text', required: true },
        { name: 'dob', label: 'Date of Birth', type: 'date' },
      ]
    }
  ]
}

const formData = ref({})
</script>

<template>
  <DynamicForm
    :schema="schema"
    v-model="formData"
    @submit="onSubmit"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'schema', type: 'FormSchema', required: true, description: 'The form schema definition. Describes all sections and fields to render.' },
  { name: 'modelValue', type: 'Record<string, any>', default: '{}', description: 'Current form data. Use with v-model.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Puts the entire form in read-only mode.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state on the submit button.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'Record<string, any>', description: 'Emitted on any field change with the updated form data.' },
  { name: 'submit', payload: 'Record<string, any>', description: 'Emitted when the form is submitted and valid.' },
]" />

> [!NOTE]
> `DynamicForm` is the most complex component in the library. See the schema type definitions in `@/types/api/common` for the full `FormSchema` interface.
