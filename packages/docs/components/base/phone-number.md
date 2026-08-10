# PhoneNumber

An international phone number input with country code selector. Backed by `vue-tel-input` and `libphonenumber-js` for validation.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { PhoneNumber } from '@praxis/vue'

const phone = ref('')
</script>

<template>
  <PhoneNumber
    v-model="phone"
    label="Phone Number"
    :required="true"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'string', default: '\'\'', description: 'Phone number value (E.164 format). Use with v-model.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label text.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
  { name: 'placeholder', type: 'string', default: '\'Enter phone number\'', description: 'Input placeholder.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string', description: 'Emitted on input change with the formatted phone number.' },
  { name: 'validate', payload: 'boolean', description: 'Emitted with the validation state of the current phone number.' },
]" />
