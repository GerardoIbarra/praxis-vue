<script setup>
import { ref, computed } from 'vue'
import { Pencil, Trash2, Ban } from '@lucide/vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
import PxListLayout from '@praxis/px-src/components/layout/PxListLayout.vue'
import PxFilterBar from '@praxis/px-src/components/layout/PxFilterBar.vue'
import PxDataTable from '@praxis/px-src/components/data-display/PxDataTable.vue'
import PxDropdownMenu from '@praxis/px-src/components/navigation/PxDropdownMenu.vue'
import PxBadge from '@praxis/px-src/components/_primitives/PxBadge.vue'
import PxEmptyState from '@praxis/px-src/components/data-display/PxEmptyState.vue'
import { usePxToast } from '@praxis/px-src/composables/usePxToast'
import PxToast from '@praxis/px-src/components/_primitives/PxToast.vue'

const search = ref('')

const allUsers = [
  { id: 1, name: 'Alice Smith', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Jones', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carla Diaz', role: 'Viewer', status: 'Suspended' },
]

const filteredUsers = computed(() =>
  allUsers.filter((u) => u.name.toLowerCase().includes(search.value.toLowerCase()))
)

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status', slotName: 'status' },
  { field: 'id', header: '', slotName: 'actions', style: { width: '48px' } },
]

const { showSuccess } = usePxToast()

const actionsFor = (user) => [
  { label: 'Edit', lucideIcon: Pencil, command: () => showSuccess('Edit', `Editing ${user.name}`) },
  { label: 'Suspend', lucideIcon: Ban, command: () => showSuccess('Suspended', `${user.name} was suspended`) },
  { label: 'Delete', lucideIcon: Trash2, command: () => showSuccess('Deleted', `${user.name} was removed`) },
]
</script>

# Admin List Page

Una estructura común para cualquier página de "gestionar X": un header, un filtro de búsqueda, una tabla de datos con acciones por fila, y un estado vacío cuando el filtro no encuentra nada. Combina [`PxHeader`](/es/components/layout/px-header), [`PxListLayout`](/es/components/layout/px-list-layout), [`PxFilterBar`](/es/components/layout/px-filter-bar), [`PxDataTable`](/es/components/data-display/px-data-table), [`PxDropdownMenu`](/es/components/navigation/px-dropdown-menu), [`PxBadge`](/es/components/primitives/px-badge), y [`PxEmptyState`](/es/components/data-display/px-empty-state).

<ComponentDemo title="Admin List Page">
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px; padding: 1rem;">
    <PxHeader variant="list" title="Team Members" />
    <PxListLayout>
      <template #filter>
        <PxFilterBar>
          <input
            v-model="search"
            type="search"
            placeholder="Buscar por nombre..."
            class="input-base"
            style="padding: 0.5rem; max-width: 240px;"
          />
        </PxFilterBar>
      </template>
      <PxEmptyState
        v-if="filteredUsers.length === 0"
        title="No se encontraron miembros"
        description="Prueba con otro término de búsqueda."
      />
      <PxDataTable v-else :items="filteredUsers" :columns="columns">
        <template #status="{ data }">
          <PxBadge :value="data.status" :severity="data.status === 'Active' ? 'success' : 'danger'" />
        </template>
        <template #actions="{ data }">
          <PxDropdownMenu :items="actionsFor(data)" />
        </template>
      </PxDataTable>
    </PxListLayout>
    <PxToast />
  </div>

  <template #code>

```vue
<script setup>
import { ref, computed } from 'vue'
import { Pencil, Trash2, Ban } from '@lucide/vue'
import {
  PxHeader,
  PxListLayout,
  PxFilterBar,
  PxDataTable,
  PxDropdownMenu,
  PxBadge,
  PxEmptyState,
  PxToast,
  usePxToast,
} from 'praxis-vue-ui'

const search = ref('')

const allUsers = [
  { id: 1, name: 'Alice Smith', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Jones', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carla Diaz', role: 'Viewer', status: 'Suspended' },
]

const filteredUsers = computed(() =>
  allUsers.filter((u) => u.name.toLowerCase().includes(search.value.toLowerCase()))
)

// slotName on a column routes that cell through a named <template> slot below
const columns = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status', slotName: 'status' },
  { field: 'id', header: '', slotName: 'actions', style: { width: '48px' } },
]

const { showSuccess } = usePxToast()

const actionsFor = (user) => [
  { label: 'Edit', lucideIcon: Pencil, command: () => showSuccess('Edit', `Editing ${user.name}`) },
  { label: 'Suspend', lucideIcon: Ban, command: () => showSuccess('Suspended', `${user.name} was suspended`) },
  { label: 'Delete', lucideIcon: Trash2, command: () => showSuccess('Deleted', `${user.name} was removed`) },
]
</script>

<template>
  <PxHeader variant="list" title="Team Members" />

  <PxListLayout>
    <template #filter>
      <PxFilterBar>
        <input v-model="search" type="search" placeholder="Buscar por nombre..." />
      </PxFilterBar>
    </template>

    <!-- PxListLayout has no built-in empty state — toggle it yourself -->
    <PxEmptyState
      v-if="filteredUsers.length === 0"
      title="No se encontraron miembros"
      description="Prueba con otro término de búsqueda."
    />
    <PxDataTable v-else :items="filteredUsers" :columns="columns">
      <template #status="{ data }">
        <PxBadge :value="data.status" :severity="data.status === 'Active' ? 'success' : 'danger'" />
      </template>
      <template #actions="{ data }">
        <PxDropdownMenu :items="actionsFor(data)" />
      </template>
    </PxDataTable>
  </PxListLayout>

  <!-- Render once at the root of your app -->
  <PxToast />
</template>
```

  </template>
</ComponentDemo>

## Por qué esta estructura

- **`PxHeader` vive fuera de `PxListLayout`** — el layout solo expone los slots `tabs`, `filter` y uno por defecto para el contenido, no un slot de header (ver [la tabla de slots de `PxListLayout`](/es/components/layout/px-list-layout#slots)).
- **El estado vacío es manual.** `PxDataTable` no renderiza uno automáticamente cuando `items` está vacío, así que alterna entre `PxEmptyState` y `PxDataTable` con `v-if`/`v-else` sobre tu lista filtrada, como se muestra arriba.
- **Las acciones por fila usan `slotName`**, no una prop `actions` dedicada — cualquier columna puede apuntar a un slot con nombre, que es como tanto el badge de estado como el menú desplegable llegan a la tabla.
