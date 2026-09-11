<script setup lang="ts">
import { ref, computed } from 'vue'
import rawManifest from '../../data/api-manifest.json'

interface PropItem {
  name: string
  type: string
  default?: string
  required?: boolean
  description?: string
}

interface EmitItem {
  name: string
  payload?: string
  description?: string
}

interface SlotItem {
  name: string
  props?: string
  description?: string
}

interface ComponentMeta {
  name: string
  description?: string
  props?: PropItem[]
  emits?: EmitItem[]
  slots?: SlotItem[]
}

const manifest = rawManifest as Record<string, ComponentMeta>

const props = withDefaults(
  defineProps<{
    component: string
    hideProps?: boolean
    hideEmits?: boolean
    hideSlots?: boolean
    searchable?: boolean
  }>(),
  {
    hideProps: false,
    hideEmits: false,
    hideSlots: false,
    searchable: true,
  }
)

function toPascalCase(str: string): string {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase())
}

const componentData = computed<ComponentMeta | null>(() => {
  const query = props.component.trim()
  if (manifest[query]) return manifest[query]
  
  const pascal = toPascalCase(query)
  if (manifest[pascal]) return manifest[pascal]
  
  if (!pascal.startsWith('Px') && manifest['Px' + pascal]) {
    return manifest['Px' + pascal]
  }

  return null
})

const availableTabs = computed(() => {
  if (!componentData.value) return []
  const tabs: Array<{ id: 'props' | 'emits' | 'slots'; label: string; count: number }> = []

  const pCount = componentData.value.props?.length || 0
  if (!props.hideProps && pCount > 0) {
    tabs.push({ id: 'props', label: 'Props', count: pCount })
  }

  const eCount = componentData.value.emits?.length || 0
  if (!props.hideEmits && eCount > 0) {
    tabs.push({ id: 'emits', label: 'Events', count: eCount })
  }

  const sCount = componentData.value.slots?.length || 0
  if (!props.hideSlots && sCount > 0) {
    tabs.push({ id: 'slots', label: 'Slots', count: sCount })
  }

  return tabs
})

const activeTab = ref<'props' | 'emits' | 'slots'>('props')

// Auto-switch to first available tab
if (availableTabs.value.length > 0 && !availableTabs.value.some((t) => t.id === activeTab.value)) {
  activeTab.value = availableTabs.value[0].id
}

const searchQuery = ref('')
const copiedType = ref<string | null>(null)

const copyType = async (typeText: string) => {
  try {
    await navigator.clipboard.writeText(typeText)
    copiedType.value = typeText
    setTimeout(() => {
      copiedType.value = null
    }, 1500)
  } catch (_) {
    // clipboard unavailable
  }
}

const filteredProps = computed(() => {
  const list = componentData.value?.props || []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return list
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
  )
})

const filteredEmits = computed(() => {
  const list = componentData.value?.emits || []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return list
  return list.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      (e.payload && e.payload.toLowerCase().includes(q)) ||
      (e.description && e.description.toLowerCase().includes(q))
  )
})

const filteredSlots = computed(() => {
  const list = componentData.value?.slots || []
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return list
  return list.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      (s.props && s.props.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q))
  )
})
</script>

<template>
  <div v-if="!componentData" class="praxis-api-error">
    <span>Component <code>{{ component }}</code> not found in API manifest.</span>
  </div>

  <div v-else class="praxis-api-container">
    <!-- Header: Tabs and Search Filter -->
    <div class="praxis-api-toolbar">
      <!-- Tabs -->
      <div class="praxis-api-tabs">
        <button
          v-for="tab in availableTabs"
          :key="tab.id"
          class="praxis-api-tab-btn"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span>{{ tab.label }}</span>
          <span class="praxis-api-tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Search Box -->
      <div v-if="searchable" class="praxis-api-search-wrapper">
        <svg class="praxis-api-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="praxis-api-search-input"
          placeholder="Filter properties..."
        />
        <button
          v-if="searchQuery"
          class="praxis-api-search-clear"
          title="Clear filter"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Props Section -->
    <div v-if="activeTab === 'props'" class="praxis-api-table-wrapper">
      <table v-if="filteredProps.length > 0" class="praxis-api-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="propItem in filteredProps" :key="propItem.name">
            <td>
              <div class="praxis-api-prop-cell">
                <span class="prop-name">{{ propItem.name }}</span>
                <span v-if="propItem.required" class="prop-required">required</span>
              </div>
            </td>
            <td>
              <code
                class="prop-type prop-type-interactive"
                :title="copiedType === propItem.type ? 'Copied!' : 'Click to copy type'"
                @click="copyType(propItem.type)"
              >
                {{ propItem.type }}
              </code>
            </td>
            <td>
              <span class="prop-default">{{ propItem.default ?? '—' }}</span>
            </td>
            <td class="prop-desc">
              {{ propItem.description || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="praxis-api-empty">
        <span>No props matching "<strong>{{ searchQuery }}</strong>"</span>
      </div>
    </div>

    <!-- Events Section -->
    <div v-if="activeTab === 'emits'" class="praxis-api-table-wrapper">
      <table v-if="filteredEmits.length > 0" class="praxis-api-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Payload</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emitItem in filteredEmits" :key="emitItem.name">
            <td>
              <span class="prop-name">{{ emitItem.name }}</span>
            </td>
            <td>
              <code v-if="emitItem.payload" class="prop-type">{{ emitItem.payload }}</code>
              <span v-else class="prop-default">—</span>
            </td>
            <td class="prop-desc">
              {{ emitItem.description || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="praxis-api-empty">
        <span>No events matching "<strong>{{ searchQuery }}</strong>"</span>
      </div>
    </div>

    <!-- Slots Section -->
    <div v-if="activeTab === 'slots'" class="praxis-api-table-wrapper">
      <table v-if="filteredSlots.length > 0" class="praxis-api-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slotItem in filteredSlots" :key="slotItem.name">
            <td>
              <span class="prop-name">{{ slotItem.name }}</span>
            </td>
            <td>
              <code v-if="slotItem.props" class="prop-type">{{ slotItem.props }}</code>
              <span v-else class="prop-default">—</span>
            </td>
            <td class="prop-desc">
              {{ slotItem.description || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="praxis-api-empty">
        <span>No slots matching "<strong>{{ searchQuery }}</strong>"</span>
      </div>
    </div>
  </div>
</template>
