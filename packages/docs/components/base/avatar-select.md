# AvatarSelect

A searchable select dropdown where each option displays a `BaseAvatar` with the user's initials alongside their name. Ideal for user/member selection fields.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { AvatarSelect } from '@praxis/vue'

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
]
const selected = ref(null)
</script>

<template>
  <AvatarSelect
    v-model="selected"
    :options="users"
    label="Assign To"
    placeholder="Select a team member..."
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Currently selected user. Use with v-model.' },
  { name: 'options', type: 'object[]', required: true, description: 'Array of user objects. Must have a name property for avatar initials.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label.' },
  { name: 'placeholder', type: 'string', default: '\'Select...\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks as required.' },
  { name: 'reduce', type: '(option) => unknown', default: 'option => option.id', description: 'Value extractor.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
