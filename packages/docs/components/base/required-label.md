<script setup>
import { ref } from 'vue'
import RequiredLabel from '@praxis/ui-src/components/base/RequiredLabel.vue'
</script>

# RequiredLabel

A small utility component that renders a field label with an optional red asterisk when the field is required. Used internally by `ColorPickerField`, `PraxisTimePicker`, and other form components.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <RequiredLabel label="Full Name" :required="true" />
    <RequiredLabel label="Notes" :required="false" />
    <RequiredLabel label="Email Address" :required="true" />
  </div>

  <template #code>

```vue
<RequiredLabel label="Full Name" :required="true" />
<RequiredLabel label="Notes" :required="false" />
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
