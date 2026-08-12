# Praxis Editor

El `PraxisEditor` es un editor de texto enriquecido basado en Vue, utilizando Tiptap/ProseMirror debajo. Ofrece una interfaz premium con soporte para múltiples formatos, atajos de teclado y tema oscuro.

## Uso Básico

Asegúrate de tener el paquete `@praxis/editor` instalado.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PraxisEditor } from '@praxis/editor'
import '@praxis/editor/dist/praxis-editor.css'

const content = ref('<p>Empieza a escribir aquí...</p>')
</script>

<template>
  <div class="max-w-3xl mx-auto border rounded-xl overflow-hidden shadow-sm">
    <PraxisEditor v-model="content" />
  </div>
</template>
```

## Props

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `modelValue` | `string` | `""` | El contenido en formato HTML del editor. Úsalo con `v-model`. |
| `placeholder` | `string` | `"Type '/' for commands"` | Texto de fondo cuando el editor está vacío. |
| `editable` | `boolean` | `true` | Determina si el usuario puede modificar el contenido. |
| `minHeight` | `string` | `"200px"` | Altura mínima del contenedor de escritura. |

## Eventos

- `@update:modelValue`: Emitido cuando el contenido cambia. Devuelve el HTML como string.
- `@focus`: Emitido cuando el editor obtiene el foco.
- `@blur`: Emitido cuando el editor pierde el foco.
