<script setup>
import { ref } from 'vue'
import PxTabComponent from '@praxis/px-src/components/navigation/PxTabComponent.vue'

const activeTab = ref('profile')

const tabs = [
  { key: 'profile', label: 'Profile', icon: 'User', show: true },
  { key: 'contact', label: 'Contact', icon: 'MapPinned', show: true },
  { key: 'billing', label: 'Billing', icon: 'Receipt', show: true },
  { key: 'history', label: 'History', icon: 'History', show: true },
]

const tabsWithDisabled = [
  { key: 'profile', label: 'Profile', icon: 'User', show: true, enabled: true },
  { key: 'contact', label: 'Contact', icon: 'MapPinned', show: true, enabled: false },
  { key: 'billing', label: 'Billing', icon: 'Receipt', show: true, enabled: true },
]
</script>

# PxTabComponent

A horizontal tab bar with icon support, active state highlighting, and optional close/remove tab functionality. Renders only tabs with `show !== false`.

## Basic Usage

<ComponentDemo>
  <div style="width:100%">
    <PxTabComponent v-model="activeTab" :tabs="tabs" />
    <div style="padding:1rem;font-size:0.875rem;color:var(--vp-c-text-2)">
      Active tab: <strong>{{ activeTab }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxTabComponent } from 'px-vue-ui'

const activeTab = ref('profile')

const tabs = [
  { key: 'profile', label: 'Profile', icon: 'User', show: true },
  { key: 'contact', label: 'Contact', icon: 'MapPinned', show: true },
  { key: 'billing', label: 'Billing', icon: 'Receipt', show: true },
]
</script>

<template>
  <PxTabComponent v-model="activeTab" :tabs="tabs" />
  <div>Active: {{ activeTab }}</div>
</template>
```

  </template>
</ComponentDemo>

## With Protected (Disabled) Tabs

<ComponentDemo title="Protected Tabs">
  <div style="width:100%">
    <PxTabComponent
      v-model="activeTab"
      :tabs="tabsWithDisabled"
      :protected-tabs="['contact']"
    />
  </div>

  <template #code>

```vue
<PxTabComponent
  v-model="activeTab"
  :tabs="tabsWithDisabled"
  :protected-tabs="['contact']"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'tabs', type: 'GeneralTabsProfile[]', required: true, description: 'Array of tab definitions. Each item must have key, label, icon, and show.' },
  { name: 'modelValue', type: 'string', required: true, description: 'The key of the currently active tab. Use with v-model.' },
  { name: 'protectedTabs', type: 'string[]', default: '[]', description: 'Array of tab keys that are disabled when their enabled property is false.' },
]" />

## Tab Object Shape

```ts
interface GeneralTabsProfile {
  key: string            // Unique identifier, used as modelValue
  label: string          // Display text
  icon: string           // Lucide icon name (e.g. 'User', 'Calendar')
  show?: boolean         // Hide tab entirely when false (default: true)
  enabled?: boolean      // Used with protectedTabs to disable a tab
  tooltip?: string       // Optional tooltip on hover
  removeTab?: boolean    // Show ✕ button to close the tab
  command?: () => void   // Custom function to run on click (skips tab switching)
}
```

## Emits

<div class="px-section-header">
  <span class="px-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string', description: 'Emitted when the user clicks a tab. Value is the clicked tab\'s key.' },
  { name: 'remove-tab', payload: 'string | number', description: 'Emitted when the user clicks the ✕ remove button on a tab (requires removeTab: true on the tab).' },
]" />

## Slots

<div class="px-section-header">
  <span class="px-section-badge badge-slots">Slots</span>
</div>

| Slot | Description |
|------|-------------|
| `actions` | Content placed in the right side of the tab bar. Useful for action buttons. |
| `getback` | Additional right-side slot for back/return navigation. |
