# PraxisRadioButton

A styled radio button input. Works with `v-model` in a group — all radio buttons sharing the same `modelValue` ref will behave as a single group.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { PraxisRadioButton } from '@praxis/vue'

const plan = ref('monthly')
</script>

<template>
  <div class="flex gap-4">
    <div class="flex items-center gap-2">
      <PraxisRadioButton v-model="plan" value="monthly" input-id="monthly" />
      <label for="monthly">Monthly</label>
    </div>
    <div class="flex items-center gap-2">
      <PraxisRadioButton v-model="plan" value="annual" input-id="annual" />
      <label for="annual">Annual</label>
    </div>
  </div>
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', required: true, description: 'The current selected value in the radio group. Share the same ref across all buttons in a group.' },
  { name: 'value', type: 'unknown', required: true, description: 'The value this button represents. Checked when modelValue === value.' },
  { name: 'inputId', type: 'string', default: 'undefined', description: 'HTML id for the input. Use with a matching label for attribute.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this radio button.' },
  { name: 'name', type: 'string', default: 'undefined', description: 'HTML name attribute for the input (groups native radio buttons).' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted when this radio button is selected. Value is this button\'s value prop.' },
]" />
