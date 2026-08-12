<script setup>
import PraxisLazyLoadingSpinner from '@praxis/ui-src/components/base/PraxisLazyLoadingSpinner.vue'
</script>

# PraxisLazyLoadingSpinner

A simple, centered loading spinner component used to indicate that content is being fetched or rendered asynchronously.

## Basic Usage

<ComponentDemo>
  <div style="height: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--vp-c-divider); border-radius: 8px;">
    <PraxisLazyLoadingSpinner loading-text="Loading awesomeness..." />
  </div>

  <template #code>

```vue
<script setup>
import { PraxisLazyLoadingSpinner } from 'praxis-vue-ui'
</script>

<template>
  <PraxisLazyLoadingSpinner loading-text="Loading data..." />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'loadingText', type: 'string', default: 'Cargando...', description: 'The text displayed below the spinner.' },
]" />
