<script setup>
import PxCard from '@praxis/px-src/components/layout/PxCard.vue'
</script>

# PxCard

A styled card container for dashboard sections. Wraps content in a bordered, rounded panel with consistent padding.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PxCard>
      <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">Total Users</h3>
      <p style="font-size: 2rem; font-weight: bold; margin: 0; color: var(--vp-c-brand-1);">1,284</p>
    </PxCard>
  </div>

  <template #code>

```vue
<script setup>
import { PxCard } from 'px-vue-ui'
</script>

<template>
  <PxCard>
    <h3>Total Users</h3>
    <p class="text-4xl font-bold">1,284</p>
  </PxCard>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Card body content. |
