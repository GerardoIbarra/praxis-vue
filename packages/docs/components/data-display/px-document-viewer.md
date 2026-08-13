<script setup>
import { ref } from 'vue'
import PxDocumentViewer from '@praxis/px-src/components/data-display/PxDocumentViewer.vue'

const demoPdf = ref('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf')
</script>

# PxDocumentViewer

Renders a PDF document inline using `pdfjs-dist`. It automatically renders all pages of the document sequentially and includes a built-in "Print PDF" action button.

## Basic Usage

<ComponentDemo>
  <div style="width: 100%; height: 500px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; background: var(--vp-c-bg-soft);">
    <!-- We wrap the component in a scrollable div because it renders all pages at 1.5 scale -->
    <div style="height: 100%; overflow: auto;">
      <PxDocumentViewer :url="demoPdf" />
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { PxDocumentViewer } from 'px-vue-ui'
</script>

<template>
  <PxDocumentViewer url="https://example.com/document.pdf" />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'url', type: 'string', required: true, description: 'The URL of the PDF document to render.' },
  { name: 'scale', type: 'number', default: '1.5', description: 'The zoom scale applied to the PDF pages.' },
  { name: 'height', type: 'string', default: '\'600px\'', description: 'The CSS height of the viewer container.' },
  { name: 'renderAllPages', type: 'boolean', default: 'true', description: 'If true, renders all pages sequentially. If false, renders only the initialPage.' },
  { name: 'initialPage', type: 'number', default: '1', description: 'The specific page to render when renderAllPages is false.' }
]" />

## Features

- **Automatic Worker**: Automatically configures the `pdfjs-dist` web worker.
- **Full Document Rendering**: Parses the document and renders all pages sequentially inside `<canvas>` elements.
- **Scale**: The zoom scale is currently hardcoded to `1.5x` for optimal readability.
- **Print Support**: Includes a built-in "Print PDF" button that downloads the file to memory as a Blob and opens the native browser print dialog.

*(Note: The component does not currently accept dynamic zoom or pagination props. It renders the entire document at once.)*
