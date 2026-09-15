---
title: PxEmptyState
description: A placeholder block for empty lists, tables, or search results.
---

<script setup>
import { Inbox, SearchX } from '@lucide/vue'
import PxButton from '@praxis/px-src/components/_primitives/PxButton.vue'
import PxEmptyState from '@praxis/px-src/components/data-display/PxEmptyState.vue'
</script>

# PxEmptyState

A placeholder block for empty lists, tables, or search results. Accepts an icon, a title, an optional description, and an `action` slot for a call-to-action button.

## Usage

<ComponentDemo>
  <PxEmptyState
    title="No results found"
    description="Try adjusting your filters or search terms."
    :icon="SearchX"
  />

  <template #code>

```vue
<script setup>
import { SearchX } from '@lucide/vue'
import { PxEmptyState } from 'praxis-vue-ui'
</script>

<template>
  <PxEmptyState
    title="No results found"
    description="Try adjusting your filters or search terms."
    :icon="SearchX"
  />
</template>
```

  </template>
</ComponentDemo>

## With Action

<ComponentDemo title="With Action">
  <PxEmptyState
    title="No items yet"
    description="Get started by creating your first item."
    :icon="Inbox"
  >
    <template #action>
      <PxButton label="Create Item" />
    </template>
  </PxEmptyState>

  <template #code>

```vue
<script setup>
import { Inbox } from '@lucide/vue'
import { PxEmptyState, PxButton } from 'praxis-vue-ui'
</script>

<template>
  <PxEmptyState title="No items yet" description="Get started by creating your first item." :icon="Inbox">
    <template #action>
      <PxButton label="Create Item" />
    </template>
  </PxEmptyState>
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxEmptyState" />
