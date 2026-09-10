# praxis-vue-ui

<p align="center">
  <a href="https://www.npmjs.com/package/praxis-vue-ui">
    <img src="https://img.shields.io/npm/v/praxis-vue-ui.svg?style=flat-square&color=6366f1" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/praxis-vue-ui">
    <img src="https://img.shields.io/npm/dm/praxis-vue-ui.svg?style=flat-square&color=10b981" alt="npm downloads" />
  </a>
  <a href="https://bundlephobia.com/package/praxis-vue-ui">
    <img src="https://img.shields.io/bundlephobia/minzip/praxis-vue-ui?style=flat-square&color=f59e0b" alt="bundle size" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/npm/l/praxis-vue-ui.svg?style=flat-square&color=64748b" alt="license" />
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.5+-42b883.svg?style=flat-square&logo=vue.js" alt="vue version" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6.svg?style=flat-square&logo=typescript" alt="typescript" />
  </a>
</p>

<p align="center">
  A modern, enterprise-ready Vue 3 UI component suite built with <b>PrimeVue</b>, <b>Tailwind CSS</b>, and <b>TanStack Table</b>.
  <br />
  Designed for data-intensive dashboards, mission-critical admin panels, and fluid design systems.
</p>

<p align="center">
  <a href="https://github.com/luiskern/praxis-vue"><strong>Explore Monorepo »</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/luiskern/praxis-vue/issues">Report Bug</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/luiskern/praxis-vue/issues">Request Feature</a>
</p>

---

## ✨ Key Features

- ⚡ **55+ Production Components**: Forms, tables, overlays, layout, trees, and navigation primitives.
- 📋 **Schema-Driven Forms (`PxSchemaForm`)**: Render full dynamic forms with validation using **Zod** and **VeeValidate**.
- 📊 **Enterprise Data Table (`PxDataTable`)**: Built on TanStack Table v9 with sorting, filtering, selection, skeletons, and empty states.
- 🎨 **Adaptive Design System**: Full Light/Dark mode support using CSS variables and Tailwind CSS.
- 🧩 **First-class TypeScript Support**: Full typing with auto-completion and prop validation.
- 🚀 **Framework Ready**: Works seamlessly in **Vite**, **Nuxt 3**, and modern build tools.

---

## 📦 Installation

```bash
# npm
npm install praxis-vue-ui primevue @primevue/core vee-validate pinia

# pnpm
pnpm add praxis-vue-ui primevue @primevue/core vee-validate pinia

# yarn
yarn add praxis-vue-ui primevue @primevue/core vee-validate pinia

# bun
bun add praxis-vue-ui primevue @primevue/core vee-validate pinia
```

---

## 🚀 Quick Start

### 1. Setup in Vite / Vue 3

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'praxis-vue-ui/dist/praxis-vue.css' // Component styles
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')
```

### 2. Setup in Nuxt 3

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'praxis-vue-ui/dist/praxis-vue.css'
  ],
  build: {
    transpile: ['praxis-vue-ui']
  }
})
```

---

## 💡 Usage Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxDataTable, PxAvatar, PxBadge } from 'praxis-vue-ui'

const columns = [
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]

const users = ref([
  { id: 1, name: 'Alex Morgan', role: 'Engineering Lead', status: 'Active' },
  { id: 2, name: 'Sofia Chen', role: 'Product Designer', status: 'In Review' }
])
</script>

<template>
  <div class="p-6">
    <PxDataTable :columns="columns" :data="users">
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3">
          <PxAvatar :name="row.name" size="sm" />
          <span class="font-medium text-slate-800 dark:text-slate-100">{{ row.name }}</span>
        </div>
      </template>

      <template #cell-status="{ row }">
        <PxBadge :variant="row.status === 'Active' ? 'success' : 'warning'">
          {{ row.status }}
        </PxBadge>
      </template>
    </PxDataTable>
  </div>
</template>
```

---

## 🎨 Tailwind CSS Integration

To inherit the exact design tokens and theme variables, add our preset to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/praxis-vue-ui/dist/**/*.{js,vue}'
  ],
  presets: [
    require('praxis-vue-ui/tailwind.preset.js')
  ],
  theme: {
    extend: {}
  }
}
```

### CSS Variables Customization

Override core theme colors effortlessly:

```css
:root {
  --ui-primary: #6366f1;       /* Brand Primary */
  --ui-primary-hover: #4f46e5; /* Primary Hover */
  --ui-bg: #fafafa;            /* App Background */
}

.dark {
  --ui-primary: #818cf8;
  --ui-bg: #090d16;
}
```

---

## 🧩 Component Suite Overview

| Category | Highlights |
|---|---|
| **Forms** | `PxSchemaForm`, `PxAsyncSelect`, `PxVisualSelect`, `PxCategorizedSelect`, `PxGridSelect`, `PxDayPicker`, `PxTimePicker`, `PxPhoneInput`, `PxColorInput`, `PxDialogInput`, `PxFormRow` |
| **Data Display** | `PxDataTable`, `PxTree`, `PxDocumentViewer`, `PxAvatar`, `PxInitialsAvatar`, `PxInfoField`, `PxBadgedValueGrid`, `PxLabeledValueSection`, `PxStatusDataTable` |
| **Layout** | `PxHeader`, `PxCard`, `PxListLayout`, `PxColumnLayout`, `PxFilterBar`, `PxFormLayout` |
| **Navigation** | `PxTabs`, `PxStepper`, `PxStepperHeader`, `PxDropdownMenu`, `PxNavList` |
| **Overlays & Primitives** | `PxDialog`, `PxDrawer`, `PxToast`, `PxAccordion`, `PxBadge`, `PxCheckbox`, `PxRadioButton`, `PxTimeline`, `PxLoader`, `PxThemeSwitch` |

---

## 📄 License

MIT © [Luis Kern](https://github.com/luiskern)
