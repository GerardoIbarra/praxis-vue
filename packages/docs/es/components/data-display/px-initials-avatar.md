<script setup>
import PxInitialsAvatar from '@praxis/px-src/components/data-display/PxInitialsAvatar.vue'
</script>

# PxInitialsAvatar

::: warning Deprecated
This component is a thin wrapper around [`PxAvatar`](/es/components/base/px-avatar) (it always renders `PxAvatar` with `size="xl"`, ignoring its own `size` prop) and only exists for backward compatibility. Prefer using `PxAvatar` directly.
:::

Renders a circular avatar with initials derived from a full name string. The first and last word each contribute one letter (e.g. `"Alice Johnson"` → `"AJ"`).

## Basic Usage

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <PxInitialsAvatar name="Alice Johnson" />
    <PxInitialsAvatar name="Bob Smith" />
    <PxInitialsAvatar name="Carol Williams" />
    <PxInitialsAvatar name="David Brown" />
  </div>

  <template #code>

```vue
<script setup>
import { PxInitialsAvatar } from 'praxis-vue-ui'
</script>

<template>
  <PxInitialsAvatar name="Alice Johnson" />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'name', type: 'string | null', default: '\'\'', description: 'Full name used to generate initials (e.g. \'Alice Johnson\' → \'AJ\').' },
  { name: 'size', type: '\'normal\' | \'large\' | \'xlarge\'', default: '\'xlarge\'', description: 'Accepted for backward compatibility, but has no effect — the underlying PxAvatar is always rendered at its \'xl\' size.' },
  { name: 'lightOnly', type: 'boolean', default: 'false', description: 'Accepted for backward compatibility, but not used by the current implementation.' },
]" />
