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
    title: 'Información Personal',
    description: 'Tus credenciales y datos de contacto',
    schema: [
      {
        key: 'fullName',
        label: 'Nombre Completo',
        type: 'text',
        placeholder: 'ej. Elena Rostova',
        required: true
      },
      {
        key: 'email',
        label: 'Correo Corporativo',
        type: 'text',
        placeholder: 'elena@empresa.com',
        required: true
      }
    ],
    validate: (data) => {
      if (!data.fullName || data.fullName.trim().length < 3) {
        return 'El nombre completo debe tener al menos 3 caracteres'
      }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return 'Por favor ingresa un correo electrónico válido'
      }
      return true
    }
  },
  {
    id: 'company',
    title: 'Organización & Rol',
    description: 'Datos del equipo de trabajo',
    schema: [
      {
        key: 'orgName',
        label: 'Nombre de la Organización',
        type: 'text',
        placeholder: 'ej. Praxis Labs',
        required: true
      },
      {
        key: 'role',
        label: 'Tu Cargo / Especialidad',
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
        return 'El nombre de la organización es obligatorio'
      }
      if (!data.role) {
        return 'Selecciona tu cargo o especialidad'
      }
      return true
    }
  },
  {
    id: 'plan',
    title: 'Plan & Preferencias',
    description: 'Configuración final de cuenta',
    schema: [
      {
        key: 'plan',
        label: 'Selecciona tu Plan',
        type: 'select',
        options: [
          { label: 'Starter (Gratis)', value: 'free' },
          { label: 'Professional ($29/mes)', value: 'pro' },
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

# Multi-Step Form Wizard con Validación de Esquemas Zod

Los flujos de registro empresarial, configuración de proyectos o checkouts complejos suelen dividirse en múltiples pasos para no saturar al usuario. Sin embargo, un desafío crítico es **asegurar que cada paso valide sus campos de forma estricta antes de permitir avanzar**, evitando estados inválidos en la base de datos.

Esta receta enseña a orquestar `PxFormWizard` en conjunto con **Zod** para una validación robusta y tipada por cada etapa del formulario.

---

## Demostración Interactiva

Prueba avanzar sin completar los campos requeridos: `PxFormWizard` detendrá la navegación, mostrará una alerta descriptiva y focalizará el error. Al completar el último paso, se capturará el payload final.

<ComponentDemo title="Wizard de Registro con Validación por Paso">
  <div style="width:100%" class="space-y-4">
    <PxFormWizard
      v-model="wizardState"
      :steps="steps"
      next-label="Continuar"
      previous-label="Atrás"
      complete-label="Confirmar y Crear Cuenta"
      @complete="handleComplete"
    />

    <div v-if="submissionResult" style="margin-top:16px;padding:16px;border-radius:12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);font-size:0.85rem;">
      <div style="font-weight:600;color:var(--vp-c-brand-1);margin-bottom:8px;">✓ Payload Final Validado:</div>
      <pre style="margin:0;font-family:monospace;font-size:0.8rem;">{{ JSON.stringify(submissionResult, null, 2) }}</pre>
    </div>
  </div>

  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PxFormWizard, type WizardStep } from 'praxis-vue-ui'
import { z } from 'zod'

// 1. Definición de Esquemas Zod por Paso
const accountSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Ingresa un correo electrónico corporativo válido')
})

const companySchema = z.object({
  orgName: z.string().min(2, 'El nombre de la empresa es obligatorio'),
  role: z.string().min(1, 'Selecciona tu cargo')
})

// 2. Estado reactivo del formulario completo
const formState = ref({
  fullName: '',
  email: '',
  orgName: '',
  role: '',
  plan: 'pro'
})

// 3. Configuración de Pasos con Validación Zod
const steps: WizardStep[] = [
  {
    id: 'account',
    title: 'Información Personal',
    description: 'Credenciales de acceso',
    schema: [
      { key: 'fullName', label: 'Nombre Completo', type: 'text', required: true },
      { key: 'email', label: 'Correo Corporativo', type: 'text', required: true }
    ],
    // Validador utilizando el schema Zod
    validate: (data) => {
      const result = accountSchema.safeParse(data)
      if (!result.success) {
        return result.error.issues[0]?.message || 'Error en los datos de cuenta'
      }
      return true
    }
  },
  {
    id: 'company',
    title: 'Organización & Rol',
    description: 'Detalles del espacio de trabajo',
    schema: [
      { key: 'orgName', label: 'Organización', type: 'text', required: true },
      {
        key: 'role',
        label: 'Cargo',
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
        return result.error.issues[0]?.message || 'Error en datos corporativos'
      }
      return true
    }
  },
  {
    id: 'plan',
    title: 'Plan & Resumen',
    description: 'Selección de suscripción',
    schema: [
      {
        key: 'plan',
        label: 'Plan',
        type: 'select',
        options: [
          { label: 'Starter', value: 'free' },
          { label: 'Pro ($29/mes)', value: 'pro' }
        ]
      }
    ]
  }
]

async function onWizardComplete(finalPayload: typeof formState.value) {
  console.log('Enviando payload al backend:', finalPayload)
  // Envío a la API: await api.post('/register', finalPayload)
}
</script>

<template>
  <PxFormWizard
    v-model="formState"
    :steps="steps"
    next-label="Continuar"
    previous-label="Atrás"
    complete-label="Finalizar Registro"
    @complete="onWizardComplete"
  />
</template>
```

  </template>
</ComponentDemo>

---

## Patrones y Buenas Prácticas

### 1. `safeParse` en lugar de `parse`
Al validar formularios reactivos, evita que Zod arroje excepciones no controladas (`throw`). Utiliza `safeParse()`:

```ts
const result = accountSchema.safeParse(data)
if (!result.success) {
  // Retorna el primer mensaje de error para mostrar al usuario
  return result.error.issues[0]?.message
}
return true
```

### 2. Guardado de Progreso en `localStorage`
Para evitar frustraciones si el usuario recarga la página por accidente o pierde la conexión, puedes sincronizar el modelo del Wizard con `useStorage` de `@vueuse/core`:

```ts
import { useStorage } from '@vueuse/core'

const formState = useStorage('praxis_onboarding_draft', {
  fullName: '',
  email: '',
  orgName: '',
  role: '',
  plan: 'pro'
})

// Al completar con éxito, limpias el borrador:
function onWizardComplete() {
  localStorage.removeItem('praxis_onboarding_draft')
}
```

### 3. Validación Asíncrona (Unicidad de Usuario o Subdominio)
Si requieres verificar si un nombre de usuario o subdominio ya existe en el servidor antes de permitir pasar al paso 2, la función `validate` de cada paso puede ser asíncrona:

```ts
validate: async (data) => {
  const isAvailable = await checkOrgAvailability(data.orgName)
  if (!isAvailable) {
    return 'Este nombre de organización ya se encuentra en uso'
  }
  return true
}
```
