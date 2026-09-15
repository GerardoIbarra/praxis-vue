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

A common shell for any "manage X" page: a page header, a search filter, a data table with per-row actions, and an empty state when the filter matches nothing. Combines [`PxHeader`](/components/layout/px-header), [`PxListLayout`](/components/layout/px-list-layout), [`PxFilterBar`](/components/layout/px-filter-bar), [`PxDataTable`](/components/data-display/px-data-table), [`PxDropdownMenu`](/components/navigation/px-dropdown-menu), [`PxBadge`](/components/primitives/px-badge), and [`PxEmptyState`](/components/data-display/px-empty-state).

<ComponentDemo title="Admin List Page">
  <div style="width: 100%; border: 1px dashed var(--vp-c-divider); border-radius: 8px; padding: 1rem;">
    <PxHeader variant="list" title="Team Members" />
    <PxListLayout>
      <template #filter>
        <PxFilterBar>
          <input
            v-model="search"
            type="search"
            placeholder="Search by name..."
            class="input-base"
            style="padding: 0.5rem; max-width: 240px;"
          />
        </PxFilterBar>
      </template>
      <PxEmptyState
        v-if="filteredUsers.length === 0"
        title="No members found"
        description="Try a different search term."
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
        <input v-model="search" type="search" placeholder="Search by name..." />
      </PxFilterBar>
    </template>

    <!-- PxListLayout has no built-in empty state — toggle it yourself -->
    <PxEmptyState
      v-if="filteredUsers.length === 0"
      title="No members found"
      description="Try a different search term."
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

## Why this shape

- **`PxHeader` lives outside `PxListLayout`** — the layout only exposes `tabs`, `filter`, and a default content slot, not a header slot (see [`PxListLayout`'s slot table](/components/layout/px-list-layout#slots)).
- **The empty state is manual.** `PxDataTable` doesn't render one automatically when `items` is empty, so switch between `PxEmptyState` and `PxDataTable` with `v-if`/`v-else` on your filtered list, as shown above.
- **Row actions use `slotName`**, not a dedicated `actions` prop — any column can point at a named slot, which is how both the status badge and the dropdown menu get into the table.
