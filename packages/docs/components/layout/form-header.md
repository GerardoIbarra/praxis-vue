<script setup>
import FormHeader from '@praxis/ui-src/components/layout/FormHeader.vue'
</script>

# FormHeader

A section header for form pages that automatically generates "Create {title}" or "Edit {title}" text based on the current mode. Includes an `actions` slot for buttons.

## Create Mode

<ComponentDemo>
  <div style="width:100%;max-width:600px">
    <FormHeader title="Patient" :is-edit-mode="false" />
  </div>

  <template #code>

```vue
<FormHeader title="Patient" :is-edit-mode="false" />
```

  </template>
</ComponentDemo>

## Edit Mode

<ComponentDemo title="Edit Mode">
  <div style="width:100%;max-width:600px">
    <FormHeader title="Patient" :is-edit-mode="true" />
  </div>

  <template #code>

```vue
<FormHeader title="Patient" :is-edit-mode="true" />
```

  </template>
</ComponentDemo>

## Custom Title (validtitle: false)

<ComponentDemo title="Custom Title">
  <div style="width:100%;max-width:600px">
    <FormHeader title="Patient Profile — Advanced Settings" :is-edit-mode="true" :validtitle="false" />
  </div>

  <template #code>

```vue
<FormHeader title="Patient Profile" :is-edit-mode="true" :validtitle="false" />
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'title', type: 'string', required: true, description: 'Entity name used to generate the header text (e.g. \'User\', \'Patient\').' },
  { name: 'isEditMode', type: 'boolean', required: true, description: 'When true renders \'Edit {title}\', when false renders \'Create {title}\'.' },
  { name: 'validtitle', type: 'boolean', default: 'true', description: 'When false, renders the title prop as-is without Create/Edit prefix.' },
]" />

## Slots

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-slots">Slots</span>
</div>

| Slot | Description |
|------|-------------|
| `actions` | Content rendered on the right side of the header — use for action buttons like Save, Cancel, or History. |
