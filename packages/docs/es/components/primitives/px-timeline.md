<script setup>
import PxTimeline from '@praxis/px-src/components/_primitives/PxTimeline.vue'
import { UserPlus, Calendar, CheckCircle } from '@lucide/vue'

const events = [
  {
    date: '2024-01-15',
    title: 'Account Created',
    description: 'Initial registration completed.',
    icon: UserPlus,
  },
  {
    date: '2024-02-01',
    title: 'Onboarding Call',
    description: 'Initial setup and walkthrough.',
    icon: Calendar,
  },
  {
    date: '2024-03-10',
    title: 'Profile Completed',
    description: 'All required information provided.',
    icon: CheckCircle,
  },
]
</script>

# PxTimeline

A vertical timeline connector. It's fully slot-driven — the component itself only lays out the connector line and a marker/content column per item; it doesn't render any date, title, description, or icon automatically. You supply that via the `marker` and `content` scoped slots.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0;">
    <PxTimeline :value="events">
      <template #marker="{ item }">
        <div style="width:1.75rem;height:1.75rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;background:var(--vp-c-brand-1);color:white;">
          <component :is="item.icon" style="width:0.9rem;height:0.9rem;" />
        </div>
      </template>
      <template #content="{ item }">
        <div style="padding-bottom:0.5rem;">
          <div style="font-size:0.75rem;color:var(--vp-c-text-2);">{{ item.date }}</div>
          <div style="font-weight:600;">{{ item.title }}</div>
          <div style="font-size:0.875rem;color:var(--vp-c-text-2);">{{ item.description }}</div>
        </div>
      </template>
    </PxTimeline>
  </div>

  <template #code>

```vue
<script setup>
import { PxTimeline } from 'praxis-vue-ui'
import { UserPlus, Calendar, CheckCircle } from '@lucide/vue'

const events = [
  { date: '2024-01-15', title: 'Account Created', description: 'Initial registration completed.', icon: UserPlus },
  { date: '2024-02-01', title: 'Onboarding Call', description: 'Initial setup and walkthrough.', icon: Calendar },
  { date: '2024-03-10', title: 'Profile Completed', description: 'All required information provided.', icon: CheckCircle },
]
</script>

<template>
  <PxTimeline :value="events">
    <template #marker="{ item }">
      <div class="marker-dot">
        <component :is="item.icon" />
      </div>
    </template>
    <template #content="{ item }">
      <div class="text-xs text-gray-500">{{ item.date }}</div>
      <div class="font-semibold">{{ item.title }}</div>
      <div class="text-sm text-gray-500">{{ item.description }}</div>
    </template>
  </PxTimeline>
</template>
```

  </template>
</ComponentDemo>

Without a `marker` slot, each item falls back to a small colored dot; without a `content` slot, nothing renders for that item at all.

## Props

<PropsTable :rows="[
  { name: 'value', type: 'T[]', required: true, description: 'Array of items to render — shape is entirely up to you, since nothing is read from it directly by the component.' },
]" />

## Slots

<SlotsTable :rows="[
  { name: 'marker', props: '{ item, index }', description: 'Custom marker/dot rendering for each item. Falls back to a plain colored dot if omitted.' },
  { name: 'content', props: '{ item, index }', description: 'Main content for each item. Nothing renders here if omitted.' },
]" />
