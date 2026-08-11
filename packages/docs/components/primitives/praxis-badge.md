<script setup>
import PraxisBadge from '@praxis/ui-src/components/_primitives/PraxisBadge.vue'
</script>

# PraxisBadge

A small, stylized badge chip for displaying status, tags, or category labels. Supports multiple color variants.

## Usage

<ComponentDemo>
  <div style="display:flex; gap:1rem; align-items:center;">
    <PraxisBadge value="Active" severity="success" />
    <PraxisBadge value="Pending" severity="warning" />
    <PraxisBadge value="5" severity="info" />
  </div>

  <template #code>

```vue
<script setup>
import { PraxisBadge } from 'praxis-vue-ui'
</script>

<template>
  <PraxisBadge value="Active" severity="success" />
  <PraxisBadge value="Pending" severity="warning" />
  <PraxisBadge value="5" severity="info" />
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
