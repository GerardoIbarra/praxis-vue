<script setup>
import { ref } from 'vue'
import PxFormWizard from '@praxis/px-src/components/forms/PxFormWizard.vue'

const wizardState = ref({
  fullName: '',
  email: '',
  role: '',
  orgName: '',
  plan: 'pro',
  newsletter: true
})

const submissionResult = ref(null)

const steps = [
  {
    id: 'account',
    title: 'Personal Info',
    description: 'Your credentials and contact info',
    schema: [
      {
        key: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'e.g. Elena Rostova',
        required: true
      },
      {
        key: 'email',
        label: 'Corporate Email',
        type: 'text',
        placeholder: 'elena@company.com',
        required: true
      }
    ],
    validate: (data) => {
      if (!data.fullName || data.fullName.trim().length < 3) {
        return 'Full name must have at least 3 characters'
      }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return 'Please enter a valid email address'
      }
      return true
    }
  },
  {
    id: 'company',
    title: 'Organization & Role',
    description: 'Workspace and team details',
    schema: [
      {
        key: 'orgName',
        label: 'Organization Name',
        type: 'text',
        placeholder: 'e.g. Praxis Labs',
        required: true
      },
      {
        key: 'role',
        label: 'Role / Specialty',
        type: 'select',
        options: [
          { label: 'Engineering / Dev', value: 'eng' },
          { label: 'Product & Design', value: 'design' },
          { label: 'Founder / C-Level', value: 'exec' },
          { label: 'Operations & QA', value: 'ops' }
        ],
        required: true
      }
    ],
    validate: (data) => {
      if (!data.orgName || data.orgName.trim().length < 2) {
        return 'Organization name is required'
      }
      if (!data.role) {
        return 'Please select your role or specialty'
      }
      return true
    }
  },
  {
    id: 'plan',
    title: 'Plan & Summary',
    description: 'Account subscription tier',
    schema: [
      {
        key: 'plan',
        label: 'Select Your Plan',
        type: 'select',
        options: [
          { label: 'Starter (Free)', value: 'free' },
          { label: 'Professional ($29/mo)', value: 'pro' },
          { label: 'Enterprise (Custom)', value: 'enterprise' }
        ]
      }
    ]
  }
]

function handleComplete(payload) {
  submissionResult.value = payload
}
</script>

# Multi-Step Form Wizard with Zod Schema Validation

Enterprise registration flows, project setups, or complex checkout journeys are typically divided into multiple steps to avoid overwhelming users. A critical engineering requirement is **ensuring that each step strictly validates its input before allowing progression**, preventing partial or invalid states from reaching the server.

This recipe teaches how to integrate `PxFormWizard` with **Zod** for robust, typed validation per step.

---

## Interactive Demonstration

Try advancing without filling in the required fields: `PxFormWizard` intercepts navigation, displays a focused error message, and retains step state. Upon completing the final step, the validated payload is emitted.

<ComponentDemo title="Multi-Step Registration Wizard with Step-Level Validation">
  <div style="width:100%" class="space-y-4">
    <PxFormWizard
      v-model="wizardState"
      :steps="steps"
      next-label="Continue"
      previous-label="Back"
      complete-label="Confirm & Create Account"
      @complete="handleComplete"
    />
    <div v-if="submissionResult" style="margin-top:16px;padding:16px;border-radius:12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);font-size:0.85rem;">
      <div style="font-weight:600;color:var(--vp-c-brand-1);margin-bottom:8px;">✓ Validated Final Payload:</div>
      <pre style="margin:0;font-family:monospace;font-size:0.8rem;">{{ JSON.stringify(submissionResult, null, 2) }}</pre>
    </div>
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxFormWizard, type WizardStep } from 'praxis-vue-ui'
import { z } from 'zod'

// 1. Zod Schemas per step
const accountSchema = z.object({
  fullName: z.string().min(3, 'Full name must have at least 3 characters'),
  email: z.string().email('Please enter a valid corporate email')
})

const companySchema = z.object({
  orgName: z.string().min(2, 'Organization name is required'),
  role: z.string().min(1, 'Please select your role')
})

// 2. Reactive form state across all steps
const formState = ref({
  fullName: '',
  email: '',
  orgName: '',
  role: '',
  plan: 'pro'
})

// 3. Step configurations with Zod safeParse
const steps: WizardStep[] = [
  {
    id: 'account',
    title: 'Personal Info',
    description: 'Login credentials',
    schema: [
      { key: 'fullName', label: 'Full Name', type: 'text', required: true },
      { key: 'email', label: 'Corporate Email', type: 'text', required: true }
    ],
    validate: (data) => {
      const result = accountSchema.safeParse(data)
      if (!result.success) {
        return result.error.issues[0]?.message || 'Account validation error'
      }
      return true
    }
  },
  {
    id: 'company',
    title: 'Organization & Role',
    description: 'Workspace details',
    schema: [
      { key: 'orgName', label: 'Organization', type: 'text', required: true },
      {
        key: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'eng' },
          { label: 'Product & Design', value: 'design' },
          { label: 'Management', value: 'exec' }
        ]
      }
    ],
    validate: (data) => {
      const result = companySchema.safeParse(data)
      if (!result.success) {
        return result.error.issues[0]?.message || 'Organization validation error'
      }
      return true
    }
  },
  {
    id: 'plan',
    title: 'Plan & Summary',
    description: 'Subscription selection',
    schema: [
      {
        key: 'plan',
        label: 'Plan',
        type: 'select',
        options: [
          { label: 'Starter', value: 'free' },
          { label: 'Pro ($29/mo)', value: 'pro' }
        ]
      }
    ]
  }
]

async function onWizardComplete(finalPayload: typeof formState.value) {
  console.log('Submitting validated payload:', finalPayload)
  // await api.post('/register', finalPayload)
}
</script>

<template>
  <PxFormWizard
    v-model="formState"
    :steps="steps"
    next-label="Continue"
    previous-label="Back"
    complete-label="Complete Registration"
    @complete="onWizardComplete"
  />
</template>
```

  </template>
</ComponentDemo>

---

## Patterns & Best Practices

### 1. `safeParse` instead of `parse`
When validating user forms reactively, avoid letting Zod throw uncaught exceptions. Use `safeParse()`:

```ts
const result = accountSchema.safeParse(data)
if (!result.success) {
  // Return the first human-readable error message to display
  return result.error.issues[0]?.message
}
return true
```

### 2. Persisting Progress to `localStorage`
To prevent user frustration from accidental page reloads or network drops, synchronize wizard state with `useStorage` from `@vueuse/core`:

```ts
import { useStorage } from '@vueuse/core'

const formState = useStorage('praxis_onboarding_draft', {
  fullName: '',
  email: '',
  orgName: '',
  role: '',
  plan: 'pro'
})

// Clear draft on successful completion:
function onWizardComplete() {
  localStorage.removeItem('praxis_onboarding_draft')
}
```

### 3. Asynchronous Validation (Username / Subdomain Uniqueness)
If you need to check whether an organization name or subdomain is available on the server before proceeding to step 2, step `validate` functions can be async:

```ts
validate: async (data) => {
  const isAvailable = await checkOrgAvailability(data.orgName)
  if (!isAvailable) {
    return 'This organization name is already taken'
  }
  return true
}
```
