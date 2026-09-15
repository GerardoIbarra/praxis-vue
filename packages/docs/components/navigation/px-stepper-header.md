<script setup>
import { ref } from 'vue'
import { User, Building2, CheckCircle } from '@lucide/vue'
import PxStepperHeader from '@praxis/px-src/components/navigation/PxStepperHeader.vue'

const activeStep = ref('1')
</script>

# PxStepperHeader

A single step header — icon, title, description, and active/inactive styling based on how its `stepValue` compares to the current `activeStep`. Used to build custom step indicators (`PxFormWizard` renders its own step nav internally rather than using this component).

## Basic Usage

<ComponentDemo>
  <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:500px">
    <PxStepperHeader :icon="User" title="Personal Information" description="Your name and contact details" step-value="1" :active-step="activeStep" @activate="activeStep = '1'" />
    <PxStepperHeader :icon="Building2" title="Organization" description="Company and role" required step-value="2" :active-step="activeStep" @activate="activeStep = '2'" />
    <PxStepperHeader :icon="CheckCircle" title="Review & Submit" description="Confirm and finish" step-value="3" :active-step="activeStep" @activate="activeStep = '3'" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { User, Building2, CheckCircle } from '@lucide/vue'
import { PxStepperHeader } from 'praxis-vue-ui'

const activeStep = ref('1')
</script>

<template>
  <PxStepperHeader
    :icon="User"
    title="Personal Information"
    description="Your name and contact details"
    step-value="1"
    :active-step="activeStep"
    @activate="activeStep = '1'"
  />
  <PxStepperHeader
    :icon="Building2"
    title="Organization"
    description="Company and role"
    required
    step-value="2"
    :active-step="activeStep"
    @activate="activeStep = '2'"
  />
</template>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'icon', type: 'Component', required: true, description: 'Icon component rendered inside the step\'s circle marker.' },
  { name: 'title', type: 'string', required: true, description: 'Step title text.' },
  { name: 'description', type: 'string', required: true, description: 'Step description text, shown below the title.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows a red asterisk next to the title.' },
  { name: 'stepValue', type: 'string | number', default: '\'1\'', description: 'This step\'s own identifying value.' },
  { name: 'activeStep', type: 'string | number', default: '\'1\'', description: 'The currently active step\'s value — the marker is styled as \'reached\' while stepValue <= activeStep.' },
]" />

## Emits

<EmitsTable :rows="[
  { name: 'activate', payload: '—', description: 'Emitted when the step header is clicked.' },
]" />
