<script setup>
import { ref } from 'vue'
import PraxisLabel from '@praxis/ui-src/components/base/PraxisLabel.vue'

const inputId = 'demo-name'
const inputIdReq = 'demo-email'
</script>

# Label

A semantic HTML label component that associates text with a form control. Supports an optional required indicator (asterisk) and the `for` attribute for accessibility.

## Basic

<ComponentDemo>
  <div style="width:300px;display:flex;flex-direction:column;gap:1.25rem">
    <div>
      <PraxisLabel label="Full Name" :for="inputId" />
      <input :id="inputId" class="input-base" placeholder="John Doe" style="margin-top:0.25rem" />
    </div>
    <div>
      <PraxisLabel label="Email Address" :for="inputIdReq" :required="true" />
      <input :id="inputIdReq" class="input-base" placeholder="john@example.com" style="margin-top:0.25rem" />
    </div>
  </div>

  <template #code>

```vue
<script setup>
import { PraxisLabel } from 'praxis-vue-ui'
</script>

<template>
  <!-- Basic label -->
  <PraxisLabel label="Full Name" for="name-input" />
  <input id="name-input" />

  <!-- Required indicator -->
  <PraxisLabel label="Email Address" for="email-input" :required="true" />
  <input id="email-input" />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
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

## Migration from RequiredLabel

`RequiredLabel` is now deprecated. Replace it with `PraxisLabel`:

```diff
- import { RequiredLabel } from 'praxis-vue-ui'
+ import { PraxisLabel } from 'praxis-vue-ui'

- <RequiredLabel label="Name" :required="true" />
+ <PraxisLabel label="Name" for="name-input" :required="true" />
```
