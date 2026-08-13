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
import { PxAvatar, PxSchemaForm, PxTabs } from 'px-vue-ui'
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

## Theming & Tailwind

`praxis-vue` is styled using Tailwind CSS and CSS variables, giving you complete control over the color scheme.

### 1. Add the Tailwind Preset

To ensure all library components inherit the correct `primary` and `surface` color palettes, add our preset to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your paths
    './node_modules/px-vue-ui/src/**/*.{vue,js,ts}'
  ],
  presets: [
    require('px-vue-ui/tailwind.preset.js')
  ],
  theme: {
    extend: {},
  }
}
```

### 2. Customize Colors (CSS Variables)

Our Tailwind preset maps colors directly to CSS variables. You can easily override the default blue theme by redefining these variables in your global CSS file:

```css
:root {
  /* Change the primary color to Purple */
  --ui-primary: #9333ea;
  --ui-primary-hover: #7e22ce;
  
  /* Change the background of the app */
  --ui-bg: #fafafa;
}

.dark {
  /* Dark mode overrides */
  --ui-primary: #a855f7;
  --ui-bg: #121212;
}
```

---

## Component Categories

### `px-vue-ui`

| Category | Components |
|---|---|
| **Base** | `PxAvatar`, `PxAvatar`, `PxAvatarSelect`, `PxColorInput`, `PxVisualSelect`, `PxCategorizedSelect`, `PxPhoneInput`, `PxLabel`, `PxRequiredLabel`, `PxThemeSwitch`, `PxLoader` |
| **Forms** | `PxSchemaForm`, `PxStateChecklist`, `PxAsyncSelect`, `PxGridSelect`, `PxSelectableListWithTable`, `PxDayPicker`, `PxDialogInput`, `PxFormRow`, `PxFormMultiSelectList`, `PxTimePicker` |
| **Data Display** | `PxDataTable`, `PxTree`, `PxDocumentViewer`, `PxInitialsAvatar`, `PxInfoField`, `PxDisplayOptions`, `PxBadgedValueGrid`, `PxLabeledValueSection`, `PxStatusDataTable` |
| **Layout** | `PxColumnLayout`, `PxCard`, `PxHeader`, `PxListLayout`, `PxFilterBar`, `PxFormLayout` |
| **Navigation** | `PxTabs`, `PxStepper`, `PxStepperHeader`, `PxDropdownMenu`, `PxNavList` |
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
