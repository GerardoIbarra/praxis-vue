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
      label="Assign To"
      placeholder="Select a team member..."
    />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxAvatarSelect } from 'px-vue-ui'

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
    label="Assign To"
    placeholder="Select a team member..."
  />
</template>
```

  </template>
</ComponentDemo>

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
