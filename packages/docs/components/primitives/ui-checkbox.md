<script setup>
import { ref } from 'vue'
import UiCheckbox from '@praxis/ui-src/components/_primitives/UiCheckbox.vue'

const agreed = ref(false)
const selected = ref([])
</script>

# UiCheckbox

A styled checkbox component. Supports binary (true/false) mode and array-based multi-check (like native `<input type="checkbox">`). Wraps PrimeVue's Checkbox.

## Usage

<ComponentDemo>
  <div style="display:flex; flex-direction:column; gap:1.5rem;">
    <!-- Binary mode -->
    <div>
      <h3 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Binary Mode</h3>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <UiCheckbox v-model="agreed" :binary="true" input-id="terms" />
        <label for="terms" style="cursor:pointer; font-size: 0.9rem;">I agree to the terms</label>
      </div>
      <p style="margin-top:0.5rem;font-size:0.8rem;color:var(--vp-c-text-2)">
        Value: <strong>{{ agreed }}</strong>
      </p>
    </div>

    <!-- Array mode -->
    <div>
      <h3 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Array Mode</h3>
      <div style="display:flex; gap: 1rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <UiCheckbox v-model="selected" value="option-a" input-id="a" />
          <label for="a" style="cursor:pointer; font-size: 0.9rem;">Option A</label>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <UiCheckbox v-model="selected" value="option-b" input-id="b" />
          <label for="b" style="cursor:pointer; font-size: 0.9rem;">Option B</label>
        </div>
      </div>
      <p style="margin-top:0.5rem;font-size:0.8rem;color:var(--vp-c-text-2)">
        Selected: <strong>{{ selected }}</strong>
      </p>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { UiCheckbox } from 'praxis-vue-ui'

const agreed = ref(false)
const selected = ref([])
</script>

<template>
  <!-- Binary mode -->
  <UiCheckbox v-model="agreed" :binary="true" input-id="terms" />
  <label for="terms">I agree to the terms</label>

  <!-- Array mode -->
  <UiCheckbox v-model="selected" value="option-a" input-id="a" />
  <label for="a">Option A</label>
  <UiCheckbox v-model="selected" value="option-b" input-id="b" />
  <label for="b">Option B</label>
</template>
```

  </template>
</ComponentDemo>

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
