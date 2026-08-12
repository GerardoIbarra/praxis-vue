<script setup>
import PxVisualSelect from '@praxis/px-src/components/base/PxVisualSelect.vue'
import { ref } from 'vue'

const selectedGroup = ref(null)
const selectedColor = ref(null)

const groupOptions = [
  { value: 'frontend', name: 'Frontend Team' },
  { value: 'backend', name: 'Backend Team' },
  { value: 'design', name: 'Design Team' },
]

const colorOptions = [
  { id: 1, name: 'Red', color: '#ef4444' },
  { id: 2, name: 'Blue', color: '#3b82f6' },
  { id: 3, name: 'Green', color: '#22c55e' },
]
</script>

# PxVisualSelect

Un componente select unificado que muestra elementos visuales como iconos de usuario o cuadros de color junto a las opciones. Útil para asignar equipos o etiquetas de colores.

## Demostración

<div class="p-6 border rounded-lg bg-gray-50 flex gap-4">
  <div class="w-1/2">
    <label class="block mb-2 font-medium text-sm">Seleccionar Equipo (variant="group")</label>
    <PxVisualSelect
      v-model="selectedGroup"
      :options="groupOptions"
      variant="group"
      label="name"
      placeholder="Elige un equipo"
    />
    <p class="mt-2 text-sm text-gray-500">Valor seleccionado: {{ selectedGroup }}</p>
  </div>
  <div class="w-1/2">
    <label class="block mb-2 font-medium text-sm">Seleccionar Color (variant="color")</label>
    <PxVisualSelect
      v-model="selectedColor"
      :options="colorOptions"
      variant="color"
      label="name"
      placeholder="Elige un color"
    />
    <p class="mt-2 text-sm text-gray-500">Valor seleccionado: {{ selectedColor }}</p>
  </div>
</div>

## Uso Básico

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxVisualSelect } from 'px-vue-ui'

const selected = ref(null)

const options = [
  { value: 'frontend', name: 'Frontend Team' },
  { value: 'backend', name: 'Backend Team' },
]
</script>

<template>
  <PxVisualSelect
    v-model="selected"
    :options="options"
    variant="group"
    label="name"
    placeholder="Selecciona una opción"
  />
</template>
```

## Variantes Visuales

Usa la propiedad `variant` para cambiar la presentación visual de las opciones:

- `group`: Muestra un icono de "Usuarios". (Por defecto)
- `color`: Muestra un cuadro de color (requiere que cada objeto opción tenga una propiedad `color` con valor hexadecimal o nombre de color CSS válido).
