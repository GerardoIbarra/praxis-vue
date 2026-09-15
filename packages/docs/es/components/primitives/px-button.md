---
title: PxButton
description: A flexible button primitive with size, variant, icon, and loading states.
---

<script setup>
import { Download, ArrowRight } from '@lucide/vue'
import PxButton from '@praxis/px-src/components/_primitives/PxButton.vue'
</script>

# PxButton

A flexible button primitive with five variants, three sizes, left/right icon slots, and a built-in loading state. Used as the base action element across the library.

## Variants

<ComponentDemo title="Variants">
  <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center;">
    <PxButton label="Primary" variant="primary" />
    <PxButton label="Secondary" variant="secondary" />
    <PxButton label="Danger" variant="danger" />
    <PxButton label="Ghost" variant="ghost" />
    <PxButton label="Link" variant="link" />
  </div>

  <template #code>

```vue
<script setup>
import { PxButton } from 'praxis-vue-ui'
</script>

<template>
  <PxButton label="Primary" variant="primary" />
  <PxButton label="Secondary" variant="secondary" />
  <PxButton label="Danger" variant="danger" />
  <PxButton label="Ghost" variant="ghost" />
  <PxButton label="Link" variant="link" />
</template>
```

  </template>
</ComponentDemo>

## Sizes, Icons & States

<ComponentDemo title="Sizes, Icons & States">
  <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center;">
    <PxButton label="Small" size="sm" />
    <PxButton label="Medium" size="md" />
    <PxButton label="Large" size="lg" />
    <PxButton label="Download" :icon-left="Download" />
    <PxButton label="Next" :icon-right="ArrowRight" variant="secondary" />
    <PxButton label="Loading" loading />
    <PxButton label="Disabled" disabled />
  </div>

  <template #code>

```vue
<script setup>
import { Download, ArrowRight } from '@lucide/vue'
import { PxButton } from 'praxis-vue-ui'
</script>

<template>
  <PxButton label="Small" size="sm" />
  <PxButton label="Medium" size="md" />
  <PxButton label="Large" size="lg" />
  <PxButton label="Download" :icon-left="Download" />
  <PxButton label="Next" :icon-right="ArrowRight" variant="secondary" />
  <PxButton label="Loading" loading />
  <PxButton label="Disabled" disabled />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxButton" />
