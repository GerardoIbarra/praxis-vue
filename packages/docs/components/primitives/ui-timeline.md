<script setup>
import UiTimeline from '@praxis/ui-src/components/_primitives/UiTimeline.vue'
import { UserPlus, Calendar, FlaskConical } from '@lucide/vue'

const events = [
  {
    date: '2024-01-15',
    title: 'Patient Registered',
    description: 'Initial registration completed.',
    icon: UserPlus,
  },
  {
    date: '2024-02-01',
    title: 'First Appointment',
    description: 'Consultation with Dr. Smith.',
    icon: Calendar,
  },
  {
    date: '2024-03-10',
    title: 'Lab Results',
    description: 'Blood work results reviewed.',
    icon: FlaskConical,
  },
]
</script>

# UiTimeline

A vertical timeline component for displaying chronological events. Each item renders with a date/time marker, icon, and content area.

## Usage

<ComponentDemo>
  <div style="padding: 1rem 0;">
    <UiTimeline :value="events" />
  </div>

  <template #code>

```vue
<script setup>
import { UiTimeline } from 'praxis-vue-ui'
import { UserPlus, Calendar, FlaskConical } from '@lucide/vue'

const events = [
  {
    date: '2024-01-15',
    title: 'Patient Registered',
    description: 'Initial registration completed.',
    icon: UserPlus,
  },
  {
    date: '2024-02-01',
    title: 'First Appointment',
    description: 'Consultation with Dr. Smith.',
    icon: Calendar,
  },
  {
    date: '2024-03-10',
    title: 'Lab Results',
    description: 'Blood work results reviewed.',
    icon: FlaskConical,
  },
]
</script>

<template>
  <UiTimeline :value="events" />
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
