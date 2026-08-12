<script setup>
import PraxisFormViewWrapper from '@praxis/ui-src/components/layout/PraxisFormViewWrapper.vue'
import PraxisHeader from '@praxis/ui-src/components/layout/PraxisHeader.vue'
</script>

# PraxisFormViewWrapper

A layout wrapper for form/detail pages. Wraps a form with consistent padding and responsive layout constraints.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <PraxisFormViewWrapper>
      <PraxisHeader variant="form" title="Project" :is-edit-mode="false" />
      <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin-top: 1rem;">
        <p style="text-align: center; color: var(--vp-c-text-2);">Form content area</p>
      </div>
    </PraxisFormViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { PraxisFormViewWrapper, PraxisHeader, PraxisStepNavigation } from 'praxis-vue-ui'
</script>

<template>
  <PraxisFormViewWrapper>
    <PraxisHeader variant="form" title="Project" :is-edit-mode="isEdit" />

    <form @submit.prevent="save">
      <!-- form fields -->
    </form>

    <PraxisStepNavigation
      :can-proceed="isValid"
      @next="save"
    />
  </PraxisFormViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form content — header, fields, and navigation. |
