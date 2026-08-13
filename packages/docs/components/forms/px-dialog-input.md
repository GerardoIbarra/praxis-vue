<script setup>
import { ref } from 'vue'
import PxDialogInput from '@praxis/px-src/components/forms/PxDialogInput.vue'
import PxDialog from '@praxis/px-src/components/_primitives/PxDialog.vue'

const value = ref('')
const showModal = ref(false)

const openModal = () => { showModal.value = true }
const selectProvider = (name) => {
  value.value = name
  showModal.value = false
}
</script>

# PxDialogInput

A text input with a built-in modal/dialog trigger button. Useful for opening a selection modal from within a form field, showing the selected value as read-only text.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PxDialogInput
      :model-value="value"
      label="Provider"
      placeholder="Click to select a provider..."
      @click="openModal"
    />
  </div>
  
  <ClientOnly>
    <PxDialog v-model:visible="showModal" header="Select Provider">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0;">
        <button @click="selectProvider('Dr. Alice Johnson')" class="input-base" style="cursor:pointer; text-align:left;">Dr. Alice Johnson</button>
        <button @click="selectProvider('Dr. Bob Smith')" class="input-base" style="cursor:pointer; text-align:left;">Dr. Bob Smith</button>
      </div>
    </PxDialog>
  </ClientOnly>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxDialogInput, PxDialog } from 'px-vue-ui'

const value = ref('')
const showModal = ref(false)

const openModal = () => { showModal.value = true }
</script>

<template>
  <PxDialogInput
    :model-value="value"
    label="Provider"
    placeholder="Click to select a provider..."
    @click="openModal"
  />

  <PxDialog v-model:visible="showModal" header="Select Provider">
    <!-- Modal content and selection logic -->
  </PxDialog>
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
