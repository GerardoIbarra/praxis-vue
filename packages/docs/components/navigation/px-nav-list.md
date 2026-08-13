<script setup>
import { ref } from 'vue'
import PxNavList from '@praxis/px-src/components/navigation/PxNavList.vue'
import { Home, Users, Settings } from '@lucide/vue'

const menu = ref([
  { label: 'General', separator: true },
  { label: 'Dashboard', icon: Home, to: '/dashboard' },
  { label: 'Users', icon: Users, to: '/users' },
  {
    label: 'Settings',
    icon: Settings,
    key: 'config',
    items: [
      { label: 'Profile', to: '/profile' },
      { label: 'Security', to: '/security' }
    ]
  }
])
</script>

# Px Nav List

The `PxNavList` component is a collapsible navigation list, commonly used in sidebars. It renders menu items, grouped links (with one level of depth), and separators, including active route highlighting.

## Basic Usage

The component expects a data model (`NavListItem[]`) to render the links. It has no opinion on routing or authentication, so you must pass it the already filtered items.

<ComponentDemo>
  <div class="w-full max-w-sm border-r h-[500px] p-2 bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
    <PxNavList :model="menu" active-path="/dashboard" />
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxNavList } from 'px-vue-ui'
import { Home, Users, Settings } from '@lucide/vue'

const menu = ref([
  { label: 'General', separator: true },
  { label: 'Dashboard', icon: Home, to: '/dashboard' },
  { label: 'Users', icon: Users, to: '/users' },
  {
    label: 'Settings',
    icon: Settings,
    key: 'config',
    items: [
      { label: 'Profile', to: '/profile' },
      { label: 'Security', to: '/security' }
    ]
  }
])
</script>

<template>
  <div class="w-64 border-r h-screen p-2 bg-white dark:bg-slate-900">
    <PxNavList :model="menu" active-path="/dashboard" />
  </div>
</template>
```

  </template>
</ComponentDemo>

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `model` | `NavListItem[]` | Required | The array of items that make up the menu. |
| `collapsed` | `boolean` | `false` | Defines whether the menu is shown in collapsed mode (icons only). |
| `activePath` | `string` | `""` | Current path, used to highlight the active link and auto-expand its group. |
| `linkComponent` | `string \| Component` | `"a"` | Tag or component to use to render the links (e.g. `RouterLink`). |

## Events

- `@select`: Emitted when the user clicks a navigation item. Receives the selected `NavListItem` object.
