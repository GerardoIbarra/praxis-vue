<script setup>
import { ref } from 'vue'
import UiDialog from '@praxis/ui-src/components/_primitives/UiDialog.vue'

const visible = ref(false)
</script>

# UiDialog

A modal dialog component. Supports header, content, and footer slots. Renders with an overlay backdrop and traps focus when open.

## Usage

<ComponentDemo>
  <div style="display:flex; justify-content:center; padding: 2rem 0;">
    <button
      @click="visible = true"
      class="input-base"
      style="padding: 0.5rem 1rem; cursor: pointer; background: var(--vp-c-brand-1); color: white; border: none; border-radius: 0.5rem;"
    >
      Open Dialog
    </button>
  </div>

  <!-- Note: we teleport it so it renders properly in the docs -->
  <ClientOnly>
    <UiDialog v-model:visible="visible" header="Confirm Action">
      <p style="margin: 0; color: var(--vp-c-text-2);">Are you sure you want to proceed? This action cannot be undone.</p>
      <template #footer>
        <div style="display:flex; gap: 0.5rem; justify-content: flex-end;">
          <button @click="visible = false" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer;">Cancel</button>
          <button @click="visible = false" class="input-base" style="padding: 0.5rem 1rem; cursor: pointer; background: #ef4444; color: white; border: none;">Confirm</button>
        </div>
      </template>
    </UiDialog>
  </ClientOnly>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { UiDialog } from 'praxis-vue-ui'

const visible = ref(false)

const confirm = () => {
  visible.value = false
  // handle confirmation
}
</script>

<template>
  <button @click="visible = true">Open Dialog</button>

  <UiDialog v-model:visible="visible" header="Confirm Action">
    <p>Are you sure you want to proceed?</p>
    <template #footer>
      <button @click="visible = false">Cancel</button>
      <button @click="confirm">Confirm</button>
    </template>
  </UiDialog>
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'visible', type: 'boolean', required: true, description: 'Controls dialog visibility. Use with v-model:visible.' },
  { name: 'header', type: 'string', default: 'undefined', description: 'Dialog title text. Also overridable via the header slot.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'When true, shows an overlay backdrop.' },
  { name: 'closable', type: 'boolean', default: 'true', description: 'Shows the × close button in the header.' },
  { name: 'dismissableMask', type: 'boolean', default: 'false', description: 'Closes the dialog when clicking the overlay backdrop.' },
  { name: 'style', type: 'string | object', default: 'undefined', description: 'Inline styles for the dialog container.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:visible', payload: 'boolean', description: 'Emitted when the dialog is closed. Set visible to false.' },
  { name: 'hide', payload: 'void', description: 'Emitted after the dialog finishes its close transition.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main dialog body content. |
| `header` | Custom header content (replaces header prop text). |
| `footer` | Footer content, typically action buttons. |
