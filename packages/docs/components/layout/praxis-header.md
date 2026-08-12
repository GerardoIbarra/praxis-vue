<script setup>
import { ref } from 'vue'
import PraxisHeader from '@praxis/ui-src/components/layout/PraxisHeader.vue'
import { Plus, Download } from 'lucide-vue-next'
</script>

# PraxisHeader

A unified header component for pages, forms, and lists.

## Usage

```vue
<script setup lang="ts">
import { PraxisHeader } from 'praxis-vue-ui'
import { Plus, Download } from 'lucide-vue-next'
</script>
```

## Page Variant (Default)

Used for main page headers.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PraxisHeader title="Projects" subtitle="237 active projects">
    <template #actions>
      <button class="px-4 py-2 bg-white dark:bg-surface-800 border rounded-lg text-sm font-medium">Export</button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
        <Plus class="w-4 h-4" />
        New Project
      </button>
    </template>
  </PraxisHeader>
</div>

```vue
<PraxisHeader title="Projects" subtitle="237 active projects">
  <template #actions>
    <button>Export</button>
    <button>New Project</button>
  </template>
</PraxisHeader>
```

## Form Variant

Used for separating sections inside a form. It automatically prefixes the title with "Create" or "Edit" based on `isEditMode` unless `disablePrefix` is true.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PraxisHeader variant="form" title="Project" :is-edit-mode="true">
    <template #actions>
      <button class="px-4 py-2 border rounded-lg text-sm font-medium">Cancel</button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Save</button>
    </template>
  </PraxisHeader>
</div>

```vue
<PraxisHeader variant="form" title="Project" :is-edit-mode="true">
  <template #actions>
    <button>Cancel</button>
    <button>Save</button>
  </template>
</PraxisHeader>
```

## List Variant

A minimal header used above lists or data tables.

<div class="p-6 border rounded-xl mt-4 bg-gray-50 dark:bg-surface-900">
  <PraxisHeader variant="list" title="Recent Activity">
    <template #actions>
      <button class="text-blue-600 text-sm font-medium">View All</button>
    </template>
  </PraxisHeader>
</div>

```vue
<PraxisHeader variant="list" title="Recent Activity">
  <template #actions>
    <button>View All</button>
  </template>
</PraxisHeader>
```

## API

### Props

| Name | Type | Default | Description |
|---|---|---|---|
| `variant` | `'page' \| 'form' \| 'list'` | `'page'` | Defines the visual hierarchy and layout. |
| `title` | `string` | | Main title text. |
| `subtitle` | `string` | | Subtitle text (mostly used in 'page' variant). |
| `containerClass` | `string` | | Custom class for the outermost container. |
| `isEditMode` | `boolean` | `false` | If true, prefixes the title with "Edit " instead of "Create " (only for 'form'). |
| `disablePrefix` | `boolean` | `false` | If true, disables the automatic "Create/Edit" prefix in 'form' variant. |

### Slots

| Name | Description |
|---|---|
| `title` | Custom rendering for the title. |
| `subtitle` | Custom rendering for the subtitle. |
| `actions` | Container for action buttons on the right side. |
