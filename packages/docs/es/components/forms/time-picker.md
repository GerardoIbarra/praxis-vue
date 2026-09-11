<script setup>
import { ref } from 'vue'
import PxTimePicker from '@praxis/px-src/components/forms/PxTimePicker.vue'

const time = ref('09:30')
const time12 = ref('14:45')
const timeDisabled = ref('14:45')
</script>

# TimePicker

A scrollable time picker with **24-hour** and **12-hour (AM/PM)** format support. Opens a popover with hour and minute columns, scrolls to the selected value automatically, and closes on outside click. The `v-model` value is always stored in `HH:mm` (24h) format regardless of the display format.

## Basic (24h)

<ComponentDemo>
  <div style="width:280px">
    <PxTimePicker v-model="time" label="Select Time" />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Value (HH:mm): <strong>{{ time }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxTimePicker } from 'praxis-vue-ui'

const time = ref('09:30')
</script>

<template>
  <PxTimePicker
    v-model="time"
    label="Select Time"
  />
</template>
```

  </template>
</ComponentDemo>

## 12-Hour Format (AM/PM)

Use `format="12h"` for the US/common format. The display shows `09:30 AM` but the `v-model` value remains in `HH:mm` (24h) internally.

<ComponentDemo title="12h Format">
  <div style="width:300px">
    <PxTimePicker v-model="time12" label="Meeting Time" format="12h" />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Value (HH:mm 24h): <strong>{{ time12 }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxTimePicker } from 'praxis-vue-ui'

const time = ref('14:45') // stored as 24h
</script>

<template>
  <!-- Displays as 02:45 PM, stores as 14:45 -->
  <PxTimePicker
    v-model="time"
    label="Meeting Time"
    format="12h"
  />
</template>
```

  </template>
</ComponentDemo>

## Disabled State

<ComponentDemo title="Disabled">
  <div style="width:280px">
    <PxTimePicker v-model="timeDisabled" label="Read-only Time" :disabled="true" />
  </div>

  <template #code>

```vue
<PxTimePicker
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
    <PxTimePicker v-model="time" placeholder="Select time" />
  </div>

  <template #code>

```vue
<PxTimePicker v-model="time" placeholder="Select time" />
```

  </template>
</ComponentDemo>

## API Reference

<ApiReference component="PxTimePicker" />

## Accessibility

- The trigger element is keyboard-accessible via `click`.
- Closes automatically on outside click via `@vueuse/core` `onClickOutside`.
- Popover uses `z-50` so it always renders above other content.
- Label is rendered via `PxLabel` with proper `for`/`id` association.
