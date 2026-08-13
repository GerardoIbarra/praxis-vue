<script setup>
import PxFormLayout from '@praxis/px-src/components/layout/PxFormLayout.vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
</script>

# PxFormLayout

A layout wrapper for form/detail pages. Wraps a form with consistent padding and responsive layout constraints.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <PxFormLayout>
      <PxHeader variant="form" title="Project" :is-edit-mode="false" />
      <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin-top: 1rem;">
        <p style="text-align: center; color: var(--vp-c-text-2);">Form content area</p>
      </div>
    </PxFormLayout>
  </div>

  <template #code>

```vue
<script setup>
import { PxFormLayout, PxHeader, PxStepper } from 'px-vue-ui'
</script>

<template>
  <PxFormLayout>
    <PxHeader variant="form" title="Project" :is-edit-mode="isEdit" />

    <form @submit.prevent="save">
      <!-- form fields -->
    </form>

    <PxStepper
      :can-proceed="isValid"
      @next="save"
    />
  </PxFormLayout>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form content — header, fields, and navigation. |
