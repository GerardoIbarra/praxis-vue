<script setup>
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Start typing here...</p>')
</script>

# Px Editor

The `PxEditor` is a rich-text editor based on Vue, using Tiptap/ProseMirror underneath. It offers a premium interface with support for multiple formats, keyboard shortcuts, and dark theme.

## Demonstration

<ClientOnly>
  <div class="my-6 border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
    <PxEditor v-model="content" />
  </div>
  <p class="text-sm text-gray-500 mt-2">Try typing something in the interactive editor above. It supports bold (Ctrl+B), italic (Ctrl+I), and slash commands `/`.</p>
</ClientOnly>

## Basic Usage

Make sure you have the `praxis-vue-editor` package installed.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Start typing here...</p>')
</script>

<template>
  <div class="max-w-3xl mx-auto border rounded-xl overflow-hidden shadow-sm">
    <PxEditor v-model="content" />
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `""` | The HTML content of the editor. Use with `v-model`. |
| `placeholder` | `string` | `"Type '/' for commands"` | Placeholder text when the editor is empty. |
| `editable` | `boolean` | `true` | Determines if the user can modify the content. |
| `minHeight` | `string` | `"200px"` | Minimum height of the writing container. |

## Events

- `@update:modelValue`: Emitted when the content changes. Returns the HTML as a string.
- `@focus`: Emitted when the editor gains focus.
- `@blur`: Emitted when the editor loses focus.
