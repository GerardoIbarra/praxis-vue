<script setup>
import { ref } from 'vue'
import PxStateChecklist from '@praxis/px-src/components/forms/PxStateChecklist.vue'

const fieldData1 = ref({})
const fieldData2 = ref({})

const sampleField = {
  label: "System Preferences",
  type: "check_list",
  fields: {
    list_children: [
      { key: "auto_save", label: "Auto Save", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "dark_mode", label: "Dark Mode", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "notifications", label: "Push Notifications", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "telemetry", label: "Send Telemetry Data", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hardware_accel", label: "Hardware Acceleration", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}

const sampleInputField = {
  label: "Extensions",
  type: "check_list_input",
  fields: {
    input_father: { type: "input", value: "" },
    list_children: [
      { key: "ext1", label: "AdBlocker", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext2", label: "Grammarly", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext3", label: "Vue DevTools", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext4", label: "React DevTools", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] }
    ]
  }
}
</script>

# PxStateChecklist

A dynamic, schema-driven checklist component designed to render complex tri-state options (True/False/Flagged) for a predefined list of items. It supports optional text inputs per item based on the schema configuration.

## Standard Checklist

Renders a list of items with True (✓), False (✗), and Flagged (⚑) options.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxStateChecklist :field="sampleField" v-model="fieldData1" :default-open="true" />
</div>

```vue
<script setup>
import { PxStateChecklist } from 'px-vue-ui'

const data = ref({})
const field = {
  label: "System Preferences",
  type: "check_list",
  fields: {
    list_children: [
      { key: "auto_save", label: "Auto Save", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "dark_mode", label: "Dark Mode", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "notifications", label: "Push Notifications", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "telemetry", label: "Send Telemetry Data", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hardware_accel", label: "Hardware Acceleration", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}
</script>

<template>
  <PxStateChecklist :field="field" v-model="data" :default-open="true" />
</template>
```

## Checklist With Inputs

If the schema contains `input_father` or `input` components for list children, the component automatically adapts to render text fields.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxStateChecklist :field="sampleInputField" v-model="fieldData2" :default-open="true" />
</div>

```vue
<PxStateChecklist :field="inputSchema" v-model="data" :default-open="true" />
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
| `setRestFalse()` | Sets the radio value to "no" for all items that haven't been answered yet. |
| `setAllFalse()` | Sets the radio value to "no" for all items, overwriting current answers. |

> [!NOTE]
> This component is designed for schema-driven dynamic forms. For simple checklist needs without a schema, consider using `PxCheckbox` directly.
