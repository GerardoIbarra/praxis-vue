# PraxisDialog

A modal dialog component. Supports header, content, and footer slots. Renders with an overlay backdrop and traps focus when open.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { PraxisDialog } from 'praxis-vue-ui'

const visible = ref(false)
</script>

<template>
  <button @click="visible = true">Open Dialog</button>

  <PraxisDialog v-model:visible="visible" header="Confirm Action">
    <p>Are you sure you want to proceed?</p>
    <template #footer>
      <button @click="visible = false">Cancel</button>
      <button @click="confirm">Confirm</button>
    </template>
  </PraxisDialog>
</template>
```

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
