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
import { PxStepper } from 'praxis-vue-ui'
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

## API Reference

<ApiReference component="PxStepper" />
