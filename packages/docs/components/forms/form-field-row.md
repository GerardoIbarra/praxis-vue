# FormFieldRow

A layout row for form fields. Wraps one or more inputs in a flex row with consistent gap and label alignment. Useful for side-by-side fields.

## Usage

```vue
<template>
  <FormFieldRow>
    <PraxisTimePicker v-model="startTime" label="Start Time" />
    <PraxisTimePicker v-model="endTime" label="End Time" />
  </FormFieldRow>
</template>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form field components to render side by side. |
