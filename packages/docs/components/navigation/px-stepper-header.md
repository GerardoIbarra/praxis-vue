<script setup>
import { ref } from 'vue'
import PxStepperHeader from '@praxis/px-src/components/navigation/PxStepperHeader.vue'
</script>

# PxStepperHeader

Displays the current step number and title in multi-step form flows. Provides a visual indicator of progress position.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:500px">
    <PxStepperHeader :step="1" title="Personal Information" />
    <PxStepperHeader :step="2" title="Contact Details" />
    <PxStepperHeader :step="3" title="Review & Submit" />
  </div>

  <template #code>

```vue
<PxStepperHeader :step="1" title="Personal Information" />
<PxStepperHeader :step="2" title="Contact Details" />
<PxStepperHeader :step="3" title="Review & Submit" />
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'step', type: 'number', required: true, description: 'The current step number to display.' },
  { name: 'title', type: 'string', required: true, description: 'The title of the current step.' },
]" />
