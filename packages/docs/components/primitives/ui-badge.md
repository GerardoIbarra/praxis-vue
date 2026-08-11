<script setup>
import UiBadge from '@praxis/ui-src/components/_primitives/UiBadge.vue'
</script>

# UiBadge

A small, stylized badge chip for displaying status, tags, or category labels. Supports multiple color variants.

## Usage

<ComponentDemo>
  <div style="display:flex; gap:1rem; align-items:center;">
    <UiBadge value="Active" severity="success" />
    <UiBadge value="Pending" severity="warning" />
    <UiBadge value="5" severity="info" />
  </div>

  <template #code>

```vue
<script setup>
import { UiBadge } from 'praxis-vue-ui'
</script>

<template>
  <UiBadge value="Active" severity="success" />
  <UiBadge value="Pending" severity="warning" />
  <UiBadge value="5" severity="info" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'value', type: 'string | number', default: 'undefined', description: 'Text or number displayed inside the badge.' },
  { name: 'severity', type: '\'success\' | \'info\' | \'warning\' | \'danger\' | \'secondary\'', default: '\'info\'', description: 'Color variant of the badge.' },
  { name: 'size', type: '\'small\' | \'normal\' | \'large\'', default: '\'normal\'', description: 'Size of the badge.' },
]" />
