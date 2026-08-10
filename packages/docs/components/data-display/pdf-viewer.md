# PdfViewer

Renders a PDF document inline using `pdfjs-dist`. Supports page navigation, zoom, and responsive rendering. Can load from URL or base64 string.

## Usage

```vue
<script setup>
import { PdfViewer } from '@praxis/vue'
</script>

<template>
  <PdfViewer
    src="https://example.com/document.pdf"
    :initial-page="1"
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'src', type: 'string', required: true, description: 'URL or base64 data URI of the PDF to render.' },
  { name: 'initialPage', type: 'number', default: '1', description: 'Page to display when the component first loads.' },
  { name: 'height', type: 'string', default: '\'600px\'', description: 'CSS height of the viewer container.' },
]" />

## Notes

- Powered by `pdfjs-dist`. The PDF worker is configured automatically.
- `src` can be a remote URL, a local file URL, or a base64-encoded data URI.
- For large PDFs, pages are rendered lazily on demand.
