<script setup>
import { ref } from 'vue'
import PxInitialsAvatar from '@praxis/px-src/components/data-display/PxInitialsAvatar.vue'
</script>

# PxInitialsAvatar

Renders a circular avatar with the user's initials derived from their first and last name. Supports custom size and background color.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <PxInitialsAvatar first-name="Alice" last-name="Johnson" />
    <PxInitialsAvatar first-name="Bob" last-name="Smith" />
    <PxInitialsAvatar first-name="Carol" last-name="Williams" />
    <PxInitialsAvatar first-name="David" last-name="Brown" />
  </div>

  <template #code>

```vue
<PxInitialsAvatar
  first-name="Alice"
  last-name="Johnson"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'firstName', type: 'string', required: true, description: 'First name of the user. First character used as initials.' },
  { name: 'lastName', type: 'string', required: true, description: 'Last name of the user. First character used as initials.' },
]" />
