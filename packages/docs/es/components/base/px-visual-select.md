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

<ComponentDemo title="Visual Variants (Group & Color)">
  <div style="width:100%;display:flex;gap:1.5rem;flex-wrap:wrap;">
    <div style="flex:1;min-width:200px;">
      <label style="display:block;margin-bottom:0.5rem;font-weight:500;font-size:0.875rem;">Select Team (variant="group")</label>
      <PxVisualSelect
        v-model="selectedGroup"
        :options="groupOptions"
        variant="group"
        label="name"
        placeholder="Choose a team"
      />
      <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--vp-c-text-2);">Selected value: {{ selectedGroup }}</p>
    </div>
    <div style="flex:1;min-width:200px;">
      <label style="display:block;margin-bottom:0.5rem;font-weight:500;font-size:0.875rem;">Select Color (variant="color")</label>
      <PxVisualSelect
        v-model="selectedColor"
        :options="colorOptions"
        variant="color"
        label="name"
        placeholder="Choose a color"
      />
      <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--vp-c-text-2);">Selected value: {{ selectedColor }}</p>
    </div>
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxVisualSelect } from 'praxis-vue-ui'

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

<template>
  <div class="flex gap-4">
    <!-- Group variant -->
    <PxVisualSelect
      v-model="selectedGroup"
      :options="groupOptions"
      variant="group"
      label="name"
      placeholder="Choose a team"
    />

    <!-- Color swatch variant -->
    <PxVisualSelect
      v-model="selectedColor"
      :options="colorOptions"
      variant="color"
      label="name"
      placeholder="Choose a color"
    />
  </div>
</template>
```

  </template>
</ComponentDemo>

## Visual Variants

Use the `variant` prop to change the visual presentation of the options:

- `group`: Displays a "Users" icon. (Default)
- `color`: Displays a color swatch (requires each option object to have a `color` property with a valid hexadecimal or CSS color name).

## API Reference

<ApiReference component="PxVisualSelect" />
