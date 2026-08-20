---
title: PxSelect
description: A powerful, flexible, native Vue select component with search and multi-select.
---

<script setup>
import { ref } from 'vue'
import { Search } from '@lucide/vue'
import PxSelect from '@praxis/px-src/components/_primitives/PxSelect.vue'

const selectedSingle = ref(null)
const selectedMultiple = ref([])

const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Date' }
]
</script>

# PxSelect

A robust, fully native, and highly customizable select/combobox component. Replaces external libraries while offering features like search, multi-select with chips, dynamic reducers, custom slots, and keyboard navigation.

## Basic Usage

### Single Select

<div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 flex gap-4">
  <div class="w-64">
    <PxSelect 
      v-model="selectedSingle" 
      :options="options" 
      placeholder="Select a fruit" 
    />
  </div>
  <div class="flex-1">
    <p class="text-sm font-semibold">Selected Value:</p>
    <pre class="bg-surface-100 dark:bg-surface-800 p-2 rounded text-sm">{{ selectedSingle }}</pre>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selected = ref(null)
const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' }
]
</script>

<template>
  <PxSelect 
    v-model="selected" 
    :options="options" 
    placeholder="Select a fruit" 
  />
</template>
```

### Multi Select & Search

Set `multiple` to `true` to enable chip-based multi-selection, and `searchable` to `true` to enable a search input within the dropdown.

<div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 flex gap-4">
  <div class="w-64">
    <PxSelect 
      v-model="selectedMultiple" 
      :options="options" 
      :multiple="true"
      :searchable="true"
      placeholder="Select fruits..." 
    />
  </div>
  <div class="flex-1">
    <p class="text-sm font-semibold">Selected Values:</p>
    <pre class="bg-surface-100 dark:bg-surface-800 p-2 rounded text-sm">{{ selectedMultiple }}</pre>
  </div>
</div>

```vue
<PxSelect 
  v-model="selectedMultiple" 
  :options="options" 
  :multiple="true"
  :searchable="true"
  placeholder="Select fruits..." 
/>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown | unknown[]', default: 'undefined', description: 'The bound value of the select.' },
  { name: 'options', type: 'any[]', default: '[]', description: 'Array of objects or strings to be used as options.' },
  { name: 'optionLabel', type: 'string', default: '\'label\'', description: 'The object key to display as the option text.' },
  { name: 'optionValue', type: 'string | function', default: 'undefined', description: 'The property or function to use as the returned value. If undefined, the whole object is returned.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Enables multiple selection (chips).' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Shows an inline search input inside the dropdown.' },
  { name: 'filterBy', type: 'function', default: 'undefined', description: 'Custom filter function for search: (option, search) => boolean.' },
  { name: 'placeholder', type: 'string', default: '\'Select an option\'', description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select interaction.' }
]" />

## Slots

| Slot Name | Description | Scope |
| --- | --- | --- |
| `selected-option` | Customizes the selected item display (or chip). | `{ option }` |
| `option` | Customizes the rendering of each item in the dropdown list. | `{ option, index }` |
| `list-header` | Content to inject at the top of the dropdown menu (e.g. Select All). | `-` |
| `list-footer` | Content to inject at the bottom of the dropdown menu (e.g. Infinite Loader). | `-` |
| `no-options` | What to display when there are no options or no search results. | `-` |
| `icon` | The icon to show on the right side of the select (default: Chevron). | `-` |

## Emits

- **update:modelValue**: Emitted when the selection changes.
- **change**: Same as `update:modelValue`.
- **open**: Emitted when the dropdown opens.
- **close**: Emitted when the dropdown closes.
- **search**: Emitted when the user types in the search input.
- **search:blur**: Emitted when the search input loses focus.
- **option:selected**: Emitted specifically when an option is clicked, passing the selected option object.
