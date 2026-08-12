<script setup>
import PraxisFullPageLoader from '@praxis/ui-src/components/base/PraxisFullPageLoader.vue'
import PraxisLazyLoadingSpinner from '@praxis/ui-src/components/base/PraxisLazyLoadingSpinner.vue'
import { ref } from 'vue'

const showLoader = ref(false)
const showIt = () => {
  showLoader.value = true
  setTimeout(() => { showLoader.value = false }, 2000)
}
</script>

# PraxisFullPageLoader

A full-screen loading overlay that blocks user interaction during async operations. Use `PraxisLazyLoadingSpinner` for inline/inline-block loading indicators.

## PraxisFullPageLoader

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; display: flex; align-items: center; justify-content: center;">
    <button
      style="padding:0.5rem 1.25rem;background:var(--p-primary-600);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.875rem"
      @click="showIt"
    >
      Show Loader (2s)
    </button>
    <div v-if="showLoader" style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center">
      <PraxisLazyLoadingSpinner />
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { PraxisFullPageLoader } from 'praxis-vue-ui'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <button @click="loading = true">Show Loader</button>
  <PraxisFullPageLoader v-if="loading" />
</template>
```

  </template>
</ComponentDemo>

## PraxisLazyLoadingSpinner

A simple inline spinner — useful for list lazy-loading or button loading states.

<ComponentDemo title="PraxisLazyLoadingSpinner">
  <div style="height: 120px; width: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--vp-c-divider); border-radius: 8px;">
    <PraxisLazyLoadingSpinner />
  </div>

  <template #code>

```vue
<PraxisLazyLoadingSpinner />
```

  </template>
</ComponentDemo>

## Props

`PraxisFullPageLoader` and `PraxisLazyLoadingSpinner` have no props — they render their default loading UI.
