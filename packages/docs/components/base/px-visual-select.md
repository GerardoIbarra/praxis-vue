<script setup>
import PxVisualSelect from '@praxis/px-src/components/base/PxVisualSelect.vue'
import { ref } from 'vue'

const selectedGroup = ref(null)
const selectedColor = ref(null)

const groupOptions = [
  { value: 'frontend', name: 'Frontend Team' },
  { value: 'backend', name: 'Backend Team' },
  { value: 'design', name: 'Design Team' },
]

const colorOptions = [
  { id: 1, name: 'Red', color: '#ef4444' },
  { id: 2, name: 'Blue', color: '#3b82f6' },
  { id: 3, name: 'Green', color: '#22c55e' },
]
</script>

# PxVisualSelect

A unified select component that displays visual elements like user icons or color swatches next to options. Useful for assigning teams or color labels.

## Demonstration

<div class="p-6 border rounded-lg bg-gray-50 flex gap-4">
  <div class="w-1/2">
    <label class="block mb-2 font-medium text-sm">Select Team (variant="group")</label>
    <PxVisualSelect
      v-model="selectedGroup"
      :options="groupOptions"
      variant="group"
      label="name"
      placeholder="Choose a team"
    />
    <p class="mt-2 text-sm text-gray-500">Selected value: {{ selectedGroup }}</p>
  </div>
  <div class="w-1/2">
    <label class="block mb-2 font-medium text-sm">Select Color (variant="color")</label>
    <PxVisualSelect
      v-model="selectedColor"
      :options="colorOptions"
      variant="color"
      label="name"
      placeholder="Choose a color"
    />
    <p class="mt-2 text-sm text-gray-500">Selected value: {{ selectedColor }}</p>
  </div>
</div>

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxVisualSelect } from 'px-vue-ui'

const selected = ref(null)

const options = [
  { value: 'frontend', name: 'Frontend Team' },
  { value: 'backend', name: 'Backend Team' },
]
</script>

<template>
  <PxVisualSelect
    v-model="selected"
    :options="options"
    variant="group"
    label="name"
    placeholder="Select an option"
  />
</template>
```

## Visual Variants

Use the `variant` prop to change the visual presentation of the options:

- `group`: Displays a "Users" icon. (Default)
- `color`: Displays a color swatch (requires each option object to have a `color` property with a valid hexadecimal or CSS color name).
