<script setup>
import { ref } from 'vue'
import UiRadioButton from '@praxis/ui-src/components/_primitives/UiRadioButton.vue'

const plan = ref('monthly')
</script>

# UiRadioButton

A styled radio button input. Works with `v-model` in a group — all radio buttons sharing the same `modelValue` ref will behave as a single group.

## Usage

<ComponentDemo>
  <div style="display:flex; flex-direction:column; gap:1.5rem;">
    <div style="display:flex; gap: 2rem;">
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <UiRadioButton v-model="plan" value="monthly" input-id="monthly" />
        <label for="monthly" style="cursor:pointer; font-size: 0.9rem;">Monthly</label>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <UiRadioButton v-model="plan" value="annual" input-id="annual" />
        <label for="annual" style="cursor:pointer; font-size: 0.9rem;">Annual</label>
      </div>
    </div>
    <p style="font-size:0.8rem;color:var(--vp-c-text-2)">
      Selected Plan: <strong>{{ plan }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { UiRadioButton } from 'praxis-vue-ui'

const plan = ref('monthly')
</script>

<template>
  <div class="flex gap-4">
    <div class="flex items-center gap-2">
      <UiRadioButton v-model="plan" value="monthly" input-id="monthly" />
      <label for="monthly">Monthly</label>
    </div>
    <div class="flex items-center gap-2">
      <UiRadioButton v-model="plan" value="annual" input-id="annual" />
      <label for="annual">Annual</label>
    </div>
  </div>
</template>
```

  </template>
</ComponentDemo>

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
