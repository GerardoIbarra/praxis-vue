---
title: PxInfoField
description: A compact label/value pair for read-only detail views.
---

<script setup>
import { User } from '@lucide/vue'
import PxInfoField from '@praxis/px-src/components/data-display/PxInfoField.vue'
</script>

# PxInfoField

A compact, read-only label/value pair. Useful for detail panels, summary cards, or profile views where you need to display data without an input field.

## Usage

<ComponentDemo>
  <div style="display:flex; flex-direction:column; gap:0.75rem;">
    <PxInfoField label="Full Name:" value="Alice Smith" />
    <PxInfoField label="Department:" value="Engineering" />
    <PxInfoField label="Status:" value="Active" value-class="text-green-600 font-semibold" />
  </div>

  <template #code>

```vue
<script setup>
import { PxInfoField } from 'praxis-vue-ui'
</script>

<template>
  <PxInfoField label="Full Name:" value="Alice Smith" />
  <PxInfoField label="Department:" value="Engineering" />
  <PxInfoField label="Status:" value="Active" value-class="text-green-600 font-semibold" />
</template>
```

  </template>
</ComponentDemo>

## With Icon

<ComponentDemo title="With Icon">
  <PxInfoField label="Owner:" value="Alice Smith">
    <template #icon>
      <User class="w-4 h-4 text-surface-400" />
    </template>
  </PxInfoField>

  <template #code>

```vue
<script setup>
import { User } from '@lucide/vue'
import { PxInfoField } from 'praxis-vue-ui'
</script>

<template>
  <PxInfoField label="Owner:" value="Alice Smith">
    <template #icon>
      <User class="w-4 h-4" />
    </template>
  </PxInfoField>
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxInfoField" />
