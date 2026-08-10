# DisplayOptions

A compact options bar component for toggling between different view modes or display settings (e.g., switching between table/card/calendar view). Renders a group of button options.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { DisplayOptions } from '@praxis/vue'

const view = ref('table')
const options = [
  { key: 'table', label: 'Table', icon: 'Table' },
  { key: 'card', label: 'Cards', icon: 'LayoutGrid' },
  { key: 'calendar', label: 'Calendar', icon: 'Calendar' },
]
</script>

<template>
  <DisplayOptions v-model="view" :options="options" />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'string', required: true, description: 'Currently active option key. Use with v-model.' },
  { name: 'options', type: 'DisplayOption[]', required: true, description: 'Array of display options to render as toggle buttons.' },
]" />

## DisplayOption Interface

```ts
interface DisplayOption {
  key: string        // Unique identifier, used as modelValue
  label: string      // Button text
  icon?: string      // Optional Lucide icon name
}
```

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string', description: 'Emitted when the user clicks an option. Value is the clicked option\'s key.' },
]" />
