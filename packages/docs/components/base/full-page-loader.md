<script setup>
import FullPageLoader from '@praxis/ui-src/components/base/FullPageLoader.vue'
import LazyLoadingSpinner from '@praxis/ui-src/components/base/LazyLoadingSpinner.vue'
import { ref } from 'vue'

const showLoader = ref(false)
const showIt = () => {
  showLoader.value = true
  setTimeout(() => { showLoader.value = false }, 2000)
}
</script>

# FullPageLoader

A full-screen loading overlay that blocks user interaction during async operations. Use `LazyLoadingSpinner` for inline/inline-block loading indicators.

## FullPageLoader

<ComponentDemo>
  <div>
    <button
      style="padding:0.5rem 1.25rem;background:var(--p-primary-600);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.875rem"
      @click="showIt"
    >
      Show Loader (2s)
    </button>
    <div v-if="showLoader" style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center">
      <LazyLoadingSpinner />
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { FullPageLoader } from '@praxis/vue'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <button @click="loading = true">Show Loader</button>
  <FullPageLoader v-if="loading" />
</template>
```

  </template>
</ComponentDemo>

## LazyLoadingSpinner

A simple inline spinner — useful for list lazy-loading or button loading states.

<ComponentDemo title="LazyLoadingSpinner">
  <LazyLoadingSpinner />

  <template #code>

```vue
<LazyLoadingSpinner />
```

  </template>
</ComponentDemo>

## Props

`FullPageLoader` and `LazyLoadingSpinner` have no props — they render their default loading UI.
