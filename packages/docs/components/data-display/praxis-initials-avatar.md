<script setup>
import { ref } from 'vue'
import PraxisInitialsAvatar from '@praxis/ui-src/components/data-display/PraxisInitialsAvatar.vue'
</script>

# PraxisInitialsAvatar

Renders a circular avatar with the user's initials derived from their first and last name. Supports custom size and background color.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <PraxisInitialsAvatar first-name="Alice" last-name="Johnson" />
    <PraxisInitialsAvatar first-name="Bob" last-name="Smith" />
    <PraxisInitialsAvatar first-name="Carol" last-name="Williams" />
    <PraxisInitialsAvatar first-name="David" last-name="Brown" />
  </div>

  <template #code>

```vue
<PraxisInitialsAvatar
  first-name="Alice"
  last-name="Johnson"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'firstName', type: 'string', required: true, description: 'First name of the user. First character used as initials.' },
  { name: 'lastName', type: 'string', required: true, description: 'Last name of the user. First character used as initials.' },
]" />
