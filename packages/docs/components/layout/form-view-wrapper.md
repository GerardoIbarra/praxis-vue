<script setup>
import FormViewWrapper from '@praxis/ui-src/components/layout/FormViewWrapper.vue'
import FormHeader from '@praxis/ui-src/components/layout/FormHeader.vue'
</script>

# FormViewWrapper

A layout wrapper for form/detail pages. Wraps a form with consistent padding and responsive layout constraints.

## Usage

<ComponentDemo>
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px;">
    <FormViewWrapper>
      <FormHeader title="Patient" :is-edit-mode="false" />
      <div style="padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px; margin-top: 1rem;">
        <p style="text-align: center; color: var(--vp-c-text-2);">Form content area</p>
      </div>
    </FormViewWrapper>
  </div>

  <template #code>

```vue
<script setup>
import { FormViewWrapper, FormHeader, StepNavigation } from 'praxis-vue-ui'
</script>

<template>
  <FormViewWrapper>
    <FormHeader title="Patient" :is-edit-mode="isEdit" />

    <form @submit.prevent="save">
      <!-- form fields -->
    </form>

    <StepNavigation
      :can-proceed="isValid"
      @next="save"
    />
  </FormViewWrapper>
</template>
```

  </template>
</ComponentDemo>

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form content — header, fields, and navigation. |
