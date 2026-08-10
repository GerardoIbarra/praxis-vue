# FormViewWrapper

A layout wrapper for form/detail pages. Wraps a form with consistent padding and responsive layout constraints.

## Usage

```vue
<template>
  <FormViewWrapper>
    <FormHeader title="Patient" :is-edit-mode="isEdit" />

    <form @submit.prevent="save">
      <!-- form fields -->
    </form>

    <StepNavigation
      :can-proceed="isValid"
      @next="save"
    />
  </FormViewWrapper>
</template>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form content — header, fields, and navigation. |
