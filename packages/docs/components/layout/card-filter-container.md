# CardFilterContainer

A transparent pass-through container for filter sections on card-based list views. Provides a consistent wrapper for filter controls placed above cards.

## Usage

```vue
<template>
  <CardFilterContainer>
    <input type="search" placeholder="Search..." />
    <select>
      <option>All statuses</option>
      <option>Active</option>
    </select>
  </CardFilterContainer>
</template>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Filter controls to render inside the container. |
