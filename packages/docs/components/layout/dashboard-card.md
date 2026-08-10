# DashboardCard

A styled card container for dashboard sections. Wraps content in a bordered, rounded panel with consistent padding.

## Usage

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

## Slots

| Slot | Description |
|------|-------------|
| `default` | Card body content. |
