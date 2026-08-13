<script setup>
import { ref } from 'vue'
import PxDayPicker from '@praxis/px-src/components/forms/PxDayPicker.vue'

const selectedDay = ref('monday')
const selectedDays = ref({
  sunday: false, monday: true, tuesday: false,
  wednesday: true, thursday: false, friday: true, saturday: false
})
</script>

# PxDayPicker

A day-of-week selector that supports both radio (single selection) and checkbox (multi-selection) modes. Renders Mon–Sun labels with accessible inputs.

## Radio Mode (Single Day)

<ComponentDemo>
  <div style="width:100%;max-width:500px">
    <PxDayPicker v-model="selectedDay" mode="radio" label="Recurrence Day" />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Selected: <strong>{{ selectedDay }}</strong>
    </p>
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxDayPicker } from 'px-vue-ui'

const day = ref('monday')
</script>

<template>
  <PxDayPicker v-model="day" mode="radio" label="Recurrence Day" />
  <p>Selected: {{ day }}</p>
</template>
```

  </template>
</ComponentDemo>

## Checkbox Mode (Multiple Days)

<ComponentDemo title="Checkbox Mode">
  <div style="width:100%;max-width:500px">
    <PxDayPicker v-model="selectedDays" mode="checkbox" label="Working Days" />
    <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--vp-c-text-2)">
      Selected: <strong>{{ Object.entries(selectedDays).filter(([,v]) => v).map(([k]) => k).join(', ') }}</strong>
    </p>
  </div>

  <template #code>

```vue
<PxDayPicker
  v-model="days"
  mode="checkbox"
  label="Working Days"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'modelValue', type: 'DaysChoosen | string', required: true, description: 'In radio mode: the selected day string (e.g. \'monday\'). In checkbox mode: a DaysChoosen object with boolean values per day.' },
  { name: 'mode', type: '\'radio\' | \'checkbox\'', default: '\'radio\'', description: 'Selection mode. Radio allows one day, checkbox allows multiple.' },
  { name: 'label', type: 'string', default: '\'Days of the week\'', description: 'Label text displayed above the selector.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all day inputs.' },
  { name: 'showRequired', type: 'boolean', default: 'false', description: 'Shows the required asterisk on the label.' },
]" />

## DaysChoosen Interface

```ts
interface DaysChoosen {
  sunday: boolean
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
}
```

## Emits

<div class="px-section-header">
  <span class="px-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'DaysChoosen | string', description: 'Emitted on day change. In radio mode: string (day name). In checkbox mode: updated DaysChoosen object.' },
]" />
