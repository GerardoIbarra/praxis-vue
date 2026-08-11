<script setup>
import { ref } from 'vue'
import InfiniteScrollSelect from '@praxis/ui-src/components/forms/InfiniteScrollSelect.vue'

const options = ref([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }])
const hasMore = ref(true)
const loading = ref(false)
const selected = ref(null)

const loadMore = async () => {
  if (!hasMore.value) return
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const currentLen = options.value.length
  const newItems = Array.from({ length: 5 }, (_, i) => ({
    id: currentLen + i + 1,
    name: `Item ${currentLen + i + 1}`
  }))
  
  options.value.push(...newItems)
  loading.value = false
  
  // Stop after 20 items
  if (options.value.length >= 20) {
    hasMore.value = false
  }
}
</script>

# InfiniteScrollSelect

A `vue-select` wrapper that triggers a load-more callback when the user scrolls to the bottom of the dropdown options. Designed for large datasets loaded from an API.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <InfiniteScrollSelect
      v-model="selected"
      :options="options"
      :has-more="hasMore"
      :loading-scroll="loading"
      :load-more-scroll="loadMore"
      placeholder="Scroll down to load more..."
    />
    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--vp-c-text-2);">
      Selected: <strong>{{ selected ? selected.name : 'None' }}</strong>
      <br />Total loaded: {{ options.length }}
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { InfiniteScrollSelect } from 'praxis-vue-ui'

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

  </template>
</ComponentDemo>

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
