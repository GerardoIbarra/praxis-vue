# SelectableList

A dual-pane list component combining a searchable select/dropdown on top with a table of selected items below. Supports infinite scroll, avatar display, color pickers per item, and additional custom fields.

## Basic Usage

```vue
<script setup>
import { ref } from 'vue'
import { SelectableList } from '@praxis/vue'

const options = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Carol Williams' },
]
const selected = ref([])
</script>

<template>
  <SelectableList
    title="Team Members"
    :options="options"
    :selected-items="selected"
    @update:selected-items="selected = $event"
  />
</template>
```

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'options', type: 'SelectableItem[]', required: true, description: 'Available items to select from.' },
  { name: 'selectedItems', type: 'SelectableItem[]', required: true, description: 'Currently selected items. Display in the table below the select.' },
  { name: 'title', type: 'string', required: true, description: 'Label shown above the select input.' },
  { name: 'isRequired', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
  { name: 'placeholder', type: 'string', default: '\'Choose item\'', description: 'Select input placeholder text.' },
  { name: 'labelField', type: 'string', default: '\'name\'', description: 'Object property to use as display label.' },
  { name: 'valueField', type: 'string', default: '\'id\'', description: 'Object property to use as unique key.' },
  { name: 'showColorPicker', type: 'boolean', default: 'false', description: 'Shows a color picker column in the selected items table.' },
  { name: 'columns', type: 'string[]', default: '[\'Color\', \'Name\', \'Actions\']', description: 'Column headers for the selected items table.' },
  { name: 'additionalFields', type: 'AdditionalField[]', default: '[]', description: 'Extra editable fields per selected item (text, select, or input type).' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select input.' },
  { name: 'showButtonDelete', type: 'boolean', default: 'true', description: 'Shows the delete button per row in the selected items table.' },
  { name: 'isInfinity', type: 'boolean', default: 'false', description: 'Enables infinite scroll mode on the select dropdown.' },
  { name: 'hasMore', type: 'boolean', default: 'false', description: 'Indicates more items available to load (used with isInfinity).' },
  { name: 'loadingScroll', type: 'boolean', default: 'false', description: 'Shows a spinner at the bottom of the dropdown when loading more.' },
  { name: 'loadMoreScroll', type: '() => Promise<void>', default: 'undefined', description: 'Async function called when the user scrolls to the bottom of the dropdown.' },
  { name: 'searchFunction', type: '(query: string) => void', default: 'undefined', description: 'Custom search handler. Called on input change instead of local filtering.' },
  { name: 'showAvatar', type: 'boolean', default: 'false', description: 'Shows a BaseAvatar in each option row.' },
]" />

## Emits

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:selectedItems', payload: 'SelectableItem[]', description: 'Emitted when an item is added or removed from the selected list.' },
  { name: 'update:options', payload: 'SelectableItem[]', description: 'Emitted when the options list is modified (e.g. infinite scroll).' },
]" />
