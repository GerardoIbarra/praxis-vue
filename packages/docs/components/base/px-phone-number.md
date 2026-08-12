<script setup>
import { ref } from 'vue'
import PxPhoneNumber from '@praxis/px-src/components/base/PxPhoneNumber.vue'

const phone = ref('')
</script>

# PxPhoneNumber

An international phone number input with country code selector. Backed by `vue-tel-input` and `libphonenumber-js` for validation.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <PxPhoneNumber
      v-model="phone"
      label="Phone Number"
      :required="true"
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Value: <strong>{{ phone || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxPhoneNumber } from 'px-vue-ui'

const phone = ref('')
</script>

<template>
  <PxPhoneNumber
    v-model="phone"
    label="Phone Number"
    :required="true"
  />
</template>
```

  </template>
</ComponentDemo>

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
