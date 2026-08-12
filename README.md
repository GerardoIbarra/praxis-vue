# praxis-vue-ui

> A generic, production-ready Vue 3 component library — forms, data-display, layout, navigation, overlays and more.

[![npm version](https://img.shields.io/npm/v/praxis-vue-ui.svg)](https://www.npmjs.com/package/praxis-vue-ui)
[![license](https://img.shields.io/npm/l/praxis-vue-ui.svg)](LICENSE)

---

## Packages

| Package | Description | npm |
|---|---|---|
| [`praxis-vue-ui`](./packages/ui) | 55+ UI components for Vue 3 + PrimeVue | `npm i praxis-vue-ui` |
| [`praxis-vue-editor`](./packages/editor) | Rich-text editor powered by Wordgard | `npm i praxis-vue-editor` |

---

## Installation

### praxis-vue-ui

```bash
npm install praxis-vue-ui primevue @primevue/core vee-validate pinia
```

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'praxis-vue-ui/dist/praxis-vue.css' // Import styles
import App from './App.vue'

createApp(App)
  .use(PrimeVue, { theme: { preset: Aura } })
  .mount('#app')
```

```vue
<script setup>
import { BaseAvatar, PraxisDynamicForm, PraxisTabComponent } from 'praxis-vue-ui'
</script>
```

#### Nuxt 3 Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'praxis-vue-ui/dist/praxis-vue.css' // Import styles globally
  ],
  build: {
    transpile: ['praxis-vue-ui']
  }
})
```

You can then use the components in any page or component:

```vue
<script setup>
import { UiTimePicker } from 'praxis-vue-ui'
</script>

<template>
  <UiTimePicker v-model="time" label="Time" />
</template>
```

### praxis-vue-editor

```bash
npm install praxis-vue-editor wordgard
```

```vue
<script setup>
import { PraxisEditor } from 'praxis-vue-editor'
import { ref } from 'vue'

const content = ref('<p>Hello world</p>')
</script>

<template>
  <PraxisEditor
    v-model="content"
    placeholder="Start writing..."
    :read-only="false"
  />
</template>
```

---

## Component Categories

### `praxis-vue-ui`

| Category | Components |
|---|---|
| **Base** | `BaseAvatar`, `UiAvatar`, `PraxisAvatarSelect`, `PraxisColorPickerField`, `PraxisVisualSelect`, `PraxisGroupedMultiSelect`, `PraxisPhoneNumber`, `UiLabel`, `PraxisRequiredLabel`, `PraxisThemeToggle`, `PraxisLoader` |
| **Forms** | `PraxisDynamicForm`, `PraxisCheckList`, `PraxisInfiniteScrollSelect`, `PraxisTableSelect`, `PraxisSelectableListWithTable`, `PraxisWeekDaysSelector`, `PraxisModalInput`, `PraxisFormFieldRow`, `PraxisFormMultiSelectList`, `UiTimePicker` |
| **Data Display** | `BaseDataTable`, `BaseTree`, `PraxisPdfViewer`, `PraxisInitialsAvatar`, `PraxisProfileInfoField`, `PraxisDisplayOptions`, `PraxisBadgedValueGrid`, `PraxisLabeledValueSection`, `PraxisExistingDataTable` |
| **Layout** | `PraxisColumnLayout`, `PraxisDashboardCard`, `PraxisHeader`, `PraxisListViewWrapper`, `PraxisCardFilterContainer`, `PraxisFormViewWrapper` |
| **Navigation** | `PraxisTabComponent`, `PraxisStepNavigation`, `PraxisStepHeader`, `PraxisActionMenu`, `PraxisNavList` |
| **Primitives** | `UiAccordion`, `UiBadge`, `UiCheckbox`, `UiDialog`, `UiDrawer`, `UiRadioButton`, `UiTimeline` |

### Composables

```ts
import {
  useFieldValidation,
  useFieldAutofill,
  useInfiniteScrollSelect,
  useDisabledDays,
} from 'praxis-vue-ui'
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
