<script setup>
import { ref } from 'vue'
import PraxisTimePicker from '@praxis/ui-src/components/forms/PraxisTimePicker.vue'

const time = ref('09:30')
const timeDisabled = ref('14:45')
</script>

# TimePicker

A scrollable time picker component with 24-hour format. Opens a popover with hour and minute columns, scrolls to the selected value automatically, and closes on outside click.

## Basic Usage

<ComponentDemo>
  <div style="width:280px">
    <PraxisTimePicker v-model="time" label="Appointment Time" />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Selected: <strong>{{ time }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PraxisTimePicker } from 'praxis-vue-ui'

const time = ref('09:30')
</script>

<template>
  <PraxisTimePicker
    v-model="time"
    label="Appointment Time"
  />
</template>
```

  </template>
</ComponentDemo>

## Disabled State

<ComponentDemo title="Disabled">
  <div style="width:280px">
    <PraxisTimePicker v-model="timeDisabled" label="Read-only Time" :disabled="true" />
  </div>

  <template #code>

```vue
<PraxisTimePicker
  v-model="time"
  label="Read-only Time"
  :disabled="true"
/>
```

  </template>
</ComponentDemo>

## Without Label

<ComponentDemo title="No Label">
  <div style="width:220px">
    <PraxisTimePicker v-model="time" placeholder="Select time" />
  </div>

  <template #code>

```vue
<PraxisTimePicker v-model="time" placeholder="Select time" />
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'modelValue', type: 'string | null', default: 'null', description: 'The selected time value in HH:mm format (24h). Use with v-model.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Text label displayed above the input field.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required. Shows a red asterisk next to the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker, preventing user interaction.' },
  { name: 'placeholder', type: 'string', default: '\'00:00\'', description: 'Placeholder shown when no value is selected.' },
]" />

## Emits

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'string | null', description: 'Emitted when the user selects a new hour or minute. Value is in HH:mm format.' },
  { name: 'change', payload: 'string | null', description: 'Also emitted on every selection change. Useful when you cannot use v-model.' },
]" />

## Accessibility

- The trigger element is keyboard-accessible via `click`.
- Closes automatically on outside click via `@vueuse/core` `onClickOutside`.
- Popover uses `z-50` so it always renders above other content.
