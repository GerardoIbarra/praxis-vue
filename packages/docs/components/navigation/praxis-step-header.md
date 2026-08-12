<script setup>
import { ref } from 'vue'
import PraxisStepHeader from '@praxis/ui-src/components/navigation/PraxisStepHeader.vue'
</script>

# PraxisStepHeader

Displays the current step number and title in multi-step form flows. Provides a visual indicator of progress position.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:500px">
    <PraxisStepHeader :step="1" title="Personal Information" />
    <PraxisStepHeader :step="2" title="Contact Details" />
    <PraxisStepHeader :step="3" title="Review & Submit" />
  </div>

  <template #code>

```vue
<PraxisStepHeader :step="1" title="Personal Information" />
<PraxisStepHeader :step="2" title="Contact Details" />
<PraxisStepHeader :step="3" title="Review & Submit" />
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'step', type: 'number', required: true, description: 'The current step number to display.' },
  { name: 'title', type: 'string', required: true, description: 'The title of the current step.' },
]" />
