<script setup>
import { ref } from 'vue'
import PxLoader from '@praxis/px-src/components/base/PxLoader.vue'

const isLoading = ref(false)
const showLoader = () => {
  isLoading.value = true
  setTimeout(() => isLoading.value = false, 2000)
}
</script>

# PxLoader

A unified loading indicator component that supports both inline/lazy-loading scenarios and full-screen blocking overlays.

## Usage

```vue
<script setup lang="ts">
import { PxLoader } from 'praxis-vue-ui'
</script>
```

## Inline / Lazy Loading (Default)

Used to indicate content that is currently being fetched or rendered inside a specific area.

<ComponentDemo title="Inline Loader">
  <div style="width:100%">
    <PxLoader message="Fetching module data..." />
  </div>

  <template #code>

```vue
<PxLoader message="Fetching module data..." />
```

  </template>
</ComponentDemo>

## Fullscreen Overlay

Used to block the entire screen during critical asynchronous operations, like saving a form or processing a payment. Features a beautiful blur backdrop and an animated premium spinner.

<ComponentDemo title="Fullscreen Overlay Loader">
  <div style="width:100%;display:flex;justify-content:center;">
    <button 
      @click="showLoader" 
      style="padding:8px 16px;background:var(--vp-c-brand-1);color:#fff;border-radius:8px;font-size:0.875rem;font-weight:500;border:none;cursor:pointer;"
    >
      Trigger Fullscreen Loader (2s)
    </button>
    <PxLoader 
      v-if="isLoading" 
      fullscreen 
      message="Processing payment..." 
      subMessage="Please do not close this window."
    />
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxLoader } from 'praxis-vue-ui'

const isLoading = ref(false)
const showLoader = () => {
  isLoading.value = true
  setTimeout(() => isLoading.value = false, 2000)
}
</script>

<template>
  <button @click="showLoader">
    Trigger Fullscreen Loader
  </button>
  <PxLoader 
    v-if="isLoading" 
    fullscreen 
    message="Processing payment..." 
    subMessage="Please do not close this window."
  />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxLoader" />
