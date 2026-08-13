<script setup>
import PxToast from '@praxis/px-src/components/_primitives/PxToast.vue'
import { usePxToast } from '@praxis/px-src/composables/usePxToast'

// Mocking usePxToast since docs might not have PrimeVue app fully instantiated
// But assuming it does, we can just use the real one.
const triggerToast = (severity) => {
  const { showSuccess, showError, showInfo, showWarning } = usePxToast()
  if (severity === 'success') showSuccess('Action Completed', 'Your changes have been saved successfully.')
  if (severity === 'error') showError('Validation Failed', 'Please check the form fields and try again.')
  if (severity === 'info') showInfo('Update Available', 'A new version of the system is ready.')
  if (severity === 'warn') showWarning('Storage Almost Full', 'You have used 95% of your storage quota.')
}
</script>

# PxToast

A global notification system for displaying success, error, warning, and info messages. Built on top of PrimeVue's Toast system and styled with Tailwind to seamlessly match your app's theme.

## Basic Usage

To use toasts, you need to add the `<PxToast />` component once in your root layout (e.g., `App.vue`), and then use the `usePxToast` composable from anywhere in your application.

<ComponentDemo>
  <div class="flex gap-2 flex-wrap" style="width:100%; padding: 1rem 0;">
    <button class="bg-green-600 text-white px-4 py-2 rounded-lg" @click="triggerToast('success')">Success</button>
    <button class="bg-red-600 text-white px-4 py-2 rounded-lg" @click="triggerToast('error')">Error</button>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" @click="triggerToast('info')">Info</button>
    <button class="bg-orange-600 text-white px-4 py-2 rounded-lg" @click="triggerToast('warn')">Warning</button>
    <PxToast />
  </div>

  <template #code>

```vue
<script setup>
import { PxToast, usePxToast } from 'praxis-vue-ui'

const { showSuccess, showError, showInfo, showWarning } = usePxToast()

const saveChanges = () => {
  try {
    // API Call...
    showSuccess('Saved Successfully', 'All your data is secure.')
  } catch (e) {
    showError('Operation Failed', 'Please try again later.')
  }
}
</script>

<template>
  <div class="flex gap-2">
    <button @click="saveChanges">Save Data</button>
  </div>
  
  <!-- Render this once at the root of your application -->
  <PxToast />
</template>
```

  </template>
</ComponentDemo>

## usePxToast Composable

The `usePxToast` composable provides a typed API to trigger messages anywhere in your codebase.

```ts
const { 
  toast,        // The raw PrimeVue toast instance 
  showSuccess,  // showSuccess(summary: string, detail?: string, life?: number)
  showError,    // showError(summary: string, detail?: string, life?: number)
  showInfo,     // showInfo(summary: string, detail?: string, life?: number)
  showWarning   // showWarning(summary: string, detail?: string, life?: number)
} = usePxToast()
```
