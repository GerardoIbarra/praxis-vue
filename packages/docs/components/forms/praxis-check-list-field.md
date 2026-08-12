<script setup>
import { ref } from 'vue'
import PraxisCheckListField from '@praxis/ui-src/components/forms/PraxisCheckListField.vue'

const field = {
  label: 'Notification Preferences',
  fields: {
    list_children: [
      { components: [{ type: 'checkbox', name: 'email', value: false }] },
      { components: [{ type: 'checkbox', name: 'sms', value: false }] },
    ]
  }
}

const data = ref({})
</script>

# PraxisCheckListField

An accordion-style checklist component for schema-driven forms. Renders a collapsible group of checkbox/radio fields driven by a `FormSchemaField` configuration object.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <PraxisCheckListField :field="field" v-model="data" :default-open="true" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Form Data: <strong>{{ data }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisCheckListField } from 'praxis-vue-ui'

const field = {
  label: 'Notification Preferences',
  fields: {
    list_children: [
      { components: [{ type: 'checkbox', name: 'email', value: false }] },
      { components: [{ type: 'checkbox', name: 'sms', value: false }] },
    ]
  }
}

const data = ref({})
</script>

<template>
  <PraxisCheckListField :field="field" v-model="data" :default-open="true" />
</template>
```

  </template>
</ComponentDemo>

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
> This component is designed for schema-driven dynamic forms. For simple checklist needs without a schema, consider using `UiCheckbox` or `PraxisCheckListInputField` directly.
