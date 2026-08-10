# ListViewWrapper

A layout wrapper for list pages. Provides a consistent structure with header, filters, and table slots.

## Usage

```vue
<template>
  <ListViewWrapper>
    <template #header>
      <ListHeader title="Patients">
        <template #actions>
          <button>Add</button>
        </template>
      </ListHeader>
    </template>

    <template #default>
      <BaseDataTable :items="items" :columns="columns" />
    </template>
  </ListViewWrapper>
</template>
```

## Slots

| Slot | Description |
|------|-------------|
| `header` | Page header area. Typically a `ListHeader`. |
| `default` | Main content area. Typically a `BaseDataTable`. |
