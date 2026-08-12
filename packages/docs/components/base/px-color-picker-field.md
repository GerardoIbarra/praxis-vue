<script setup>
import { ref } from 'vue'
import PxColorPickerField from '@praxis/px-src/components/base/PxColorPickerField.vue'

const color1 = ref('3b82f6')
const color2 = ref('ef4444')
const colorDisabled = ref('94a3b8')
</script>

# PxColorPickerField

A dual-input color picker that syncs a native `<input type="color">` with a hex text field. Accepts and emits hex values without the `#` prefix.

## Basic Usage

<ComponentDemo>
  <div style="width:280px">
    <PxColorPickerField v-model="color1" label="Brand Color" />
    <p style="margin-top:0.5rem;font-size:0.875rem;color:var(--vp-c-text-2)">
      Value: <strong>#{{ color1 }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxColorPickerField } from 'px-vue-ui'

const color = ref('3b82f6')
</script>

<template>
  <PxColorPickerField
    v-model="color"
    label="Brand Color"
  />
  <p>Value: #{{ color }}</p>
</template>
```

  </template>
</ComponentDemo>

## Required Field

<ComponentDemo title="Required">
  <div style="width:280px">
    <PxColorPickerField v-model="color2" label="Primary Color" :required="true" />
  </div>

  <template #code>

```vue
<PxColorPickerField
  v-model="color"
  label="Primary Color"
  :required="true"
/>
```

  </template>
</ComponentDemo>

## Disabled State

<ComponentDemo title="Disabled">
  <div style="width:280px">
    <PxColorPickerField v-model="colorDisabled" label="Read-only Color" :disabled="true" />
  </div>

  <template #code>

```vue
<PxColorPickerField
  v-model="color"
  label="Read-only Color"
  :disabled="true"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'modelValue', type: 'string', default: '\'\'', description: 'Hex color value without the # prefix (e.g. \'3b82f6\'). Use with v-model.' },
  { name: 'label', type: 'string', default: '\'\'', description: 'Label text displayed above the input.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required. Adds a red asterisk to the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the color picker and the text input.' },
  { name: 'placeholder', type: 'string', default: '\'000000\'', description: 'Placeholder text for the hex input field.' },
  { name: 'error', type: 'string', default: '\'\'', description: 'Error message displayed below the input in red.' },
]" />

## Emits

<div class="px-section-header">
  <span class="px-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string', description: 'Emitted on every color change. Value is a 6-character hex string without #.' },
]" />

## Notes

- Accepts input with or without `#` — normalizes internally.
- The text input only allows hex characters (`0-9`, `a-f`, `A-F`) and caps at 6 characters.
- The color picker swatch and text input are kept in sync bidirectionally.
