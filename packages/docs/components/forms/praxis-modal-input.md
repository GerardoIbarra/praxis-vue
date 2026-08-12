<script setup>
import { ref } from 'vue'
import PraxisModalInput from '@praxis/ui-src/components/forms/PraxisModalInput.vue'
import UiDialog from '@praxis/ui-src/components/_primitives/UiDialog.vue'

const value = ref('')
const showModal = ref(false)

const openModal = () => { showModal.value = true }
const selectProvider = (name) => {
  value.value = name
  showModal.value = false
}
</script>

# PraxisModalInput

A text input with a built-in modal/dialog trigger button. Useful for opening a selection modal from within a form field, showing the selected value as read-only text.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PraxisModalInput
      :model-value="value"
      label="Provider"
      placeholder="Click to select a provider..."
      @click="openModal"
    />
  </div>
  
  <ClientOnly>
    <UiDialog v-model:visible="showModal" header="Select Provider">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0;">
        <button @click="selectProvider('Dr. Alice Johnson')" class="input-base" style="cursor:pointer; text-align:left;">Dr. Alice Johnson</button>
        <button @click="selectProvider('Dr. Bob Smith')" class="input-base" style="cursor:pointer; text-align:left;">Dr. Bob Smith</button>
      </div>
    </UiDialog>
  </ClientOnly>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisModalInput, UiDialog } from 'praxis-vue-ui'

const value = ref('')
const showModal = ref(false)

const openModal = () => { showModal.value = true }
</script>

<template>
  <PraxisModalInput
    :model-value="value"
    label="Provider"
    placeholder="Click to select a provider..."
    @click="openModal"
  />

  <UiDialog v-model:visible="showModal" header="Select Provider">
    <!-- Modal content and selection logic -->
  </UiDialog>
</template>
```

  </template>
</ComponentDemo>

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
