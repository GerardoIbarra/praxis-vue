# px-vue-ui

> A generic, production-ready Vue 3 component library — forms, data-display, layout, navigation, overlays and more.

[![npm version](https://img.shields.io/npm/v/px-vue-ui.svg)](https://www.npmjs.com/package/px-vue-ui)
[![license](https://img.shields.io/npm/l/px-vue-ui.svg)](LICENSE)

---

## Packages

| Package | Description | npm |
|---|---|---|
| [`px-vue-ui`](./packages/ui) | 55+ UI components for Vue 3 + PrimeVue | `npm i px-vue-ui` |
| [`px-vue-editor`](./packages/editor) | Rich-text editor powered by Wordgard | `npm i px-vue-editor` |

---

## Installation

### px-vue-ui

```bash
npm install px-vue-ui primevue @primevue/core vee-validate pinia
```

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'px-vue-ui/dist/px-vue.css' // Import styles
import App from './App.vue'

createApp(App)
  .use(PrimeVue, { theme: { preset: Aura } })
  .mount('#app')
```

```vue
<script setup>
import { PxAvatar, PxSchemaForm, PxTabComponent } from 'px-vue-ui'
</script>
```

#### Nuxt 3 Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'px-vue-ui/dist/px-vue.css' // Import styles globally
  ],
  build: {
    transpile: ['px-vue-ui']
  }
})
```

You can then use the components in any page or component:

```vue
<script setup>
import { PxTimePicker } from 'px-vue-ui'
</script>

<template>
  <PxTimePicker v-model="time" label="Time" />
</template>
```

### px-vue-editor

```bash
npm install px-vue-editor wordgard
```

```vue
<script setup>
import { PxEditor } from 'px-vue-editor'
import { ref } from 'vue'

const content = ref('<p>Hello world</p>')
</script>

<template>
  <PxEditor
    v-model="content"
    placeholder="Start writing..."
    :read-only="false"
  />
</template>
```

---

## Component Categories

### `px-vue-ui`

| Category | Components |
|---|---|
| **Base** | `PxAvatar`, `PxAvatar`, `PxAvatarSelect`, `PxColorPickerField`, `PxVisualSelect`, `PxCategorizedSelect`, `PxPhoneNumber`, `PxLabel`, `PxRequiredLabel`, `PxThemeToggle`, `PxLoader` |
| **Forms** | `PxSchemaForm`, `PxStateChecklist`, `PxAsyncSelect`, `PxGridSelect`, `PxSelectableListWithTable`, `PxDayPicker`, `PxDialogInput`, `PxFormRow`, `PxFormMultiSelectList`, `PxTimePicker` |
| **Data Display** | `PxDataTable`, `PxTree`, `PxPdfViewer`, `PxInitialsAvatar`, `PxInfoField`, `PxDisplayOptions`, `PxBadgedValueGrid`, `PxLabeledValueSection`, `PxStatusDataTable` |
| **Layout** | `PxColumnLayout`, `PxDashboardCard`, `PxHeader`, `PxListViewWrapper`, `PxCardFilterContainer`, `PxFormViewWrapper` |
| **Navigation** | `PxTabComponent`, `PxStepNavigation`, `PxStepHeader`, `PxActionMenu`, `PxNavList` |
| **Primitives** | `PxAccordion`, `PxBadge`, `PxCheckbox`, `PxDialog`, `PxDrawer`, `PxRadioButton`, `PxTimeline` |

### Composables

```ts
import {
  useFieldValidation,
  useFieldAutofill,
  useAsyncSelect,
  useDisabledDays,
} from 'px-vue-ui'
```

---

## Development

```bash
# Install dependencies
pnpm install

# Start playground
pnpm dev

# Build all packages
pnpm build

# Open Storybook
pnpm storybook
```

---

## License

MIT © Luis Kern
