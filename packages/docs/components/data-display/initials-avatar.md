<script setup>
import { ref } from 'vue'
import InitialsAvatar from '@praxis/ui-src/components/data-display/InitialsAvatar.vue'
</script>

# InitialsAvatar

Renders a circular avatar with the user's initials derived from their first and last name. Supports custom size and background color.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <InitialsAvatar first-name="Alice" last-name="Johnson" />
    <InitialsAvatar first-name="Bob" last-name="Smith" />
    <InitialsAvatar first-name="Carol" last-name="Williams" />
    <InitialsAvatar first-name="David" last-name="Brown" />
  </div>

  <template #code>

```vue
<InitialsAvatar
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
