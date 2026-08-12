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
import { PxLoader } from 'px-vue-ui'
</script>
```

## Inline / Lazy Loading (Default)

Used to indicate content that is currently being fetched or rendered inside a specific area.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PxLoader message="Fetching module data..." />
</div>

```vue
<PxLoader message="Fetching module data..." />
```

## Fullscreen Overlay

Used to block the entire screen during critical asynchronous operations, like saving a form or processing a payment. Features a beautiful blur backdrop and an animated premium spinner.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900 flex justify-center">
  <button 
    @click="showLoader" 
    class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
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

```vue
<PxLoader 
  v-if="isLoading" 
  fullscreen 
  message="Processing payment..." 
  subMessage="Please do not close this window."
/>
```

## API

### Props

| Name | Type | Default | Description |
|---|---|---|---|
| `fullscreen` | `boolean` | `false` | If true, the loader will overlay the entire screen with a backdrop blur and a centered premium box. |
| `message` | `string` | `'Loading...'` | Main text displayed below the spinner. |
| `subMessage` | `string` | `undefined` | Additional subtext, usually only visible in `fullscreen` mode. |
