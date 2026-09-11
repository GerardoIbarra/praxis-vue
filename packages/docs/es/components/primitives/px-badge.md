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
import { PxBadge } from 'praxis-vue-ui'
</script>

<template>
  <PxBadge value="Active" severity="success" />
  <PxBadge value="Pending" severity="warning" />
  <PxBadge value="5" severity="info" />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxBadge" />
