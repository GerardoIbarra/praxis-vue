<script setup>
import { ref } from 'vue'
import GroupedMultiSelect from '@praxis/ui-src/components/base/GroupedMultiSelect.vue'

const selected = ref([])
const selected2 = ref([1, 3])

const options = [
  {
    id: 'design',
    name: 'Design',
    activities: [
      { id: 1, name: 'UI Design', color: '3b82f6', duration: 60 },
      { id: 2, name: 'Prototyping', color: '8b5cf6', duration: 45 },
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    activities: [
      { id: 3, name: 'Frontend Dev', color: '10b981', duration: 90 },
      { id: 4, name: 'Code Review', color: 'f59e0b', duration: 30 },
      { id: 5, name: 'Testing', color: 'ef4444', duration: 60 },
    ]
  },
  {
    id: 'management',
    name: 'Management',
    activities: [
      { id: 6, name: 'Sprint Planning', color: '6366f1', duration: 120 },
      { id: 7, name: 'Retrospective', color: '14b8a6', duration: 60 },
    ]
  }
]
</script>

# GroupedMultiSelect

A multi-select dropdown with grouped options, checkboxes, color swatches, duration badges, and a "Select All" header. Built on top of `vue-select` with full custom rendering.

## Basic Usage

<ComponentDemo>
  <div style="width:360px">
    <GroupedMultiSelect
      v-model="selected"
      :options="options"
      placeholder="Select activities..."
    />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Selected IDs: <strong>{{ JSON.stringify(selected) }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { GroupedMultiSelect } from '@praxis/vue'

const selected = ref([])
const options = [
  {
    id: 'design',
    name: 'Design',
    activities: [
      { id: 1, name: 'UI Design', color: '3b82f6', duration: 60 },
      { id: 2, name: 'Prototyping', color: '8b5cf6', duration: 45 },
    ]
  },
  // ...
]
</script>

<template>
  <GroupedMultiSelect
    v-model="selected"
    :options="options"
    placeholder="Select activities..."
  />
</template>
```

  </template>
</ComponentDemo>

## Pre-selected Values

<ComponentDemo title="Pre-selected">
  <div style="width:360px">
    <GroupedMultiSelect
      v-model="selected2"
      :options="options"
      placeholder="Select activities..."
    />
  </div>

  <template #code>

```vue
<GroupedMultiSelect
  v-model="selected"
  :options="options"
  placeholder="Select activities..."
/>
```

  </template>
</ComponentDemo>

## Without Duration & Color

<ComponentDemo title="Simplified">
  <div style="width:360px">
    <GroupedMultiSelect
      v-model="selected"
      :options="options"
      :show-duration="false"
      :show-color="false"
      :show-select-all="false"
    />
  </div>

  <template #code>

```vue
<GroupedMultiSelect
  v-model="selected"
  :options="options"
  :show-duration="false"
  :show-color="false"
  :show-select-all="false"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'modelValue', type: '(string | number | object)[]', default: '[]', description: 'Array of selected IDs. Use with v-model.' },
  { name: 'options', type: 'GroupOption[]', required: true, description: 'Grouped options array. Each group has id/name and an activities or children array.' },
  { name: 'label', type: 'string', default: '\'label\'', description: 'Property name to use as display label for options (e.g. \'name\' or \'label\').' },
  { name: 'reduce', type: '(option) => unknown', default: 'option.id ?? option.value', description: 'Function to extract the value emitted from each selected option.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Placeholder text shown when no items are selected.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire select.' },
  { name: 'showSelectAll', type: 'boolean', default: 'true', description: 'Shows a \'Select All\' header row with checkbox and count badge.' },
  { name: 'showDuration', type: 'boolean', default: 'true', description: 'Shows duration badges (in minutes) next to each child option.' },
  { name: 'showColor', type: 'boolean', default: 'true', description: 'Shows color dot swatches next to options with a color property.' },
  { name: 'useCombinedId', type: 'boolean', default: 'false', description: 'Uses groupId_childId as the unique key to prevent ID conflicts across groups.' },
  { name: 'selectClass', type: 'string', default: '\'vue-select-standard text-gray-400\'', description: 'CSS class passed to the vue-select root element.' },
]" />

## Emits

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown[]', description: 'Emitted when selection changes. Returns array of reduced values (IDs by default).' },
]" />

## Option Interfaces

```ts
interface GroupOption {
  id?: string | number
  name: string
  label?: string
  color?: string
  activities?: ActivityOption[]   // or use children[]
  children?: ActivityOption[]
}

interface ActivityOption {
  id?: string | number
  name: string
  label?: string
  color?: string
  duration?: number               // shown as "X min" badge
}
```
