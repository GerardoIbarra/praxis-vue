<script setup>
import { ref } from 'vue'
import GroupSelect from '@praxis/ui-src/components/base/GroupSelect.vue'

const groups = [
  { name: 'Physicians', children: [{ id: 1, name: 'Dr. Alice' }, { id: 2, name: 'Dr. Bob' }] },
  { name: 'Nurses', children: [{ id: 3, name: 'Carol RN' }, { id: 4, name: 'David RN' }] },
]
const selected = ref(null)
</script>

# GroupSelect

A select dropdown that renders grouped options with clear section headers. Built on `vue-select` with custom group rendering.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <GroupSelect
      v-model="selected"
      :options="groups"
      label="Provider"
      placeholder="Select a provider..."
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Selected ID: <strong>{{ selected || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { GroupSelect } from 'praxis-vue-ui'

const groups = [
  { name: 'Physicians', children: [{ id: 1, name: 'Dr. Alice' }, { id: 2, name: 'Dr. Bob' }] },
  { name: 'Nurses', children: [{ id: 3, name: 'Carol RN' }, { id: 4, name: 'David RN' }] },
]
const selected = ref(null)
</script>

<template>
  <GroupSelect
    v-model="selected"
    :options="groups"
    label="Provider"
    placeholder="Select a provider..."
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Selected value. Use with v-model.' },
  { name: 'options', type: 'GroupOption[]', required: true, description: 'Grouped options. Each group has a name and children array.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Field label text.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Dropdown placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'reduce', type: '(option) => unknown', default: 'option => option.id', description: 'Value extractor function.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
