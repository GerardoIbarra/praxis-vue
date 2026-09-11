<script setup>
import { ref } from 'vue'
import PxCommandPalette from '@praxis/px-src/components/overlays/PxCommandPalette.vue'

const isOpen = ref(false)
const selectedAction = ref('')

const commands = [
  { 
    id: 'dashboard', 
    title: 'Dashboard Principal', 
    subtitle: 'Métricas, KPIs y resumen operativo',
    group: 'Navegación', 
    shortcut: ['G', 'D'],
    perform: () => { selectedAction.value = 'Navegando a Dashboard' }
  },
  { 
    id: 'users', 
    title: 'Gestión de Usuarios', 
    subtitle: 'Administración de roles y accesos',
    group: 'Navegación', 
    shortcut: ['G', 'U'],
    perform: () => { selectedAction.value = 'Navegando a Usuarios' }
  },
  { 
    id: 'export-report', 
    title: 'Generar Reporte Ejecutivo', 
    subtitle: 'Exporta balance trimestral en Excel',
    group: 'Acciones Rápidas', 
    badge: 'Pro',
    shortcut: ['Ctrl', 'E'],
    perform: () => { selectedAction.value = 'Generando Reporte...' }
  },
  { 
    id: 'dark-mode', 
    title: 'Cambiar Tema (Oscuro/Claro)', 
    subtitle: 'Alterna el modo de color de la interfaz',
    group: 'Preferencias', 
    keywords: ['tema', 'dark', 'light', 'color'],
    perform: () => { selectedAction.value = 'Tema cambiado' }
  }
]
</script>

# PxCommandPalette

A command palette / Spotlight-style universal search dialog accessible with `Ctrl + K` (or `Cmd + K` on macOS). Provides instant search, grouped actions, keyboard navigation, and keyboard shortcut indicators.

## Basic Usage

Click the button below or press <kbd class="px-kbd">Ctrl</kbd> + <kbd class="px-kbd">K</kbd> anywhere on this page to test it.

<ComponentDemo title="Command Palette">
  <div class="flex flex-col items-center gap-4 py-6">
    <button
      type="button"
      @click="isOpen = true"
      class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-800 text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 shadow-sm transition-all"
    >
      <span>Abrir Buscador Universal</span>
      <div class="flex items-center gap-1 text-xs text-surface-400 font-mono">
        <kbd class="px-1.5 py-0.5 rounded border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">Ctrl</kbd>
        <span>+</span>
        <kbd class="px-1.5 py-0.5 rounded border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">K</kbd>
      </div>
    </button>

    <div v-if="selectedAction" class="text-xs font-semibold text-p-primary bg-p-primary/10 px-3 py-1.5 rounded-lg">
      Última acción ejecutada: {{ selectedAction }}
    </div>

    <PxCommandPalette
      v-model="isOpen"
      :commands="commands"
      placeholder="Escribe un comando o busca..."
      @select="(cmd) => selectedAction = cmd.title"
    />
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxCommandPalette, type CommandItem } from 'praxis-vue-ui'

const isOpen = ref(false)

const commands: CommandItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Principal',
    subtitle: 'Métricas, KPIs y resumen operativo',
    group: 'Navegación',
    shortcut: ['G', 'D'],
    perform: () => console.log('Ir a Dashboard')
  },
  {
    id: 'new-user',
    title: 'Crear Nuevo Usuario',
    group: 'Acciones Rápidas',
    shortcut: ['N', 'U'],
    badge: 'Admin',
    perform: () => console.log('Crear usuario')
  }
]
</script>

<template>
  <!-- Trigger button (or activate with Ctrl+K / Cmd+K) -->
  <button @click="isOpen = true">
    Buscar (Ctrl + K)
  </button>

  <PxCommandPalette
    v-model="isOpen"
    :commands="commands"
    @select="(cmd) => console.log('Seleccionado:', cmd)"
  />
</template>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxCommandPalette" />

### CommandItem Interface

```ts
interface CommandItem {
  id: string | number
  title: string
  subtitle?: string
  group?: string          // Categorizes commands into sections
  icon?: Component        // Icon component (e.g. Lucide)
  badge?: string          // Small tag displayed next to title
  shortcut?: string[]     // Visual shortcut hints (e.g. ['Ctrl', 'P'])
  keywords?: string[]     // Additional search terms
  disabled?: boolean
  perform?: (item: CommandItem) => void
}
```
