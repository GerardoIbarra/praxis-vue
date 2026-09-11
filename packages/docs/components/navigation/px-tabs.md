<script setup>
import { ref } from 'vue'
import PxTabs from '@praxis/px-src/components/navigation/PxTabs.vue'

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

# PxTabs

A horizontal tab bar with icon support, active state highlighting, and optional close/remove tab functionality. Renders only tabs with `show !== false`.

## Basic Usage

<ComponentDemo>
  <div style="width:100%">
    <PxTabs v-model="activeTab" :tabs="tabs" />
    <div style="padding:1rem;font-size:0.875rem;color:var(--vp-c-text-2)">
      Active tab: <strong>{{ activeTab }}</strong>
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxTabs } from 'praxis-vue-ui'

const activeTab = ref('profile')

const tabs = [
  { key: 'profile', label: 'Profile', icon: 'User', show: true },
  { key: 'contact', label: 'Contact', icon: 'MapPinned', show: true },
  { key: 'billing', label: 'Billing', icon: 'Receipt', show: true },
]
</script>

<template>
  <PxTabs v-model="activeTab" :tabs="tabs" />
  <div>Active: {{ activeTab }}</div>
</template>
```

  </template>
</ComponentDemo>

## With Protected (Disabled) Tabs

<ComponentDemo title="Protected Tabs">
  <div style="width:100%">
    <PxTabs
      v-model="activeTab"
      :tabs="tabsWithDisabled"
      :protected-tabs="['contact']"
    />
  </div>

  <template #code>

```vue
<PxTabs
  v-model="activeTab"
  :tabs="tabsWithDisabled"
  :protected-tabs="['contact']"
/>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxTabs" />

### Tab Object Shape

```ts
interface TabItemConfig {
  key: string            // Unique identifier, used as modelValue
  label: string          // Display text
  icon?: string          // Lucide icon name (e.g. 'User', 'Calendar')
  show?: boolean         // Hide tab entirely when false (default: true)
  enabled?: boolean      // Used with protectedTabs to disable a tab
  tooltip?: string       // Optional tooltip on hover
  removeTab?: boolean    // Show ✕ button to close the tab
  command?: () => void   // Custom function to run on click (skips tab switching)
}
```
