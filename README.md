# @praxis/vue

> A generic, production-ready Vue 3 component library — forms, data-display, layout, navigation, overlays and more.

[![npm version](https://img.shields.io/npm/v/@praxis/vue.svg)](https://www.npmjs.com/package/@praxis/vue)
[![license](https://img.shields.io/npm/l/@praxis/vue.svg)](LICENSE)

---

## Packages

| Package | Description | npm |
|---|---|---|
| [`@praxis/vue`](./packages/ui) | 55+ UI components for Vue 3 + PrimeVue | `npm i @praxis/vue` |
| [`@praxis/editor`](./packages/editor) | Rich-text editor powered by Wordgard | `npm i @praxis/editor` |

---

## Installation

### @praxis/vue

```bash
npm install @praxis/vue primevue @primevue/core vee-validate pinia
```

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

createApp(App)
  .use(PrimeVue, { theme: { preset: Aura } })
  .mount('#app')
```

```vue
<script setup>
import { BaseAvatar, DynamicForm, TabComponent } from '@praxis/vue'
</script>
```

### @praxis/editor

```bash
npm install @praxis/editor wordgard
```

```vue
<script setup>
import { WordgardEditor } from '@praxis/editor'
import { ref } from 'vue'

const content = ref('<p>Hello world</p>')
</script>

<template>
  <WordgardEditor
    v-model="content"
    placeholder="Start writing..."
    :read-only="false"
  />
</template>
```

---

## Component Categories

### `@praxis/vue`

| Category | Components |
|---|---|
| **Base** | `BaseAvatar`, `AvatarSelect`, `ColorPickerField`, `ColorSelect`, `GroupedMultiSelect`, `GroupSelect`, `PhoneNumber`, `RequiredLabel`, `ThemeToggle`, `FullPageLoader`, `LazyLoadingSpinner` |
| **Forms** | `DynamicForm`, `CheckListField`, `CheckListInputField`, `InfiniteScrollSelect`, `SelectListField`, `SelectableList`, `WeekDaysSelector`, `ModalInput`, `FormFieldRow` |
| **Data Display** | `BaseDataTable`, `BaseTree`, `PdfViewer`, `SignatureDocument`, `InitialsAvatar`, `ProfileInfoField`, `AuditLogButton`, `DisplayOptions`, `TreeList` |
| **Layout** | `ColumnLayout`, `DashboardCard`, `FormHeader`, `PageHeader`, `ListViewWrapper`, `FormDividerWithComponents` |
| **Navigation** | `TabComponent`, `StepNavigation`, `StepHeader`, `ActionMenu` |
| **Overlays** | `AuditLogSidebar`, `AuditLogContent`, `FeedbackModal`, `TimeSlotModal`, `NodeTreeModal`, `StaffFormDialog` |

### Composables

```ts
import {
  useFieldValidation,
  useNotifications,
  useInfiniteScrollSelect,
  useConfirmationModal,
  useDeleteConfirmation,
  useDateRangeValidation,
  useZipCode,
  useSelectOptions,
} from '@praxis/vue'
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
