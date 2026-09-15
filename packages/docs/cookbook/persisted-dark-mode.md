<script setup>
import { ref, watch, onMounted } from 'vue'
import PxThemeSwitch from '@praxis/px-src/components/base/PxThemeSwitch.vue'
import PxCard from '@praxis/px-src/components/layout/PxCard.vue'
import PxLabel from '@praxis/px-src/components/base/PxLabel.vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('demo-color-scheme')
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
})

watch(isDark, (val) => {
  localStorage.setItem('demo-color-scheme', val ? 'dark' : 'light')
})
</script>

# Persisted Dark Mode Toggle

[`PxThemeSwitch`](/components/base/px-theme-switch) is a controlled boolean input — it doesn't touch the DOM or `localStorage` on its own (see [Theming → Dark mode](/guide/theming#dark-mode)). This recipe wires it up completely: apply the `.dark` class the library's CSS variables key off of, remember the choice, and respect the OS preference on first visit.

<ComponentDemo title="Dark Mode Toggle">
  <PxCard style="max-width: 320px;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <PxLabel label="Dark mode" />
      <PxThemeSwitch v-model="isDark" />
    </div>
  </PxCard>

  <template #code>

```vue
<script setup>
import { ref, watch, onMounted } from 'vue'
import { PxThemeSwitch, PxCard, PxLabel } from 'praxis-vue-ui'

const isDark = ref(false)

onMounted(() => {
  // 1. Restore a saved choice, or fall back to the OS preference
  const saved = localStorage.getItem('color-scheme')
  isDark.value = saved
    ? saved === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  applyClass(isDark.value)
})

watch(isDark, (val) => {
  localStorage.setItem('color-scheme', val ? 'dark' : 'light')
  applyClass(val)
})

// 2. Toggle the class the library's CSS variables react to
function applyClass(dark) {
  document.documentElement.classList.toggle('dark', dark)
}
</script>

<template>
  <PxCard>
    <div class="flex items-center justify-between gap-4">
      <PxLabel label="Dark mode" />
      <PxThemeSwitch v-model="isDark" />
    </div>
  </PxCard>
</template>
```

  </template>
</ComponentDemo>

## Why the class goes on `<html>`, not a wrapper `<div>`

Praxis Vue's `.dark` overrides live on the `.dark` class itself (`.dark { --ui-primary: ...; }` in `base.css`), so it works no matter where you apply it in the ancestor chain. Putting it on `document.documentElement` (`<html>`) rather than a local wrapper means dark mode also affects anything outside your Vue app's mount point — the native `<body>` background, browser-native form controls, and any static HTML shell around your SPA.

If you only want to theme part of a page, apply `.dark` to that container instead — the CSS variables cascade normally.
