<script setup>
import { ref } from 'vue'
import PraxisDisplayOptions from '@praxis/ui-src/components/data-display/PraxisDisplayOptions.vue'

const displayOptions = ref({
  inputs: [
    {
      title: 'Internal Notes',
      type: 'textarea',
      items: [{ title: 'Internal Notes', value: '' }],
    },
    {
      title: 'Priority',
      type: 'radio',
      value: 'medium',
      items: [
        { title: 'Low', value: 'low' },
        { title: 'Medium', value: 'medium' },
        { title: 'High', value: 'high' },
      ],
    },
    {
      title: 'Reference Code',
      type: 'text',
      items: [{ title: 'Reference Code', value: '' }],
    },
  ],
})
</script>

# PraxisDisplayOptions

Renders a set of configuration inputs — textarea, radio group, or text — from a `displayOptions.inputs` schema. Each input's value is mutated directly on the object you pass in.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 400px;">
    <PraxisDisplayOptions :praxis-display-options="displayOptions" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisDisplayOptions } from 'praxis-vue-ui'

const displayOptions = ref({
  inputs: [
    {
      title: 'Internal Notes',
      type: 'textarea',
      items: [{ title: 'Internal Notes', value: '' }],
    },
    {
      title: 'Priority',
      type: 'radio',
      value: 'medium',
      items: [
        { title: 'Low', value: 'low' },
        { title: 'Medium', value: 'medium' },
        { title: 'High', value: 'high' },
      ],
    },
    {
      title: 'Reference Code',
      type: 'text',
      items: [{ title: 'Reference Code', value: '' }],
    },
  ],
})
</script>

<template>
  <PraxisDisplayOptions :praxis-display-options="displayOptions" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'displayOptions', type: 'PraxisDisplayOptions', required: true, description: 'Schema describing the inputs to render.' },
]" />

## PraxisDisplayOptions Interface

```ts
interface DisplayOptionItem {
  title: string
  value: string
}

interface DisplayOptionInput {
  title: string
  type: 'textarea' | 'radio' | 'text'
  items: DisplayOptionItem[]
  value?: string   // for radio inputs
}

interface PraxisDisplayOptions {
  inputs: DisplayOptionInput[]
}
```

> [!NOTE]
> `PraxisDisplayOptions` has no v-model or emits — it mutates `items[i].value` (or `input.value` for radio groups) directly on the object you pass in. Use a `ref`/`reactive` object and read the values back from it.
