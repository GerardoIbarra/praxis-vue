---
title: PxSelect
description: A powerful, flexible, native Vue select component with search and multi-select.
---

<script setup>
import { ref } from 'vue'
import { Search } from '@lucide/vue'
import PxSelect from '@praxis/px-src/components/_primitives/PxSelect.vue'

const selectedSingle = ref(null)
const selectedMultiple = ref([])

const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Date' }
]
</script>

# PxSelect

A robust, fully native, and highly customizable select/combobox component. Replaces external libraries while offering features like search, multi-select with chips, dynamic reducers, custom slots, and keyboard navigation.

## Basic Usage

### Single Select

<ComponentDemo title="Single Select">
  <div style="width:100%;display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;">
    <div style="min-width:240px;">
      <PxSelect 
        v-model="selectedSingle" 
        :options="options" 
        placeholder="Select a fruit" 
      />
    </div>
    <div style="flex:1;min-width:200px;">
      <p style="font-size:0.85rem;font-weight:600;margin-bottom:4px;">Selected Value:</p>
      <pre style="margin:0;padding:8px;border-radius:6px;background:var(--vp-c-bg-alt);font-size:0.8rem;font-family:monospace;">{{ selectedSingle }}</pre>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'

const selected = ref(null)
const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' }
]
</script>

<template>
  <PxSelect 
    v-model="selected" 
    :options="options" 
    placeholder="Select a fruit" 
  />
</template>
```

  </template>
</ComponentDemo>

### Multi Select & Search

Set `multiple` to `true` to enable chip-based multi-selection, and `searchable` to `true` to enable a search input within the dropdown.

<ComponentDemo title="Multi-Select & Search">
  <div style="width:100%;display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;">
    <div style="min-width:240px;flex:1;">
      <PxSelect 
        v-model="selectedMultiple" 
        :options="options" 
        :multiple="true"
        :searchable="true"
        placeholder="Select fruits..." 
      />
    </div>
    <div style="flex:1;min-width:200px;">
      <p style="font-size:0.85rem;font-weight:600;margin-bottom:4px;">Selected Values:</p>
      <pre style="margin:0;padding:8px;border-radius:6px;background:var(--vp-c-bg-alt);font-size:0.8rem;font-family:monospace;">{{ selectedMultiple }}</pre>
    </div>
  </div>

  <template #code>

```vue
<PxSelect 
  v-model="selectedMultiple" 
  :options="options" 
  :multiple="true" 
  :searchable="true" 
  placeholder="Select fruits..." 
/>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxSelect" />
