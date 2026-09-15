<script setup>
import { ref } from 'vue'
import PxDialogInput from '@praxis/px-src/components/forms/PxDialogInput.vue'

const showUpload = ref(false)
const lastUpload = ref(null)
</script>

# PxDialogInput

A file-upload dialog: drag-and-drop (or click-to-browse) a single file, preview it, and confirm. It's not a text input despite the name — it's a self-contained modal built on [`PxDialog`](/components/primitives/px-dialog).

::: warning Manages its own visibility — no v-model
The dialog opens as soon as it's mounted (its internal `visible` state starts `true`) and there's no prop to control it from outside. Conditionally render the component itself with `v-if`, and unmount it in response to the `close`/`upload-complete` events.
:::

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; display:flex; flex-direction:column; align-items:center; gap:0.75rem;">
    <button class="blue-button" @click="showUpload = true">Upload a document</button>
    <div v-if="lastUpload" style="font-size:0.85rem; color: var(--vp-c-text-2);">
      Last upload: <strong>{{ lastUpload }}</strong>
    </div>
    <ClientOnly>
      <PxDialogInput
        v-if="showUpload"
        @close="showUpload = false"
        @upload-complete="(file) => { lastUpload = file.name; showUpload = false }"
      />
    </ClientOnly>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxDialogInput } from 'praxis-vue-ui'

const showUpload = ref(false)

const onUploadComplete = (file) => {
  console.log('Uploaded:', file.name)
  showUpload.value = false
}
</script>

<template>
  <button @click="showUpload = true">Upload a document</button>

  <PxDialogInput
    v-if="showUpload"
    @close="showUpload = false"
    @upload-complete="onUploadComplete"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'theme', type: '\'light\' | \'dark\' | \'default\'', default: '\'default\'', description: 'Intended to force a light-background dialog regardless of site theme. Currently a no-op — see note below.' },
]" />

::: warning theme="light" currently has no effect
The component applies a `light-theme-dialog` class and ships CSS scoped to `.light-theme-dialog.p-dialog`, but the underlying `PxDialog` renders a `.px-dialog` class, not `.p-dialog` — so that selector never matches anything in the current DOM. This looks like leftover styling from an earlier implementation. Worth flagging as a bug if you rely on it.
:::

## Emits

<EmitsTable :rows="[
  { name: 'close', payload: '—', description: 'Emitted when the dialog is dismissed for any reason (Send, remove-and-close, or the dialog\'s own close button).' },
  { name: 'upload-complete', payload: 'UploadDocumentFile', description: 'Emitted with the selected file object when the user clicks \'Send\'.' },
]" />
