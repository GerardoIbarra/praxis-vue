# praxis-vue

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
</p>

<p align="center">
  An enterprise-grade monorepo containing production-ready Vue 3 components, schema-driven forms, rich data tables, and an advanced WYSIWYG editor.
</p>

---

## 📦 Packages in this Monorepo

| Package | Description | Version & Install |
|---|---|---|
| [**`praxis-vue-ui`**](./packages/ui) | 55+ UI components built with PrimeVue headless + Tailwind CSS | [![npm](https://img.shields.io/npm/v/praxis-vue-ui.svg?style=flat-square&label=npm)](https://www.npmjs.com/package/praxis-vue-ui) `npm i praxis-vue-ui` |
| [**`praxis-vue-editor`**](./packages/editor) | Modern rich-text editor component powered by Wordgard | [![npm](https://img.shields.io/npm/v/praxis-vue-editor.svg?style=flat-square&label=npm)](https://www.npmjs.com/package/praxis-vue-editor) `npm i praxis-vue-editor` |
| [**`@praxis/docs`**](./packages/docs) | VitePress interactive documentation site & PWA | Internal Docs Workspace |
| [**`playground`**](./playground) | Development sandbox application | `pnpm dev` |

---

## ⚡ Quick Start (`praxis-vue-ui`)

### 1. Installation

```bash
# npm
npm install praxis-vue-ui primevue @primevue/core vee-validate pinia

# pnpm
pnpm add praxis-vue-ui primevue @primevue/core vee-validate pinia

# yarn
yarn add praxis-vue-ui primevue @primevue/core vee-validate pinia
```

### 2. Configure Plugin & CSS

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'praxis-vue-ui/dist/praxis-vue.css' // Core UI styles
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark'
    }
  }
})

app.mount('#app')
```

### 3. Usage Example

```vue
<script setup lang="ts">
import { PxDataTable, PxAvatar, PxBadge } from 'praxis-vue-ui'

const columns = [
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]

const users = [
  { id: 1, name: 'Alex Morgan', role: 'Lead Architect', status: 'Active' },
  { id: 2, name: 'Sofia Chen', role: 'UI Engineer', status: 'In Review' }
]
</script>

<template>
  <PxDataTable :columns="columns" :data="users">
    <template #cell-name="{ row }">
      <div class="flex items-center gap-3">
        <PxAvatar :name="row.name" size="sm" />
        <span class="font-medium">{{ row.name }}</span>
      </div>
    </template>

    <template #cell-status="{ row }">
      <PxBadge :variant="row.status === 'Active' ? 'success' : 'warning'">
        {{ row.status }}
      </PxBadge>
    </template>
  </PxDataTable>
</template>
```

---

## 🌐 Nuxt 3 Setup

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

## 🎨 Tailwind CSS Integration

Add our preset to your `tailwind.config.js`:

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

---

## 📂 Component Categories

### `praxis-vue-ui`

| Category | Components |
|---|---|
| **Base** | `PxAvatar`, `PxAvatarSelect`, `PxColorInput`, `PxVisualSelect`, `PxCategorizedSelect`, `PxPhoneInput`, `PxLabel`, `PxRequiredLabel`, `PxThemeSwitch`, `PxLoader` |
| **Forms** | `PxSchemaForm`, `PxStateChecklist`, `PxAsyncSelect`, `PxGridSelect`, `PxSelectableListWithTable`, `PxDayPicker`, `PxDialogInput`, `PxFormRow`, `PxFormMultiSelectList`, `PxTimePicker` |
| **Data Display** | `PxDataTable`, `PxTree`, `PxDocumentViewer`, `PxInitialsAvatar`, `PxInfoField`, `PxDisplayOptions`, `PxBadgedValueGrid`, `PxLabeledValueSection`, `PxStatusDataTable` |
| **Layout** | `PxColumnLayout`, `PxCard`, `PxHeader`, `PxListLayout`, `PxFilterBar`, `PxFormLayout` |
| **Navigation** | `PxTabs`, `PxStepper`, `PxStepperHeader`, `PxDropdownMenu`, `PxNavList` |
| **Primitives** | `PxAccordion`, `PxBadge`, `PxCheckbox`, `PxDialog`, `PxDrawer`, `PxRadioButton`, `PxTimeline`, `PxToast` |

---

## 🛠️ Monorepo Development Commands

```bash
# Install dependencies
pnpm install

# Start playground locally
pnpm dev

# Start documentation server (VitePress)
pnpm docs:dev

# Build all packages
pnpm build

# Run unit tests
pnpm test
```

---

## 📄 License

MIT © [Luis Kern](https://github.com/luiskern)
