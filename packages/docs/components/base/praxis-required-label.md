<script setup>
import { ref } from 'vue'
import PraxisRequiredLabel from '@praxis/ui-src/components/base/PraxisRequiredLabel.vue'
</script>

# PraxisRequiredLabel

A small utility component that renders a field label with an optional red asterisk when the field is required. Used internally by `PraxisColorPickerField`, `UiTimePicker`, and other form components.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <PraxisRequiredLabel label="Full Name" :required="true" />
    <PraxisRequiredLabel label="Notes" :required="false" />
    <PraxisRequiredLabel label="Email Address" :required="true" />
  </div>

  <template #code>

```vue
<PraxisRequiredLabel label="Full Name" :required="true" />
<PraxisRequiredLabel label="Notes" :required="false" />
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'label', type: 'string', required: true, description: 'The label text to display.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'When true, renders a red asterisk (*) after the label text.' },
]" />
