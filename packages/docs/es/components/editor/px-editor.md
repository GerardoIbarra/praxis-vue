<script setup>
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Start typing here...</p>')
</script>

# Px Editor

The `PxEditor` is a rich-text editor based on Vue, using Tiptap/ProseMirror underneath. It offers a premium interface with support for multiple formats, keyboard shortcuts, and dark theme.

<ClientOnly>
  <ComponentDemo title="Rich-Text Editor Playground">
    <div style="width:100%;border-radius:8px;overflow:hidden;">
      <PxEditor v-model="content" />
    </div>

    <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Start typing here...</p>')
</script>

<template>
  <div class="border rounded-xl overflow-hidden shadow-sm">
    <PxEditor v-model="content" />
  </div>
</template>
```

    </template>
  </ComponentDemo>
</ClientOnly>

## API Reference

<ApiReference component="PxEditor" />
