<script setup>
import { ref } from 'vue'
import PxFormWizard from '@praxis/px-src/components/forms/PxFormWizard.vue'

const wizardData = ref({
  accountType: 'empresa',
  email: '',
  companyName: '',
  teamSize: '1-10',
  notifications: true
})

const completedSubmission = ref(null)

const wizardSteps = [
  {
    id: 'account',
    title: 'Cuenta',
    description: 'Credenciales y acceso',
    schema: [
      {
        key: 'accountType',
        label: 'Tipo de Cuenta',
        type: 'select',
        options: [
          { label: 'Empresa', value: 'empresa' },
          { label: 'Particular', value: 'particular' }
        ],
        required: true
      },
      {
        key: 'email',
        label: 'Correo Electrónico',
        type: 'text',
        placeholder: 'ejemplo@empresa.com',
        required: true
      }
    ],
    validate: (data) => {
      if (!data.accountType) return 'Selecciona un tipo de cuenta'
      if (!data.email || !data.email.includes('@')) return 'Ingresa un correo electrónico válido'
      return true
    }
  },
  {
    id: 'profile',
    title: 'Organización',
    description: 'Información corporativa',
    schema: [
      {
        key: 'companyName',
        label: 'Nombre de la Empresa u Organización',
        type: 'text',
        required: true
      },
      {
        key: 'teamSize',
        label: 'Tamaño del Equipo',
        type: 'select',
        options: [
          { label: '1 - 10 personas', value: '1-10' },
          { label: '11 - 50 personas', value: '11-50' },
          { label: '50+ personas', value: '50+' }
        ]
      }
    ],
    validate: (data) => {
      if (!data.companyName || data.companyName.trim().length < 2) {
        return 'El nombre de la empresa debe tener al menos 2 caracteres'
      }
      return true
    }
  },
  {
    id: 'confirm',
    title: 'Confirmación',
    description: 'Resumen y preferencias',
    schema: [
      {
        key: 'notes',
        label: 'Comentarios o instrucciones adicionales',
        type: 'text',
        placeholder: 'Opcional...'
      }
    ]
  }
]

const handleComplete = (data) => {
  completedSubmission.value = data
}
</script>

# PxFormWizard

A multi-step form wizard that seamlessly combines **`PxStepper`** step navigation with **`PxSchemaForm`** dynamic rendering and per-step **Zod** schema validation.

## Basic Usage

<ComponentDemo title="Multi-Step Schema Form Wizard">
  <div style="width:100%">
    <PxFormWizard
      v-model="wizardData"
      :steps="wizardSteps"
      next-label="Siguiente Paso"
      previous-label="Paso Anterior"
      complete-label="Finalizar Registro"
      @complete="handleComplete"
    />

    <div v-if="completedSubmission" class="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-mono">
      <strong>✓ Formulario completado:</strong>
      <pre class="mt-2">{{ JSON.stringify(completedSubmission, null, 2) }}</pre>
    </div>
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxFormWizard, type WizardStep } from 'praxis-vue-ui'
import { z } from 'zod'

const formData = ref({
  email: '',
  companyName: ''
})

const steps: WizardStep[] = [
  {
    id: 'account',
    title: 'Cuenta',
    description: 'Acceso inicial',
    schema: [
      { key: 'email', label: 'Correo', type: 'text', required: true }
    ],
    zodSchema: z.object({
      email: z.string().min(1, 'El correo es requerido').email('Correo no válido')
    })
  },
  {
    id: 'organization',
    title: 'Organización',
    description: 'Datos de empresa',
    schema: [
      { key: 'companyName', label: 'Empresa', type: 'text', required: true }
    ],
    zodSchema: z.object({
      companyName: z.string().min(2, 'Mínimo 2 caracteres')
    })
  }
]
</script>

<template>
  <PxFormWizard
    v-model="formData"
    :steps="steps"
    @complete="(data) => console.log('Wizard completado:', data)"
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
  { name: 'steps', type: 'WizardStep[]', default: '[]', description: 'Array of step configuration objects (see WizardStep interface below).' },
  { name: 'modelValue', type: 'Record<string, unknown>', default: '{}', description: 'Two-way bound form state across all steps.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Disables step buttons and displays a loading spinner.' },
  { name: 'linear', type: 'boolean', default: 'true', description: 'When true, users cannot jump ahead to steps without successfully completing previous steps.' },
  { name: 'nextLabel', type: 'string', default: '\'Siguiente\'', description: 'Label for the advance button.' },
  { name: 'previousLabel', type: 'string', default: '\'Anterior\'', description: 'Label for the back button.' },
  { name: 'completeLabel', type: 'string', default: '\'Completar\'', description: 'Label for the submit button on the final step.' },
  { name: 'loadingLabel', type: 'string', default: '\'Guardando...\'', description: 'Text shown when loading is active.' },
]" />

### WizardStep Interface

```ts
interface WizardStep {
  id: string | number
  title: string
  description?: string
  icon?: Component
  schema: FormSchemaField[]
  zodSchema?: ZodSchema<any>
  validate?: (
    stepData: Record<string, unknown>,
    allData: Record<string, unknown>
  ) => boolean | Promise<boolean> | string | Promise<string>
}
```

## Emits

<div class="px-section-header">
  <span class="px-section-badge badge-emits">Emits</span>
</div>

<EmitsTable :rows="[
  { name: 'update:modelValue', payload: 'Record<string, unknown>', description: 'Emitted whenever any field value changes.' },
  { name: 'step-change', payload: 'stepIndex: number, step: WizardStep', description: 'Emitted when moving between steps.' },
  { name: 'complete', payload: 'Record<string, unknown>', description: 'Emitted on the last step after all validations pass.' },
  { name: 'error', payload: '{ stepIndex: number, message: string }', description: 'Emitted when step validation fails.' },
]" />

## Slots

<div class="px-section-header">
  <span class="px-section-badge badge-slots">Slots</span>
</div>

| Slot | Scope | Description |
|------|-------|-------------|
| `before-form` | `{ step: WizardStep, stepIndex: number }` | Content placed before the active step's schema form. |
| `after-form` | `{ step: WizardStep, stepIndex: number }` | Content placed after the active step's schema form. |
| `actions` | `{ step: WizardStep, stepIndex: number, isLastStep: boolean }` | Custom replacement for next / complete action buttons. |
