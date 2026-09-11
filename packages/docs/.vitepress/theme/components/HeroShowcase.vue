<script setup lang="ts">
import { ref } from 'vue'
import PxDataTable from '@praxis/px-src/components/data-display/PxDataTable.vue'
import PxAvatar from '@praxis/px-src/components/base/PxAvatar.vue'
import PxCommandPalette, { type CommandItem } from '@praxis/px-src/components/overlays/PxCommandPalette.vue'
import PxThemeSwitch from '@praxis/px-src/components/base/PxThemeSwitch.vue'

const activeTab = ref<'table' | 'command' | 'flow'>('table')
const isCommandPaletteOpen = ref(false)

// Tab 1: Data Table Data
const tableColumns = [
  { field: 'member', header: 'Team Member' },
  { field: 'role', header: 'Role' },
  { field: 'status', header: 'Status' },
  { field: 'activity', header: 'Recent Activity' },
]

const tableItems = ref([
  { id: 1, name: 'Sofia Kim', email: 'sofia.kim@praxis.dev', role: 'Staff Frontend Engineer', status: 'Active', activity: 'Reviewed PR #142 in praxis-ui' },
  { id: 2, name: 'Carlos Rivera', email: 'carlos.r@praxis.dev', role: 'Design Systems Lead', status: 'In Meeting', activity: 'Updated Figma design tokens' },
  { id: 3, name: 'Ana García', email: 'ana.garcia@praxis.dev', role: 'Fullstack Developer', status: 'Active', activity: 'Integrated Zod validation schema' },
  { id: 4, name: 'Luis Martínez', email: 'luis.m@praxis.dev', role: 'Product Architect', status: 'Offline', activity: 'Published v0.1.5 package' },
])

const selectedItems = ref([tableItems.value[0], tableItems.value[2]])

// Tab 2: Command Palette Commands
const paletteCommands: CommandItem[] = [
  { id: 'avatar', title: 'PxAvatar', subtitle: 'Smart initials and photo avatar with automatic palette', group: 'Base', keywords: ['avatar', 'initials', 'photo', 'user'] },
  { id: 'data-table', title: 'PxDataTable', subtitle: 'Feature-rich table with sorting, selection and export', group: 'Data Display', keywords: ['table', 'grid', 'data', 'pagination'] },
  { id: 'command-palette', title: 'PxCommandPalette', subtitle: 'Accessible keyboard-driven command menu overlay', group: 'Overlays', keywords: ['command', 'palette', 'search', 'shortcut'] },
  { id: 'time-picker', title: 'PxTimePicker', subtitle: 'Accessible 12h/24h time picker input', group: 'Forms', keywords: ['time', 'picker', 'clock', 'date'] },
  { id: 'theme-switch', title: 'PxThemeSwitch', subtitle: 'Smooth light/dark mode toggle button', group: 'Base', keywords: ['theme', 'dark', 'light', 'mode'] },
  { id: 'stepper', title: 'PxStepper', subtitle: 'Multi-step process navigation with permissions', group: 'Navigation', keywords: ['stepper', 'steps', 'wizard'] },
]

const handleCommandSelect = (item: CommandItem) => {
  const routes: Record<string, string> = {
    'avatar': '/components/base/px-avatar',
    'data-table': '/components/data-display/px-data-table',
    'command-palette': '/components/overlays/px-command-palette',
    'time-picker': '/components/forms/time-picker',
    'theme-switch': '/components/base/px-theme-switch',
    'stepper': '/components/navigation/px-stepper',
  }

  const target = routes[String(item.id)]
  if (target && typeof window !== 'undefined') {
    window.location.href = target
  }
}

// Tab 3: Interactive Flow / Sandbox State
const currentStep = ref(1)
const sandboxUser = ref({
  name: 'Elena Rostova',
  role: 'Engineering Director',
  active: true,
})
</script>

<template>
  <div class="praxis-hero-showcase">
    <!-- Ambient Glow Background -->
    <div class="praxis-hero-glow"></div>

    <!-- Main Floating Window Card -->
    <div class="praxis-hero-window">
      <!-- Window Titlebar -->
      <div class="praxis-hero-titlebar">
        <!-- macOS Window Dots -->
        <div class="praxis-window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>

        <!-- Segmented Tab Navigation -->
        <div class="praxis-window-tabs">
          <button
            class="praxis-window-tab"
            :class="{ 'is-active': activeTab === 'table' }"
            @click="activeTab = 'table'"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
            </svg>
            <span>PxDataTable</span>
            <span class="praxis-tab-badge">Live</span>
          </button>

          <button
            class="praxis-window-tab"
            :class="{ 'is-active': activeTab === 'command' }"
            @click="activeTab = 'command'"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            </svg>
            <span>PxCommandPalette</span>
            <span class="praxis-tab-badge">⌘K</span>
          </button>

          <button
            class="praxis-window-tab"
            :class="{ 'is-active': activeTab === 'flow' }"
            @click="activeTab = 'flow'"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Component Sandbox</span>
          </button>
        </div>

        <!-- Global Shortcut Action -->
        <div class="praxis-window-actions">
          <button
            class="praxis-quick-shortcut-btn"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            @click="isCommandPaletteOpen = true"
          >
            <span>Press</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>

      <!-- Window Content Body -->
      <div class="praxis-hero-body praxis-canvas-dots">
        <!-- View 1: PxDataTable in action -->
        <div v-if="activeTab === 'table'" class="praxis-showcase-view">
          <div class="praxis-view-header">
            <div>
              <h3 class="praxis-view-title">Enterprise Data Table</h3>
              <p class="praxis-view-sub">Native HTML rendering, automatic avatar color hashing, and multiple selection.</p>
            </div>
            <div class="praxis-selection-counter">
              <span class="counter-dot"></span>
              <span>{{ selectedItems.length }} of {{ tableItems.length }} selected</span>
            </div>
          </div>

          <div class="praxis-table-container">
            <PxDataTable
              v-model:selectedItems="selectedItems"
              :items="tableItems"
              :columns="tableColumns"
              selection-mode="multiple"
              :striped-rows="true"
            >
              <!-- Member column with Avatar -->
              <template #item-member="{ item }">
                <div class="praxis-cell-member">
                  <PxAvatar :name="item.name" size="sm" />
                  <div class="praxis-member-info">
                    <span class="member-name">{{ item.name }}</span>
                    <span class="member-email">{{ item.email }}</span>
                  </div>
                </div>
              </template>

              <!-- Status column with Pills -->
              <template #item-status="{ item }">
                <span
                  class="praxis-status-pill"
                  :class="[
                    item.status === 'Active' ? 'status-active' : '',
                    item.status === 'In Meeting' ? 'status-busy' : '',
                    item.status === 'Offline' ? 'status-offline' : ''
                  ]"
                >
                  {{ item.status }}
                </span>
              </template>
            </PxDataTable>
          </div>
        </div>

        <!-- View 2: PxCommandPalette Showcase -->
        <div v-if="activeTab === 'command'" class="praxis-showcase-view praxis-command-view">
          <div class="praxis-command-hero-box">
            <div class="praxis-command-trigger-banner" @click="isCommandPaletteOpen = true">
              <div class="trigger-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Type to search 55+ components, guides, and tokens...</span>
              </div>
              <div class="trigger-shortcut">
                <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>
              </div>
            </div>

            <div class="praxis-command-chips">
              <span class="chips-label">Quick test shortcuts:</span>
              <button
                v-for="cmd in paletteCommands.slice(0, 4)"
                :key="cmd.id"
                class="praxis-command-chip"
                @click="isCommandPaletteOpen = true"
              >
                <strong>{{ cmd.title }}</strong>
                <span class="chip-group">{{ cmd.group }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- View 3: Component Sandbox -->
        <div v-if="activeTab === 'flow'" class="praxis-showcase-view praxis-sandbox-view">
          <div class="praxis-sandbox-card">
            <div class="praxis-sandbox-steps">
              <button
                class="sandbox-step-btn"
                :class="{ active: currentStep === 1 }"
                @click="currentStep = 1"
              >
                <span class="step-num">1</span>
                <span>Profile & Identity</span>
              </button>
              <div class="step-connector"></div>
              <button
                class="sandbox-step-btn"
                :class="{ active: currentStep === 2 }"
                @click="currentStep = 2"
              >
                <span class="step-num">2</span>
                <span>Role & Controls</span>
              </button>
            </div>

            <div class="praxis-sandbox-form">
              <div v-if="currentStep === 1" class="sandbox-step-content">
                <div class="sandbox-avatar-preview">
                  <PxAvatar :name="sandboxUser.name" size="xl" :label="true" />
                  <div class="sandbox-input-group">
                    <label>Edit name (watch live hash color):</label>
                    <input
                      v-model="sandboxUser.name"
                      type="text"
                      class="praxis-sandbox-input"
                      placeholder="Type a person name..."
                    />
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 2" class="sandbox-step-content">
                <div class="sandbox-controls-row">
                  <div class="control-box">
                    <span class="control-label">Theme Mode:</span>
                    <PxThemeSwitch />
                  </div>
                  <div class="control-box">
                    <span class="control-label">Active Member:</span>
                    <input
                      v-model="sandboxUser.active"
                      type="checkbox"
                      style="accent-color:var(--p-primary-500);width:18px;height:18px"
                    />
                  </div>
                </div>
              </div>

              <div class="sandbox-footer">
                <button
                  class="praxis-demo-btn"
                  :disabled="currentStep === 1"
                  @click="currentStep--"
                >
                  Previous
                </button>
                <button
                  class="praxis-demo-btn is-active"
                  :disabled="currentStep === 2"
                  @click="currentStep++"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Global PxCommandPalette -->
    <PxCommandPalette
      v-model="isCommandPaletteOpen"
      :commands="paletteCommands"
      placeholder="Search Praxis Vue components or press Esc to close..."
      @select="handleCommandSelect"
    />
  </div>
</template>
