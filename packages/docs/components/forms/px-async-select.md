<script setup>
import { ref } from 'vue'
import PxAsyncSelect from '@praxis/px-src/components/forms/PxAsyncSelect.vue'

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

# PxAsyncSelect

A searchable select that emits a `scrolling` event when the user scrolls near the bottom of the dropdown, so you can load and append the next page yourself. It doesn't call any load-more function for you — `hasMore` and `loading` are display-only flags you control.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%; max-width: 300px;">
    <PxAsyncSelect
      v-model="selected"
      :options="options"
      :has-more="hasMore"
      :loading="loading"
      placeholder="Scroll down to load more..."
      @scrolling="loadMore"
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
import { PxAsyncSelect } from 'praxis-vue-ui'

const options = ref([/* initial page */])
const hasMore = ref(true)
const loading = ref(false)

// Called on the 'scrolling' event — you decide when/how to fetch more
const loadMore = async () => {
  if (!hasMore.value || loading.value) return
  loading.value = true
  const newItems = await api.getNextPage()
  options.value.push(...newItems)
  loading.value = false
}
</script>

<template>
  <PxAsyncSelect
    v-model="selected"
    :options="options"
    :has-more="hasMore"
    :loading="loading"
    placeholder="Search providers..."
    @scrolling="loadMore"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'modelValue', type: 'string | number | object | null', default: 'null', description: 'Currently selected value. Use with v-model.' },
  { name: 'options', type: 'unknown[]', default: '[]', description: 'Current page of loaded options.' },
  { name: 'hasMore', type: 'boolean', default: 'false', description: 'Display-only flag — doesn\'t change behavior, use it to decide whether to fetch more on @scrolling.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading state while true.' },
  { name: 'placeholder', type: 'string', default: '\'\'', description: 'Placeholder text.' },
  { name: 'label', type: 'string', default: '\'name\'', description: 'Property name read from each option for its display text.' },
  { name: 'reduce', type: '(option) => unknown', default: 'undefined', description: 'Value extractor function.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows selecting more than one option.' },
  { name: 'clearable', type: 'boolean', default: 'true', description: 'Shows a button to clear the current selection.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'unknown', description: 'Emitted on selection change.' },
  { name: 'scrolling', payload: '—', description: 'Emitted (debounced) when the user scrolls near the bottom of the dropdown — this is your cue to load the next page.' },
  { name: 'search', payload: 'string', description: 'Emitted with the current search query as the user types.' },
  { name: 'open', payload: '—', description: 'Emitted when the dropdown opens.' },
  { name: 'select', payload: 'unknown', description: 'Emitted with the selected item.' },
]" />
