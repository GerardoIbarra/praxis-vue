<script setup>
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Empieza a escribir aquí...</p>')
</script>

# Praxis Editor

El `PxEditor` es un editor de texto enriquecido basado en Vue, utilizando Tiptap/ProseMirror debajo. Ofrece una interfaz premium con soporte para múltiples formatos, atajos de teclado y tema oscuro.

## Demostración

<ClientOnly>
  <div class="my-6 border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
    <PxEditor v-model="content" />
  </div>
  <p class="text-sm text-gray-500 mt-2">Prueba escribiendo algo en el editor interactivo de arriba. Soporta negritas (Ctrl+B), cursivas (Ctrl+I), y comandos mediante `/`.</p>
</ClientOnly>

## Uso Básico

Asegúrate de tener el paquete `praxis-vue-editor` instalado.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxEditor } from 'praxis-vue-editor'
import 'praxis-vue-editor/dist/praxis-editor.css'

const content = ref('<p>Empieza a escribir aquí...</p>')
</script>

<template>
  <div class="max-w-3xl mx-auto border rounded-xl overflow-hidden shadow-sm">
    <PxEditor v-model="content" />
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
