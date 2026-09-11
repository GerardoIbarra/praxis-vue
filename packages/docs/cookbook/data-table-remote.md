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
  { field: 'name', header: 'User', sortable: true },
  { field: 'role', header: 'Role / Position', sortable: true },
  { field: 'department', header: 'Department', sortable: true },
  { field: 'status', header: 'Status', sortable: false },
  { field: 'sales', header: 'Sales ($)', sortable: true },
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

# Remote Data Table: Server-Side Pagination, Sorting & Debounced Search

In enterprise applications with thousands or millions of records, loading the entire dataset into the client browser is unfeasible. This recipe demonstrates the recommended architecture for implementing **server-side pagination**, **remote sorting**, and **real-time debounced search** using `PxDataTable`.

---

## Interactive Demonstration

Interact with the table below. The data is fetched with a simulated **400ms network delay**, displaying the loading skeleton state (`loading`), preserving query parameters, and dynamically updating total count and pages.

<ComponentDemo title="Remote Table with Async Search and Pagination">
  <div style="width:100%" class="space-y-4">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px;flex-wrap:wrap;">
      <div style="position:relative;max-width:320px;width:100%;">
        <input
          type="text"
          :value="searchQuery"
          placeholder="Search by name, role, department..."
          @input="handleSearchInput"
          style="width:100%;padding:7px 12px;font-size:0.875rem;border-radius:8px;border:1px solid var(--vp-c-divider);background:var(--vp-c-bg-alt);color:var(--vp-c-text-1);outline:none;transition:border-color 0.15s;"
        />
      </div>
      <div style="font-size:0.8rem;color:var(--vp-c-text-2);">
        Filtered records: <strong style="color:var(--vp-c-brand-1)">{{ totalRecords }}</strong>
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
  { field: 'name', header: 'User', sortable: true },
  { field: 'role', header: 'Role / Position', sortable: true },
  { field: 'department', header: 'Department', sortable: true },
  { field: 'status', header: 'Status', sortable: false },
  { field: 'sales', header: 'Sales ($)', sortable: true },
]

// Remote state
const items = ref<UserItem[]>([])
const totalRecords = ref(0)
const isLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const sortField = ref('name')
const sortOrder = ref(1)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Backend fetcher (REST API / GraphQL)
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
    <!-- Search Bar -->
    <div class="flex justify-between items-center">
      <input
        type="search"
        :value="searchQuery"
        placeholder="Search users..."
        class="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        @input="handleSearch"
      />
      <span class="text-xs text-slate-500">
        Total: {{ totalRecords }} records
      </span>
    </div>

    <!-- Reactive Data Table -->
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
      <!-- Custom Slot Renderers -->
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

## Step-by-Step Implementation

### 1. State Contract Definition
To synchronize the table view with the server, maintain dedicated reactive variables:
- `currentPage`: Current active page (1-indexed).
- `pageSize`: Number of rows per page (`10`, `25`, `50`).
- `sortField` & `sortOrder`: Active sorting column and direction (`1` for ascending, `-1` for descending).
- `isLoading`: Triggers the built-in skeleton loading state of `PxDataTable`.

### 2. Avoid Redundant Queries with Debounce
When typing in the search input, never dispatch an HTTP request on every keystroke. Use a timer or `useDebounceFn` from `@vueuse/core` with a standard **300ms** delay:

```ts
import { useDebounceFn } from '@vueuse/core'

const debouncedSearch = useDebounceFn((term: string) => {
  searchQuery.value = term
  currentPage.value = 1 // Reset to first page when query changes
  loadData()
}, 300)
```

### 3. Listening to `@page` and `@sort` Events
`PxDataTable` emits clean payloads whenever the user interacts:
- `@page="{ page, rows }"`: When changing page number or changing rows per page.
- `@sort="{ field, order }"`: When clicking any header with `sortable: true`.

::: tip Request Cancellation (AbortController)
If users rapidly type or switch pages, utilize an `AbortController` to abort any pending in-flight HTTP request to prevent race conditions.
:::
