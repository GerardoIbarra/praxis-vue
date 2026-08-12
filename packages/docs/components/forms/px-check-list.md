<script setup>
import { ref } from 'vue'
import PxCheckList from '@praxis/px-src/components/forms/PxCheckList.vue'

const fieldData1 = ref({})
const fieldData2 = ref({})

const sampleField = {
  label: "Medical History",
  type: "check_list",
  fields: {
    list_children: [
      { key: "diabetes", label: "Diabetes", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hypertension", label: "Hypertension", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}

const sampleInputField = {
  label: "Medications",
  type: "check_list_input",
  fields: {
    input_father: { type: "input", value: "" },
    list_children: [
      { key: "med1", label: "Aspirin", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "med2", label: "Ibuprofen", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] }
    ]
  }
}
</script>

# PxCheckList

A dynamic, schema-driven checklist component designed to render complex boolean/history options (Yes/No/History) for a predefined list of items. It supports optional text inputs per item based on the schema configuration.

## Standard Checklist

Renders a list of items with Positive (+), Negative (-), and History (H) options.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxCheckList :field="sampleField" v-model="fieldData1" :default-open="true" />
</div>

```vue
<script setup>
import { PxCheckList } from 'px-vue-ui'

const data = ref({})
const field = {
  label: "Medical History",
  type: "check_list",
  fields: {
    list_children: [
      { key: "diabetes", label: "Diabetes", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hypertension", label: "Hypertension", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}
</script>

<template>
  <PxCheckList :field="field" v-model="data" :default-open="true" />
</template>
```

## Checklist With Inputs

If the schema contains `input_father` or `input` components for list children, the component automatically adapts to render text fields.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxCheckList :field="sampleInputField" v-model="fieldData2" :default-open="true" />
</div>

```vue
<PxCheckList :field="inputSchema" v-model="data" :default-open="true" />
```

## API

### Props

| Name | Type | Default | Description |
|---|---|---|---|
| `field` | `FormSchemaField` | **Required** | The schema configuration defining the checklist structure, including `list_children` and `components`. |
| `modelValue` | `Record<string, any>` | `{}` | The v-model binding containing the selected values. |
| `defaultOpen` | `boolean` | `true` | Whether the accordion section should be open initially. |

### Exposed Methods

Can be accessed via a template ref to control the checklist programmatically:

| Name | Description |
|---|---|
| `clearAll()` | Resets all selections and text inputs to their default empty states. |
| `setRestNegative()` | Sets the radio value to "no" for all items that haven't been answered yet. |
| `setAllNegative()` | Sets the radio value to "no" for all items, overwriting current answers. |

> [!NOTE]
> This component is designed for schema-driven dynamic forms. For simple checklist needs without a schema, consider using `PxCheckbox` directly.
