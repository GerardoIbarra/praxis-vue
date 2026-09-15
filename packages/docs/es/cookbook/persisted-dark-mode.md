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

# Toggle de Modo Oscuro Persistente

[`PxThemeSwitch`](/es/components/base/px-theme-switch) es un input booleano controlado — no toca el DOM ni `localStorage` por sí mismo (ver [Theming → Modo oscuro](/es/guide/theming#modo-oscuro)). Esta receta lo conecta por completo: aplica la clase `.dark` de la que dependen las variables CSS de la librería, recuerda la elección, y respeta la preferencia del sistema operativo en la primera visita.

<ComponentDemo title="Toggle de Modo Oscuro">
  <PxCard style="max-width: 320px;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <PxLabel label="Modo oscuro" />
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
      <PxLabel label="Modo oscuro" />
      <PxThemeSwitch v-model="isDark" />
    </div>
  </PxCard>
</template>
```

  </template>
</ComponentDemo>

## Por qué la clase va en `<html>` y no en un `<div>` envolvente

Los overrides `.dark` de Praxis Vue viven en la clase `.dark` misma (`.dark { --ui-primary: ...; }` en `base.css`), así que funciona sin importar dónde la apliques en la cadena de ancestros. Ponerla en `document.documentElement` (`<html>`) en vez de un wrapper local hace que el modo oscuro también afecte todo lo que está fuera del punto de montaje de tu app Vue — el fondo nativo del `<body>`, controles de formulario nativos del navegador, y cualquier shell HTML estático alrededor de tu SPA.

Si solo quieres tematizar parte de una página, aplica `.dark` a ese contenedor en su lugar — las variables CSS se propagan normalmente.
