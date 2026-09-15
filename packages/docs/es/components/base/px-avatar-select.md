<script setup>
import { ref } from 'vue'
import PxAvatarSelect from '@praxis/px-src/components/base/PxAvatarSelect.vue'

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
]
const selected = ref(null)
</script>

# PxAvatarSelect

A searchable select dropdown where each option displays a `PxAvatar` with the user's initials alongside their name. Ideal for user/member selection fields.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PxAvatarSelect
      v-model="selected"
      :options="users"
      placeholder="Select a team member..."
    />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxAvatarSelect } from 'praxis-vue-ui'

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
]
const selected = ref(null)
</script>

<template>
  <PxAvatarSelect
    v-model="selected"
    :options="users"
    placeholder="Select a team member..."
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Currently selected value(s). Use with v-model.' },
  { name: 'options', type: 'T[]', required: true, description: 'Array of option objects.' },
  { name: 'label', type: 'string', default: '\'name\'', description: 'Property name read from each option for its display text and avatar initials.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows selecting more than one option.' },
  { name: 'clearable', type: 'boolean', default: 'true', description: 'Shows a button to clear the current selection.' },
  { name: 'selectClass', type: 'string', default: '(preset Tailwind classes)', description: 'Custom classes for the select input.' },
  { name: 'reduce', type: '(option: T) => unknown', default: 'option => option.id ?? option.value', description: 'Extracts the value stored in modelValue from a selected option.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
