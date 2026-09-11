<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import PxDataTable from '@praxis/px-src/components/data-display/PxDataTable.vue'
import PxBadge from '@praxis/px-src/components/_primitives/PxBadge.vue'

// Base mock dataset representing server database
const DATABASE = [
  { id: 1, name: 'Alice Johnson', email: 'alice@praxis.dev', role: 'Staff Engineer', status: 'Active', department: 'Platform', sales: 12450 },
  { id: 2, name: 'Bob Martinez', email: 'bob@praxis.dev', role: 'Product Designer', status: 'Active', department: 'Design', sales: 9800 },
  { id: 3, name: 'Carol Danvers', email: 'carol@praxis.dev', role: 'Frontend Lead', status: 'Away', department: 'UI Engineering', sales: 15300 },
  { id: 4, name: 'David Smith', email: 'david@praxis.dev', role: 'Security Architect', status: 'Active', department: 'Security', sales: 8400 },
  { id: 5, name: 'Eva Green', email: 'eva@praxis.dev', role: 'DevOps Engineer', status: 'Inactive', department: 'Infrastructure', sales: 6100 },
  { id: 6, name: 'Frank Castle', email: 'frank@praxis.dev', role: 'QA Automation', status: 'Active', department: 'Testing', sales: 11200 },
  { id: 7, name: 'Grace Hopper', email: 'grace@praxis.dev', role: 'Compiler Engineer', status: 'Active', department: 'Core Systems', sales: 24500 },
  { id: 8, name: 'Henry McCoy', email: 'henry@praxis.dev', role: 'Data Scientist', status: 'Away', department: 'Analytics', sales: 14750 },
  { id: 9, name: 'Iris West', email: 'iris@praxis.dev', role: 'Content Strategist', status: 'Active', department: 'Marketing', sales: 7300 },
  { id: 10, name: 'Jack Reacher', email: 'jack@praxis.dev', role: 'Security Analyst', status: 'Inactive', department: 'Security', sales: 9500 },
  { id: 11, name: 'Katherine Johnson', email: 'katherine@praxis.dev', role: 'Math Lead', status: 'Active', department: 'Research', sales: 31000 },
  { id: 12, name: 'Leo Fitz', email: 'leo@praxis.dev', role: 'Hardware Specialist', status: 'Active', department: 'IoT', sales: 18200 },
]

const columns = [
  { field: 'name', header: 'Usuario', sortable: true },
  { field: 'role', header: 'Rol / Puesto', sortable: true },
  { field: 'department', header: 'Departamento', sortable: true },
  { field: 'status', header: 'Estado', sortable: false },
  { field: 'sales', header: 'Ventas ($)', sortable: true },
]

// Remote state
const items = ref([])
const totalRecords = ref(DATABASE.length)
const isLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(4)
const searchQuery = ref('')
const sortField = ref('name')
const sortOrder = ref(1) // 1 = ASC, -1 = DESC

let searchTimeout = null

// Simulated remote API endpoint with network latency
async function fetchRemoteUsers({ page, limit, search, sort, order }) {
  isLoading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...DATABASE]
      if (search) {
        const q = search.toLowerCase()
        filtered = filtered.filter(u =>
          u.name.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q)
        )
      }
      if (sort) {
        filtered.sort((a, b) => {
          const valA = a[sort]
          const valB = b[sort]
          if (typeof valA === 'string') {
            return order === 1 ? valA.localeCompare(valB) : valB.localeCompare(valA)
          }
          return order === 1 ? valA - valB : valB - valA
        })
      }
      totalRecords.value = filtered.length
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)
      isLoading.value = false
      resolve(paginated)
    }, 400)
  })
}

async function loadData() {
  const data = await fetchRemoteUsers({
    page: currentPage.value,
    limit: pageSize.value,
    search: searchQuery.value,
    sort: sortField.value,
    order: sortOrder.value
  })
  items.value = data
}

function handlePageChange({ page, rows }) {
  currentPage.value = page
  pageSize.value = rows
  loadData()
}

function handleSort({ field, order }) {
  sortField.value = field
  sortOrder.value = order
  currentPage.value = 1
  loadData()
}

function handleSearchInput(e) {
  clearTimeout(searchTimeout)
  searchQuery.value = e.target.value
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadData()
  }, 350)
}

onMounted(() => {
  loadData()
})
</script>

# Data Table Remota: Paginación, Ordenamiento y Búsqueda Debounced

En aplicaciones empresariales con miles o millones de registros, cargar todo el conjunto de datos en el navegador del cliente es inviable. Esta receta demuestra la arquitectura recomendada para implementar **paginación server-side**, **ordenamiento remoto** y **búsqueda en tiempo real con debounce** utilizando `PxDataTable`.

---

## Demostración Interactiva

Interactúa con la tabla a continuación. Los datos se consultan con un retardo simulado de **400ms** mostrando el estado de carga (`loading`), conservando los parámetros de consulta y recalculando el total de páginas dinámicamente.

<ComponentDemo title="Tabla Remota con Búsqueda y Paginación Asíncrona">
  <div style="width:100%" class="space-y-4">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px;flex-wrap:wrap;">
      <div style="position:relative;max-width:320px;width:100%;">
        <input
          type="text"
          :value="searchQuery"
          placeholder="Buscar por nombre, rol..."
          @input="handleSearchInput"
          style="width:100%;padding:7px 12px;font-size:0.875rem;border-radius:8px;border:1px solid var(--vp-c-divider);background:var(--vp-c-bg-alt);color:var(--vp-c-text-1);outline:none;transition:border-color 0.15s;"
        />
      </div>
      <div style="font-size:0.8rem;color:var(--vp-c-text-2);">
        Registros filtrados: <strong style="color:var(--vp-c-brand-1)">{{ totalRecords }}</strong>
      </div>
    </div>
    <PxDataTable
      :items="items"
      :columns="columns"
      :loading="isLoading"
      :rows="pageSize"
      :rows-per-page-options="[2, 4, 8]"
      :sort-field="sortField"
      :sort-order="sortOrder"
      @page="handlePageChange"
      @sort="handleSort"
    >
      <template #status="{ row }">
        <PxBadge
          :variant="row.status === 'Active' ? 'success' : row.status === 'Away' ? 'warning' : 'neutral'"
          size="sm"
        >
          {{ row.status }}
        </PxBadge>
      </template>
      <template #sales="{ row }">
        <span style="font-family:monospace;font-weight:600;color:var(--vp-c-brand-1)">
          ${{ row.sales?.toLocaleString() }}
        </span>
      </template>
    </PxDataTable>
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PxDataTable, PxBadge } from 'praxis-vue-ui'

interface UserItem {
  id: number
  name: string
  role: string
  department: string
  status: 'Active' | 'Away' | 'Inactive'
  sales: number
}

const columns = [
  { field: 'name', header: 'Usuario', sortable: true },
  { field: 'role', header: 'Rol / Puesto', sortable: true },
  { field: 'department', header: 'Departamento', sortable: true },
  { field: 'status', header: 'Estado', sortable: false },
  { field: 'sales', header: 'Ventas ($)', sortable: true },
]

// Estado remoto
const items = ref<UserItem[]>([])
const totalRecords = ref(0)
const isLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const sortField = ref('name')
const sortOrder = ref(1)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Función de consulta a tu backend (API REST / GraphQL)
async function fetchFromApi(params: {
  page: number
  limit: number
  search: string
  sort: string
  order: number
}) {
  isLoading.value = true
  try {
    const query = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
      q: params.search,
      sortBy: params.sort,
      order: params.order === 1 ? 'asc' : 'desc'
    })
    const res = await fetch(`/api/users?${query}`)
    const json = await res.json()
    items.value = json.data
    totalRecords.value = json.total
  } finally {
    isLoading.value = false
  }
}

function loadData() {
  fetchFromApi({
    page: currentPage.value,
    limit: pageSize.value,
    search: searchQuery.value,
    sort: sortField.value,
    order: sortOrder.value
  })
}

function handlePageChange(event: { page: number; rows: number }) {
  currentPage.value = event.page
  pageSize.value = event.rows
  loadData()
}

function handleSort(event: { field: string; order: number }) {
  sortField.value = event.field
  sortOrder.value = event.order
  currentPage.value = 1
  loadData()
}

function handleSearch(e: Event) {
  if (debounceTimer) clearTimeout(debounceTimer)
  searchQuery.value = (e.target as HTMLInputElement).value
  debounceTimer = setTimeout(() => {
    currentPage.value = 1
    loadData()
  }, 300)
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="space-y-4">
    <!-- Barra de Búsqueda -->
    <div class="flex justify-between items-center">
      <input
        type="search"
        :value="searchQuery"
        placeholder="Buscar usuarios..."
        class="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        @input="handleSearch"
      />
      <span class="text-xs text-slate-500">
        Total: {{ totalRecords }} registros
      </span>
    </div>

    <!-- Data Table Reactiva -->
    <PxDataTable
      :items="items"
      :columns="columns"
      :loading="isLoading"
      :rows="pageSize"
      :rows-per-page-options="[10, 25, 50]"
      :sort-field="sortField"
      :sort-order="sortOrder"
      @page="handlePageChange"
      @sort="handleSort"
    >
      <!-- Renderizado Personalizado con Slots -->
      <template #status="{ row }">
        <PxBadge :variant="row.status === 'Active' ? 'success' : 'neutral'">
          {{ row.status }}
        </PxBadge>
      </template>

      <template #sales="{ row }">
        <span class="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          ${{ row.sales.toLocaleString() }}
        </span>
      </template>
    </PxDataTable>
  </div>
</template>
```

  </template>
</ComponentDemo>

---

## Paso a Paso: Implementación

### 1. Definición del Contrato de Estado
Para sincronizar la vista con el servidor, mantén variables reactivas dedicadas:
- `currentPage`: Página activa (1-indexed).
- `pageSize`: Cantidad de filas por página (`10`, `25`, `50`).
- `sortField` y `sortOrder`: Columna y dirección (`1` para ascendente, `-1` para descendente).
- `isLoading`: Para mostrar el estado visual esqueleto de `PxDataTable`.

### 2. Evitar peticiones redundantes con Debounce
Al escribir en el campo de búsqueda, nunca dispares una solicitud HTTP por cada tecla pulsada. Utiliza un temporizador o `useDebounceFn` de `@vueuse/core` con un retraso estándar de **300ms**:

```ts
import { useDebounceFn } from '@vueuse/core'

const debouncedSearch = useDebounceFn((term: string) => {
  searchQuery.value = term
  currentPage.value = 1 // Reinicia a la primera página tras filtrar
  loadData()
}, 300)
```

### 3. Escuchar los Eventos `@page` y `@sort`
`PxDataTable` emite eventos limpios con el nuevo payload cada vez que el usuario interactúa:
- `@page="{ page, rows }"`: Cuando cambia de página o altera el selector de filas.
- `@sort="{ field, order }"`: Al pulsar sobre cualquier cabecera con `sortable: true`.

::: tip Cancelación de Solicitudes Anteriores (AbortController)
Si el usuario escribe rápidamente o cambia de página varias veces seguidas, es una buena práctica utilizar `AbortController` para abortar cualquier petición en vuelo y evitar condiciones de carrera (*race conditions*).
:::
