<script setup>
import PraxisPageHeader from '@praxis/ui-src/components/layout/PraxisPageHeader.vue'
</script>

# PraxisPageHeader

A responsive page-level header that displays a title, subtitle, and optional action slot. Adapts from stacked (mobile) to side-by-side (desktop) layout automatically.

## Basic Usage

<ComponentDemo>
  <div style="width:100%">
    <PraxisPageHeader
      title="Users"
      subtitle="Manage your team members and their access levels."
    />
  </div>

  <template #code>

```vue
<PraxisPageHeader
  title="Users"
  subtitle="Manage your team members and their access levels."
/>
```

  </template>
</ComponentDemo>

## With Actions

<ComponentDemo title="With Actions">
  <div style="width:100%">
    <PraxisPageHeader title="Projects" subtitle="237 active projects">
      <template #actions>
        <button style="padding:0.5rem 1rem;background:var(--p-primary-600);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.875rem;font-weight:500">
          Add Project
        </button>
        <button style="padding:0.5rem 1rem;background:transparent;color:var(--vp-c-text-1);border:1px solid var(--vp-c-border);border-radius:8px;cursor:pointer;font-size:0.875rem;font-weight:500">
          Export
        </button>
      </template>
    </PraxisPageHeader>
  </div>

  <template #code>

```vue
<PraxisPageHeader title="Projects" subtitle="237 active projects">
  <template #actions>
    <button class="btn-primary">Add Project</button>
    <button class="btn-secondary">Export</button>
  </template>
</PraxisPageHeader>
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'title', type: 'string', default: 'undefined', description: 'Main heading text. Also overridable via the title slot.' },
  { name: 'subtitle', type: 'string', default: 'undefined', description: 'Subheading text displayed below the title. Also overridable via the subtitle slot.' },
  { name: 'containerClass', type: 'string', default: '\'bg-primary border-border-light shadow-xs text-slate-900 dark:text-white\'', description: 'CSS classes applied to the outer container div for custom styling.' },
]" />

## Slots

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-slots">Slots</span>
</div>

| Slot | Description |
|------|-------------|
| `title` | Override the title rendering. Replaces the `title` prop text. |
| `subtitle` | Override the subtitle rendering. Replaces the `subtitle` prop text. |
| `actions` | Right-side content. Use for buttons, filters, or search inputs. Only rendered if this slot has content. |
