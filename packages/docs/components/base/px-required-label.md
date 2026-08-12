<script setup>
import { ref } from 'vue'
import PxRequiredLabel from '@praxis/px-src/components/base/PxRequiredLabel.vue'
</script>

# PxRequiredLabel

A small utility component that renders a field label with an optional red asterisk when the field is required. Used internally by `PxColorPickerField`, `PxTimePicker`, and other form components.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <PxRequiredLabel label="Full Name" :required="true" />
    <PxRequiredLabel label="Notes" :required="false" />
    <PxRequiredLabel label="Email Address" :required="true" />
  </div>

  <template #code>

```vue
<PxRequiredLabel label="Full Name" :required="true" />
<PxRequiredLabel label="Notes" :required="false" />
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'label', type: 'string', required: true, description: 'The label text to display.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'When true, renders a red asterisk (*) after the label text.' },
]" />
