<script setup>
import { ref } from 'vue'
import PxStateChecklist from '@praxis/px-src/components/forms/PxStateChecklist.vue'

const fieldData1 = ref({})
const fieldData2 = ref({})

const sampleField = {
  label: "System Preferences",
  type: "check_list",
  fields: {
    list_children: [
      { key: "auto_save", label: "Auto Save", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "dark_mode", label: "Dark Mode", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "notifications", label: "Push Notifications", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "telemetry", label: "Send Telemetry Data", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hardware_accel", label: "Hardware Acceleration", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}

const sampleInputField = {
  label: "Extensions",
  type: "check_list_input",
  fields: {
    input_father: { type: "input", value: "" },
    list_children: [
      { key: "ext1", label: "AdBlocker", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext2", label: "Grammarly", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext3", label: "Vue DevTools", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] },
      { key: "ext4", label: "React DevTools", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }, { type: "input", value: "" }] }
    ]
  }
}
</script>

# PxStateChecklist

Un componente dinámico impulsado por esquemas, diseñado para representar opciones de tres estados (Verdadero/Falso/Marcado) sobre listas de elementos. Soporta campos de texto opcionales por elemento según la configuración del esquema.

## Lista de Verificación Estándar

Renderiza una lista de elementos con opciones de Verdadero (✓), Falso (✗) y Marcado (⚑).

<ComponentDemo title="Lista de Verificación Estándar">
  <div style="width:100%">
    <PxStateChecklist :field="sampleField" v-model="fieldData1" :default-open="true" />
  </div>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { PxStateChecklist } from 'praxis-vue-ui'

const data = ref({})
const field = {
  label: "Preferencias del Sistema",
  type: "check_list",
  fields: {
    list_children: [
      { key: "auto_save", label: "Guardado Automático", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "dark_mode", label: "Modo Oscuro", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "notifications", label: "Notificaciones Push", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "telemetry", label: "Enviar Telemetría", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] },
      { key: "hardware_accel", label: "Aceleración por Hardware", components: [{ type: "radio", value: null }, { type: "checkbox", checked: false }] }
    ]
  }
}
</script>

<template>
  <PxStateChecklist :field="field" v-model="data" :default-open="true" />
</template>
```

  </template>
</ComponentDemo>

## Lista con Campos de Entrada

Si el esquema contiene componentes `input_father` o `input` para elementos hijos, el componente se adapta automáticamente para mostrar campos de entrada de texto.

<ComponentDemo title="Checklist con Entradas de Texto">
  <div style="width:100%">
    <PxStateChecklist :field="sampleInputField" v-model="fieldData2" :default-open="true" />
  </div>

  <template #code>

```vue
<PxStateChecklist :field="inputSchema" v-model="data" :default-open="true" />
```

  </template>
</ComponentDemo>

## Referencia de la API

<ApiReference component="PxStateChecklist" />

### Métodos Expuestos

Se puede acceder mediante una referencia de plantilla (`template ref`) para controlar la lista de verificación de forma programática:

| Nombre | Descripción |
|---|---|
| `clearAll()` | Restablece todas las selecciones y campos de texto a sus estados vacíos predeterminados. |
| `setRestFalse()` | Establece el valor de radio en "no" para todos los elementos que aún no han sido respondidos. |
| `setAllFalse()` | Establece el valor de radio en "no" para todos los elementos, sobrescribiendo las respuestas actuales. |

> [!NOTE]
> Este componente está diseñado para formularios dinámicos guiados por esquemas. Para listas de verificación simples sin esquemas, considere usar `PxCheckbox` directamente.
