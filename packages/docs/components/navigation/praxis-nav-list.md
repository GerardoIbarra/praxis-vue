# Praxis Nav List

El componente `PraxisNavList` es una lista de navegación colapsable, comúnmente utilizada en barras laterales (sidebars). Renderiza elementos de menú, enlaces agrupados (con un nivel de profundidad) y separadores, incluyendo resaltado de la ruta activa.

## Uso Básico

El componente espera un modelo de datos (`NavListItem[]`) para renderizar los enlaces. No tiene una opinión sobre enrutamiento o autenticación, por lo que debes pasarle los items ya filtrados.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PraxisNavList } from 'praxis-vue-ui'
import { Home, Users, Settings } from 'lucide-vue-next'

const menu = ref([
  { label: 'General', separator: true },
  { label: 'Dashboard', icon: Home, to: '/dashboard' },
  { label: 'Users', icon: Users, to: '/users' },
  {
    label: 'Configuración',
    icon: Settings,
    key: 'config',
    items: [
      { label: 'Perfil', to: '/profile' },
      { label: 'Seguridad', to: '/security' }
    ]
  }
])
</script>

<template>
  <div class="w-64 border-r h-screen p-2 bg-white dark:bg-slate-900">
    <PraxisNavList :model="menu" active-path="/dashboard" />
  </div>
</template>
```

## Props

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `model` | `NavListItem[]` | Obligatorio | El arreglo de elementos que conforman el menú. |
| `collapsed` | `boolean` | `false` | Define si el menú se muestra en modo reducido (sólo iconos). |
| `activePath` | `string` | `""` | Ruta actual, se usa para resaltar el enlace activo y auto-expandir su grupo. |
| `linkComponent` | `string \| Component` | `"a"` | Etiqueta o componente a usar para renderizar los enlaces (ej. `RouterLink`). |

## Eventos

- `@select`: Emitido cuando el usuario hace clic en un elemento de navegación. Recibe el objeto `NavListItem` seleccionado.
