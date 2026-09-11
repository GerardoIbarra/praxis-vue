<script setup>
import { ref } from 'vue'
import PxHeader from '@praxis/px-src/components/layout/PxHeader.vue'
import { Plus, Download } from '@lucide/vue'
</script>

# PxHeader

A unified header component for pages, forms, and lists.

## Usage

```vue
<script setup lang="ts">
import { PxHeader } from 'praxis-vue-ui'
import { Plus, Download } from '@lucide/vue'
</script>
```

## Page Variant (Default)

Used for main page headers.

<ComponentDemo title="Page Header">
  <div style="width:100%">
    <PxHeader title="Projects" subtitle="237 active projects">
      <template #actions>
        <button class="px-4 py-2 bg-white dark:bg-surface-800 border rounded-lg text-sm font-medium">Export</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus class="w-4 h-4" />
          New Project
        </button>
      </template>
    </PxHeader>
  </div>

  <template #code>

```vue
<PxHeader title="Projects" subtitle="237 active projects">
  <template #actions>
    <button>Export</button>
    <button>New Project</button>
  </template>
</PxHeader>
```

  </template>
</ComponentDemo>

## Form Variant

Used for separating sections inside a form. It automatically prefixes the title with "Create" or "Edit" based on `isEditMode` unless `disablePrefix` is true.

<ComponentDemo title="Form Header">
  <div style="width:100%">
    <PxHeader variant="form" title="Project" :is-edit-mode="true">
      <template #actions>
        <button class="px-4 py-2 border rounded-lg text-sm font-medium">Cancel</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Save</button>
      </template>
    </PxHeader>
  </div>

  <template #code>

```vue
<PxHeader variant="form" title="Project" :is-edit-mode="true">
  <template #actions>
    <button>Cancel</button>
    <button>Save</button>
  </template>
</PxHeader>
```

  </template>
</ComponentDemo>

## List Variant

A minimal header used above lists or data tables.

<ComponentDemo title="List Header">
  <div style="width:100%">
    <PxHeader variant="list" title="Recent Activity">
      <template #actions>
        <button class="text-blue-600 text-sm font-medium">View All</button>
      </template>
    </PxHeader>
  </div>

  <template #code>

```vue
<PxHeader variant="list" title="Recent Activity">
  <template #actions>
    <button>View All</button>
  </template>
</PxHeader>
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxHeader" />
