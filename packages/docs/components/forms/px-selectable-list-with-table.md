<script setup>
import { ref, computed } from 'vue'
import PxSelectableListWithTable from '@praxis/px-src/components/forms/PxSelectableListWithTable.vue'

const allVendors = [
  { id: 1, name: 'Alice Smith', category: 'Engineering' },
  { id: 2, name: 'Bob Jones', category: 'Design' },
  { id: 3, name: 'Carla Diaz', category: 'Operations' },
]
const selected = ref([])
const remaining = computed(() => allVendors.filter((v) => !selected.value.includes(v)))

const addVendor = (e) => {
  const id = Number(e.target.value)
  const vendor = allVendors.find((v) => v.id === id)
  if (vendor) selected.value.push(vendor)
  e.target.value = ''
}

const removeVendor = (item) => {
  selected.value = selected.value.filter((v) => v !== item)
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
]
</script>

# PxSelectableListWithTable

Renders a set of selected items in a table with a remove button per row, wired to a `vee-validate` field. It doesn't include a picker itself — you provide one via the `selector` slot (e.g. a `VueSelect`, a native `<select>`, or a button that opens a dialog) and add to your own array; the component only displays what you give it via `selectedItems` and asks to remove via the `remove` emit.

::: warning No v-model — you own the array
There is no `selectedItems` two-way binding. Add items yourself (from whatever the `selector` slot does) and remove them in your `@remove` handler — the component never mutates `selectedItems` itself.
:::

::: warning Known display bug: the count badge doesn't render
The template references a bare `<Badge>` component that isn't imported or globally registered anywhere in the library, so Vue can't resolve it — the item-count badge next to the label silently doesn't render (you'll see a "Failed to resolve component: Badge" warning in the console). The `badgeState` prop currently has no visible effect.
:::

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0; width: 100%;">
    <PxSelectableListWithTable
      label="Team Members"
      name="team-members"
      :selected-items="selected"
      :columns="columns"
      @remove="removeVendor"
    >
      <template #selector>
        <select class="input-base" style="padding: 0.5rem;" @change="addVendor">
          <option value="">Add a member...</option>
          <option v-for="v in remaining" :key="v.id" :value="v.id">{{ v.name }}</option>
        </select>
      </template>
    </PxSelectableListWithTable>
  </div>

  <template #code>

```vue
<script setup>
import { ref, computed } from 'vue'
import { PxSelectableListWithTable } from 'praxis-vue-ui'

const allVendors = [
  { id: 1, name: 'Alice Smith', category: 'Engineering' },
  { id: 2, name: 'Bob Jones', category: 'Design' },
]
const selected = ref([])
const remaining = computed(() => allVendors.filter((v) => !selected.value.includes(v)))

const addVendor = (e) => {
  const vendor = allVendors.find((v) => v.id === Number(e.target.value))
  if (vendor) selected.value.push(vendor)
}

const removeVendor = (item) => {
  selected.value = selected.value.filter((v) => v !== item)
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
]
</script>

<template>
  <PxSelectableListWithTable
    label="Team Members"
    name="team-members"
    :selected-items="selected"
    :columns="columns"
    @remove="removeVendor"
  >
    <template #selector>
      <select @change="addVendor">
        <option value="">Add a member...</option>
        <option v-for="v in remaining" :key="v.id" :value="v.id">{{ v.name }}</option>
      </select>
    </template>
  </PxSelectableListWithTable>
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'label', type: 'string', required: true, description: 'Field label, rendered via PxRequiredLabel.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows the required indicator next to the label.' },
  { name: 'name', type: 'string', required: true, description: 'Field name registered with vee-validate.' },
  { name: 'selectedItems', type: 'unknown[]', required: true, description: 'Items to render as table rows. You own this array — the component only reads it.' },
  { name: 'columns', type: '{ key: string; label: string; getValue?: (item) => string }[]', required: true, description: 'Column definitions. getValue overrides reading item[key] directly, useful for computed/fallback display values.' },
  { name: 'badgeState', type: '{ class?: string; severity?: string }', default: '{ class: \'count-badge\', severity: \'secondary\' }', description: 'Intended to style the item-count badge — currently has no visible effect (see warning above).' },
  { name: 'rules', type: 'string', default: 'undefined', description: 'vee-validate rules applied to the selectedItems field, e.g. \'required\'.' },
  { name: 'marginClass', type: 'string', default: '\'mb-8\'', description: 'Class applied to the outer wrapper for spacing.' },
]" />

## Slots

| Slot | Description |
|------|-------------|
| `selector` | Your own picker UI (select, async search, dialog trigger, etc.) for adding new items to `selectedItems`. |

## Emits

<EmitsTable :rows="[
  { name: 'remove', payload: 'item', description: 'Emitted with the row\'s item when its remove button is clicked. Filter it out of your own array in response.' },
]" />
