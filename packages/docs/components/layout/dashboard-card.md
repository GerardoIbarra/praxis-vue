<script setup>
import DashboardCard from '@praxis/ui-src/components/layout/DashboardCard.vue'
</script>

# DashboardCard

A styled card container for dashboard sections. Wraps content in a bordered, rounded panel with consistent padding.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <DashboardCard>
      <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600;">Total Patients</h3>
      <p style="font-size: 2rem; font-weight: bold; margin: 0; color: var(--vp-c-brand-1);">1,284</p>
    </DashboardCard>
  </div>

  <template #code>

```vue
<script setup>
import { DashboardCard } from 'praxis-vue-ui'
</script>

<template>
  <DashboardCard>
    <h3>Total Patients</h3>
    <p class="text-4xl font-bold">1,284</p>
  </DashboardCard>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Card body content. |
