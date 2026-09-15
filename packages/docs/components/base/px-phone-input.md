<script setup>
import { ref } from 'vue'
import PxPhoneInput from '@praxis/px-src/components/base/PxPhoneInput.vue'
import PxLabel from '@praxis/px-src/components/base/PxLabel.vue'

const phone = ref('')
</script>

# PxPhoneInput

An international phone number input with country code selector, built on `vue-tel-input`. Validation runs through [vee-validate](https://vee-validate.logaretm.com/) — the component wraps its input in a `<Field>` and requires a `name` prop.

::: tip No built-in label
The component doesn't render a label itself. Pair it with [`PxLabel`](/components/base/px-label) if you need one, as shown below.
:::

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <PxLabel label="Phone Number" for="phone" />
    <PxPhoneInput v-model="phone" name="phone" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Value: <strong>{{ phone || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxPhoneInput, PxLabel } from 'praxis-vue-ui'

const phone = ref('')
</script>

<template>
  <PxLabel label="Phone Number" for="phone" />
  <PxPhoneInput v-model="phone" name="phone" />
</template>
```

  </template>
</ComponentDemo>

## Required Field

Pass a `rules` string/object understood by vee-validate — `"required"` marks the field mandatory:

```vue
<PxPhoneInput v-model="phone" name="phone" rules="required" />
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'string', default: '\'\'', description: 'Phone number value. Use with v-model.' },
  { name: 'name', type: 'string', required: true, description: 'Field name registered with vee-validate — required for validation to work.' },
  { name: 'rules', type: 'string | Record<string, unknown> | ((value: unknown) => boolean | string)', default: '\'\'', description: 'vee-validate rules, e.g. \'required\'.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string', description: 'Emitted on input change.' },
]" />
