# PraxisCheckbox

A styled checkbox component. Supports binary (true/false) mode and array-based multi-check (like native `<input type="checkbox">`). Wraps PrimeVue's Checkbox.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { PraxisCheckbox } from '@praxis/vue'

const agreed = ref(false)
const selected = ref([])
</script>

<template>
  <!-- Binary mode -->
  <PraxisCheckbox v-model="agreed" :binary="true" input-id="terms" />
  <label for="terms">I agree to the terms</label>

  <!-- Array mode -->
  <PraxisCheckbox v-model="selected" value="option-a" input-id="a" />
  <label for="a">Option A</label>
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'boolean | unknown[]', required: true, description: 'In binary mode: a boolean. In array mode: the array of selected values.' },
  { name: 'binary', type: 'boolean', default: 'false', description: 'When true, modelValue is a boolean toggle. When false, modelValue is an array.' },
  { name: 'value', type: 'unknown', default: 'undefined', description: 'The value added/removed from the modelValue array when checked/unchecked (array mode only).' },
  { name: 'inputId', type: 'string', default: 'undefined', description: 'HTML id for the input element. Use with a matching label for attribute.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'boolean | unknown[]', description: 'Emitted on checkbox change.' },
  { name: 'change', payload: 'Event', description: 'Native change event.' },
]" />
