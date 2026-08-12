<script setup>
import PxFormViewWrapper from '@praxis/px-src/components/layout/PxFormViewWrapper.vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
</script>

# PxFormViewWrapper

A layout wrapper for form/detail pages. Wraps a form with consistent padding and responsive layout constraints.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <PxFormViewWrapper>
      <PxHeader variant="form" title="Project" :is-edit-mode="false" />
      <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin-top: 1rem;">
        <p style="text-align: center; color: var(--vp-c-text-2);">Form content area</p>
      </div>
    </PxFormViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { PxFormViewWrapper, PxHeader, PxStepNavigation } from 'px-vue-ui'
</script>

<template>
  <PxFormViewWrapper>
    <PxHeader variant="form" title="Project" :is-edit-mode="isEdit" />

    <form @submit.prevent="save">
      <!-- form fields -->
    </form>

    <PxStepNavigation
      :can-proceed="isValid"
      @next="save"
    />
  </PxFormViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form content — header, fields, and navigation. |
