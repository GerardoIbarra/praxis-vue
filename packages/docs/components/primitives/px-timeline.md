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

A vertical timeline component for displaying chronological events. Each item renders with a date/time marker, icon, and content area.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0;">
    <PxTimeline :value="events" />
  </div>

  <template #code>

```vue
<script setup>
import { PxTimeline } from 'px-vue-ui'
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

<template>
  <PxTimeline :value="events" />
</template>
```

  </template>
</ComponentDemo>

## Props

<PropsTable :rows="[
  { name: 'value', type: 'TimelineEvent[]', required: true, description: 'Array of timeline events to render.' },
  { name: 'align', type: '\'left\' | \'right\' | \'alternate\'', default: '\'left\'', description: 'Alignment of timeline content relative to the connector line.' },
  { name: 'layout', type: '\'vertical\' | \'horizontal\'', default: '\'vertical\'', description: 'Orientation of the timeline.' },
]" />

## TimelineEvent Interface

```ts
interface TimelineEvent {
  date?: string       // Display date
  title: string       // Event title
  description?: string
  icon?: string       // Lucide icon name
  color?: string      // Dot/icon color
}
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `content` | `{ item }` | Custom content for each event. |
| `opposite` | `{ item }` | Content on the opposite side of the connector (for alternate layout). |
| `marker` | `{ item }` | Custom marker/dot rendering. |
