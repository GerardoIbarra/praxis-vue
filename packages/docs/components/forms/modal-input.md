# ModalInput

A text input with a built-in modal/dialog trigger button. Useful for opening a selection modal from within a form field, showing the selected value as read-only text.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { ModalInput } from 'praxis-vue-ui'

const value = ref('')
const showModal = ref(false)

const openModal = () => { showModal.value = true }
</script>

<template>
  <ModalInput
    :model-value="value"
    label="Provider"
    placeholder="Click to select a provider..."
    @click="openModal"
  />

  <MyProviderModal v-model:visible="showModal" @select="value = $event" />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'string', default: '\'\'', description: 'Text value displayed in the read-only input.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Label above the input.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Placeholder text when no value is selected.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'click', payload: 'void', description: 'Emitted when the modal trigger button is clicked.' },
]" />
