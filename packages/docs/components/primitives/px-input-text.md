---
title: PxInputText
description: A labeled text input primitive with error, hint, and icon slot support.
---

<script setup>
import { ref } from 'vue'
import { Mail, Search } from '@lucide/vue'
import PxInputText from '@praxis/px-src/components/_primitives/PxInputText.vue'

const email = ref('')
const search = ref('')
</script>

# PxInputText

A labeled text input primitive with built-in error/hint messaging and optional left/right icons. Supports `text`, `password`, `email`, `number`, `search`, `tel`, and `url` types.

## Usage

<ComponentDemo>
  <div style="display:flex; flex-direction:column; gap:1rem; width:100%; max-width:320px;">
    <PxInputText v-model="email" label="Email" placeholder="you@example.com" type="email" :icon-left="Mail" />
    <PxInputText v-model="search" label="Search" placeholder="Search..." :icon-left="Search" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { Mail } from '@lucide/vue'
import { PxInputText } from 'praxis-vue-ui'

const email = ref('')
</script>

<template>
  <PxInputText
    v-model="email"
    label="Email"
    placeholder="you@example.com"
    type="email"
    :icon-left="Mail"
  />
</template>
```

  </template>
</ComponentDemo>

## Error & Hint States

<ComponentDemo title="Error & Hint">
  <div style="display:flex; flex-direction:column; gap:1rem; width:100%; max-width:320px;">
    <PxInputText label="Username" model-value="ab" error="Username must be at least 3 characters." />
    <PxInputText label="Display Name" hint="This is shown publicly on your profile." />
  </div>

  <template #code>

```vue
<template>
  <PxInputText label="Username" model-value="ab" error="Username must be at least 3 characters." />
  <PxInputText label="Display Name" hint="This is shown publicly on your profile." />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxInputText" />
