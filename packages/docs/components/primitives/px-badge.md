<script setup>
import PxBadge from '@praxis/px-src/components/_primitives/PxBadge.vue'
</script>

# PxBadge

A small, stylized badge chip for displaying status, tags, or category labels. Supports multiple color variants.

## Usage

<ComponentDemo>
  <div style="display:flex; gap:1rem; align-items:center;">
    <PxBadge value="Active" severity="success" />
    <PxBadge value="Pending" severity="warning" />
    <PxBadge value="5" severity="info" />
  </div>

  <template #code>

```vue
<script setup>
import { PxBadge } from 'px-vue-ui'
</script>

<template>
  <PxBadge value="Active" severity="success" />
  <PxBadge value="Pending" severity="warning" />
  <PxBadge value="5" severity="info" />
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
