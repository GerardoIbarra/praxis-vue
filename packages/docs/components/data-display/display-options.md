<script setup>
import { ref } from 'vue'
import DisplayOptions from '@praxis/ui-src/components/data-display/DisplayOptions.vue'
import { Table, LayoutGrid, Calendar } from 'lucide-vue-next'

const view = ref('table')
const options = [
  { key: 'table', label: 'Table', icon: Table },
  { key: 'card', label: 'Cards', icon: LayoutGrid },
  { key: 'calendar', label: 'Calendar', icon: Calendar },
]
</script>

# DisplayOptions

A compact options bar component for toggling between different view modes or display settings (e.g., switching between table/card/calendar view). Renders a group of button options.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <DisplayOptions v-model="view" :options="options" />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Active View: <strong>{{ view }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { DisplayOptions } from 'praxis-vue-ui'
import { Table, LayoutGrid, Calendar } from 'lucide-vue-next'

const view = ref('table')
const options = [
  { key: 'table', label: 'Table', icon: Table },
  { key: 'card', label: 'Cards', icon: LayoutGrid },
  { key: 'calendar', label: 'Calendar', icon: Calendar },
]
</script>

<template>
  <DisplayOptions v-model="view" :options="options" />
</template>
```

  </template>
</ComponentDemo>

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
