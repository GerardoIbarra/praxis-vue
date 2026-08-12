<script setup>
import { ref } from 'vue'
import PraxisThemeToggle from '@praxis/ui-src/components/base/PraxisThemeToggle.vue'

const isDark = ref(false)
</script>

# PraxisThemeToggle

An animated sun/moon toggle switch for controlling light/dark mode. Uses CSS transitions for smooth thumb movement and icon state changes.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem">
    <PraxisThemeToggle v-model="isDark" />
    <p style="font-size:0.875rem;color:var(--vp-c-text-2)">
      Current theme: <strong>{{ isDark ? '🌙 Dark' : '☀️ Light' }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisThemeToggle } from 'praxis-vue-ui'

const isDark = ref(false)
</script>

<template>
  <PraxisThemeToggle v-model="isDark" />
  <p>Theme: {{ isDark ? 'Dark' : 'Light' }}</p>
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Current state of the toggle. true = dark mode, false = light mode. Use with v-model.' },
]" />

## Emits

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'boolean', description: 'Emitted when the toggle is clicked. Value is the new boolean state.' },
  { name: 'toggle', payload: 'boolean', description: 'Also emitted on toggle. Useful for triggering global theme logic without v-model.' },
]" />

## Usage with Dark Mode

Pair `PraxisThemeToggle` with a global dark mode state manager. A common pattern:

```ts
// composables/useTheme.ts
import { ref, watch } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggle = (val: boolean) => {
    isDark.value = val
    document.documentElement.classList.toggle('dark', val)
  }
  return { isDark, toggle }
}
```

```vue
<template>
  <PraxisThemeToggle v-model="isDark" @toggle="toggle" />
</template>
```
