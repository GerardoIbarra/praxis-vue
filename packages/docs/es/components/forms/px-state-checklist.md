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

<ComponentDemo title="Standard Checklist">
  <div style="width:100%">
    <PxStateChecklist :field="sampleField" v-model="fieldData1" :default-open="true" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxStateChecklist } from 'praxis-vue-ui'

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

  </template>
</ComponentDemo>

## Checklist With Inputs

If the schema contains `input_father` or `input` components for list children, the component automatically adapts to render text fields.

<ComponentDemo title="Checklist with Inputs">
  <div style="width:100%">
    <PxStateChecklist :field="sampleInputField" v-model="fieldData2" :default-open="true" />
  </div>

  <template #code>

```vue
<PxStateChecklist :field="inputSchema" v-model="data" :default-open="true" />
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxStateChecklist" />

### Exposed Methods

Can be accessed via a template ref to control the checklist programmatically:

| Name | Description |
|---|---|
| `clearAll()` | Resets all selections and text inputs to their default empty states. |
| `setRestFalse()` | Sets the radio value to "no" for all items that haven't been answered yet. |
| `setAllFalse()` | Sets the radio value to "no" for all items, overwriting current answers. |

> [!NOTE]
> This component is designed for schema-driven dynamic forms. For simple checklist needs without a schema, consider using `PxCheckbox` directly.
