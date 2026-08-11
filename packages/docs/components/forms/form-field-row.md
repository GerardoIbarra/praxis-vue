<script setup>
import { ref } from 'vue'
import FormFieldRow from '@praxis/ui-src/components/forms/FormFieldRow.vue'
import PraxisTimePicker from '@praxis/ui-src/components/forms/PraxisTimePicker.vue'

const startTime = ref('09:00')
const endTime = ref('17:00')
</script>

# FormFieldRow

A layout row for form fields. Wraps one or more inputs in a flex row with consistent gap and label alignment. Useful for side-by-side fields.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 500px;">
    <FormFieldRow>
      <PraxisTimePicker v-model="startTime" label="Start Time" />
      <PraxisTimePicker v-model="endTime" label="End Time" />
    </FormFieldRow>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { FormFieldRow, PraxisTimePicker } from 'praxis-vue-ui'

const startTime = ref('09:00')
const endTime = ref('17:00')
</script>

<template>
  <FormFieldRow>
    <PraxisTimePicker v-model="startTime" label="Start Time" />
    <PraxisTimePicker v-model="endTime" label="End Time" />
  </FormFieldRow>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form field components to render side by side. |
