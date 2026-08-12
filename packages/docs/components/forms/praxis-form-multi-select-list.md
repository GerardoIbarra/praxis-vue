<script setup>
import { ref } from 'vue'
import PraxisFormMultiSelectList from '@praxis/ui-src/components/forms/PraxisFormMultiSelectList.vue'

const field = {
  search: true,
  options: [
    {
      options: [
        { label: 'Urgent', value: 'urgent' },
        { label: 'Follow-up', value: 'follow_up' },
        { label: 'Reviewed', value: 'reviewed' },
      ],
    },
  ],
  components: [
    { key: 'urgent', label: 'Urgent', components: [{ type: 'static_text', label: 'Flag for immediate attention' }] },
    { key: 'follow_up', label: 'Follow-up', components: [{ key: 'follow_up_days', type: 'integer', label: 'Days', value: 7, placeholder: 'Days until follow-up' }] },
    { key: 'reviewed', label: 'Reviewed', components: [{ type: 'static_text', label: 'Marked as reviewed' }] },
  ],
}
const selected = ref([])
</script>

# PraxisFormMultiSelectList

A multi-select dropdown that reveals extra sub-fields for each selected option. Backed by a `field.options[0].options` list for the dropdown, and `field.components` for the sub-fields shown per selection (matched by `key`).

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <PraxisFormMultiSelectList v-model="selected" :field="field" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Selected: <strong>{{ selected.join(', ') || 'None' }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisFormMultiSelectList } from 'praxis-vue-ui'

const field = {
  search: true,
  options: [
    {
      options: [
        { label: 'Urgent', value: 'urgent' },
        { label: 'Follow-up', value: 'follow_up' },
        { label: 'Reviewed', value: 'reviewed' },
      ],
    },
  ],
  components: [
    { key: 'urgent', label: 'Urgent', components: [{ type: 'static_text', label: 'Flag for immediate attention' }] },
    { key: 'follow_up', label: 'Follow-up', components: [{ key: 'follow_up_days', type: 'integer', label: 'Days', value: 7, placeholder: 'Days until follow-up' }] },
    { key: 'reviewed', label: 'Reviewed', components: [{ type: 'static_text', label: 'Marked as reviewed' }] },
  ],
}
const selected = ref([])
</script>

<template>
  <PraxisFormMultiSelectList v-model="selected" :field="field" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'field', type: 'object', required: true, description: 'Field definition. `field.options[0].options` supplies the dropdown options; `field.components` supplies the sub-fields shown per selected option, matched by key.' },
  { name: 'modelValue', type: 'unknown[]', default: '[]', description: 'Array of selected option values. Use with v-model.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown[]', description: 'Emitted on selection change.' },
]" />
