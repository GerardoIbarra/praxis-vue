# InfiniteScrollSelect

A `vue-select` wrapper that triggers a load-more callback when the user scrolls to the bottom of the dropdown options. Designed for large datasets loaded from an API.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { InfiniteScrollSelect } from '@praxis/vue'

const options = ref([/* initial page */])
const hasMore = ref(true)
const loading = ref(false)

const loadMore = async () => {
  loading.value = true
  const newItems = await api.getNextPage()
  options.value.push(...newItems)
  loading.value = false
}
</script>

<template>
  <InfiniteScrollSelect
    v-model="selected"
    :options="options"
    :has-more="hasMore"
    :loading-scroll="loading"
    :load-more-scroll="loadMore"
    placeholder="Search providers..."
  />
</template>
```

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'unknown', default: 'null', description: 'Currently selected value. Use with v-model.' },
  { name: 'options', type: 'unknown[]', required: true, description: 'Current page of loaded options.' },
  { name: 'hasMore', type: 'boolean', default: 'false', description: 'Whether more items are available to load from the server.' },
  { name: 'loadingScroll', type: 'boolean', default: 'false', description: 'Shows a spinner at the bottom of the dropdown while loading.' },
  { name: 'loadMoreScroll', type: '() => Promise<void>', default: 'undefined', description: 'Async callback invoked when the user scrolls to the bottom of the dropdown.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Placeholder text.' },
  { name: 'label', type: 'string', default: '\'name\'', description: 'Property name used as display label.' },
  { name: 'reduce', type: '(option) => unknown', default: 'undefined', description: 'Value extractor function.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'searchFunction', type: '(query: string) => void', default: 'undefined', description: 'Custom search handler (server-side search).' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
]" />
