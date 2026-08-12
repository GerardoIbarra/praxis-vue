<script setup>
import { ref } from 'vue'
import PxLabel from '@praxis/px-src/components/base/PxLabel.vue'

const inputId = 'demo-name'
const inputIdReq = 'demo-email'
</script>

# Label

A semantic HTML label component that associates text with a form control. Supports an optional required indicator (asterisk) and the `for` attribute for accessibility.

## Basic

<ComponentDemo>
  <div style="width:300px;display:flex;flex-direction:column;gap:1.25rem">
    <div>
      <PxLabel label="Full Name" :for="inputId" />
      <input :id="inputId" class="input-base" placeholder="John Doe" style="margin-top:0.25rem" />
    </div>
    <div>
      <PxLabel label="Email Address" :for="inputIdReq" :required="true" />
      <input :id="inputIdReq" class="input-base" placeholder="john@example.com" style="margin-top:0.25rem" />
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { PxLabel } from 'px-vue-ui'
</script>

<template>
  <!-- Basic label -->
  <PxLabel label="Full Name" for="name-input" />
  <input id="name-input" />

  <!-- Required indicator -->
  <PxLabel label="Email Address" for="email-input" :required="true" />
  <input id="email-input" />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'label', type: 'string', required: true, description: 'The text content displayed inside the label element.' },
  { name: 'for', type: 'string', default: 'undefined', description: 'The id of the associated form control (sets the HTML for attribute).' },
  { name: 'required', type: 'boolean', default: 'false', description: 'When true, shows a red asterisk (*) after the label text as a required-field indicator.' },
]" />

## Accessibility

- Uses a native `<label>` element with a proper `for`/`id` association.
- The asterisk (`*`) has `aria-hidden="true"` so screen readers don't read it as literal punctuation. Required state should still be communicated via `aria-required` on the input.
- Clicking the label focuses the associated input automatically (native browser behavior).

## Migration from PxRequiredLabel

`PxRequiredLabel` is now deprecated. Replace it with `PxLabel`:

```diff
- import { PxRequiredLabel } from 'px-vue-ui'
+ import { PxLabel } from 'px-vue-ui'

- <PxRequiredLabel label="Name" :required="true" />
+ <PxLabel label="Name" for="name-input" :required="true" />
```
