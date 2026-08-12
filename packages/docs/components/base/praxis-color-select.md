<script setup>
import { ref } from 'vue'
import PraxisColorSelect from '@praxis/ui-src/components/base/PraxisColorSelect.vue'

const statuses = [
  { id: 1, name: 'Active', color: '22c55e' },
  { id: 2, name: 'Pending', color: 'f59e0b' },
  { id: 3, name: 'Inactive', color: 'ef4444' },
]
const selected = ref(null)
</script>

# PraxisColorSelect

A dropdown selector where each option displays a colored swatch alongside its label. Ideal for category or tag selection where color coding matters.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PraxisColorSelect
      v-model="selected"
      :options="statuses"
      label="Status"
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Selected ID: <strong>{{ selected || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisColorSelect } from 'praxis-vue-ui'

const statuses = [
  { id: 1, name: 'Active', color: '22c55e' },
  { id: 2, name: 'Pending', color: 'f59e0b' },
  { id: 3, name: 'Inactive', color: 'ef4444' },
]
const selected = ref(null)
</script>

<template>
  <PraxisColorSelect
    v-model="selected"
    :options="statuses"
    label="Status"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Selected value. Use with v-model.' },
  { name: 'options', type: 'object[]', required: true, description: 'Options with name and color (hex without #) properties.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label.' },
  { name: 'placeholder', type: 'string', default: '\'Select...\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'reduce', type: '(option) => unknown', default: 'option => option.id', description: 'Value extractor.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
