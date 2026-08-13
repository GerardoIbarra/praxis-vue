<script setup>
import { ref } from 'vue'
import PxStepper from '@praxis/px-src/components/navigation/PxStepper.vue'

const step = ref(1)
const loading = ref(false)

const next = () => { if (step.value < 3) step.value++ }
const prev = () => { if (step.value > 1) step.value-- }
const save = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
}
</script>

# PxStepper

Navigation button row for multi-step forms. Provides Previous, Next and optional Save buttons with loading state, permission gating, and fully customizable labels.

## Basic Usage

<ComponentDemo>
  <div style="width:100%;max-width:500px">
    <div style="margin-bottom:1rem;padding:1rem;background:var(--vp-c-bg-soft);border-radius:8px;font-size:0.875rem;color:var(--vp-c-text-2)">
      Step {{ step }} of 3
    </div>
    <PxStepper
      :show-previous="step > 1"
      :can-proceed="true"
      next-label="Next: Contact Info"
      @previous="prev"
      @next="next"
    />
  </div>

  <template #code>

```vue
<script setup>
import { PxStepper } from 'px-vue-ui'
import { ref } from 'vue'

const step = ref(1)
const next = () => step.value++
const prev = () => step.value--
</script>

<template>
  <PxStepper
    :show-previous="step > 1"
    :can-proceed="true"
    next-label="Next: Contact Info"
    @previous="prev"
    @next="next"
  />
</template>
```

  </template>
</ComponentDemo>

## With Save Button (Last Step)

<ComponentDemo title="With Save">
  <div style="width:100%;max-width:500px">
    <PxStepper
      :show-previous="true"
      :show-save="true"
      :can-proceed="true"
      :loading="loading"
      next-label="Submit"
      save-label="Save Draft"
      @previous="prev"
      @next="next"
      @save="save"
    />
  </div>

  <template #code>

```vue
<PxStepper
  :show-previous="true"
  :show-save="true"
  :can-proceed="true"
  :loading="isSaving"
  next-label="Submit"
  save-label="Save Draft"
  @previous="prev"
  @next="submit"
  @save="saveDraft"
/>
```

  </template>
</ComponentDemo>

## Disabled (No Permission)

<ComponentDemo title="No Permission">
  <div style="width:100%;max-width:500px">
    <PxStepper
      :show-previous="true"
      :can-proceed="true"
      :has-permission="false"
      :show-save="true"
      @previous="prev"
      @next="next"
    />
  </div>

  <template #code>

```vue
<PxStepper
  :show-previous="true"
  :can-proceed="true"
  :has-permission="false"
  :show-save="true"
  @previous="prev"
  @next="next"
/>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'showPrevious', type: 'boolean', default: 'true', description: 'Whether to render the Previous button. Set to false on the first step.' },
  { name: 'canProceed', type: 'boolean', default: 'true', description: 'Enables or disables the Next button. Use for step-level validation.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Puts all buttons in loading state. Shows spinner and loading labels.' },
  { name: 'nextLabel', type: 'string', default: '\'Next\'', description: 'Label text for the Next/Proceed button.' },
  { name: 'previousLabel', type: 'string', default: '\'Previous\'', description: 'Label text for the Previous button.' },
  { name: 'loadingLabel', type: 'string', default: '\'Processing...\'', description: 'Text shown inside Next button while loading is true.' },
  { name: 'showSave', type: 'boolean', default: 'false', description: 'Show the optional Save button alongside Next. Useful on the last step.' },
  { name: 'saveLabel', type: 'string', default: '\'Save\'', description: 'Label for the Save button.' },
  { name: 'saveLoadingLabel', type: 'string', default: '\'Saving...\'', description: 'Text shown inside Save button while loading is true.' },
  { name: 'hasPermission', type: 'boolean', default: 'true', description: 'When false, disables the Save button (and Next on the last step). Use for role-based access control.' },
]" />

## Emits

<div class="px-section-header">
  <span class="px-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'previous', payload: 'void', description: 'Emitted when the Previous button is clicked.' },
  { name: 'next', payload: 'void', description: 'Emitted when the Next button is clicked and not disabled.' },
  { name: 'save', payload: 'void', description: 'Emitted when the Save button is clicked and not disabled.' },
]" />
