<script setup>
import PxCardFilterContainer from '@praxis/px-src/components/layout/PxCardFilterContainer.vue'
</script>

# PxCardFilterContainer

A transparent pass-through container for filter sections on card-based list views. Provides a consistent wrapper for filter controls placed above cards.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <PxCardFilterContainer>
      <input type="search" placeholder="Search..." class="input-base" style="padding: 0.5rem; flex: 1; max-width: 200px;" />
      <select class="input-base" style="padding: 0.5rem;">
        <option>All statuses</option>
        <option>Active</option>
      </select>
    </PxCardFilterContainer>
  </div>

  <template #code>

```vue
<template>
  <PxCardFilterContainer>
    <input type="search" placeholder="Search..." />
    <select>
      <option>All statuses</option>
      <option>Active</option>
    </select>
  </PxCardFilterContainer>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Filter controls to render inside the container. |
