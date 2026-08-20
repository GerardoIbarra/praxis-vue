---
title: PxTableSkeleton
description: A premium skeleton loader specifically designed for table layouts.
---

# PxTableSkeleton

A premium skeleton loader specifically designed for table layouts. It automatically generates pseudo-random line widths to simulate real text, avoiding the monotonous "blocky" look of standard skeletons.

It's automatically used by `PxDataTable` and `PxStatusDataTable` when their `loading` prop is set to `true`, but you can use it manually inside any native HTML `<tbody>`.

## Basic Usage

<script setup>
import PxTableSkeleton from '@praxis/px-src/components/data-display/PxTableSkeleton.vue'
</script>

<ComponentDemo>
  <div style="width:100%; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <table style="width: 100%; text-align: left; border-collapse: collapse;">
      <thead style="background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider);">
        <tr>
          <th style="padding: 1rem;">ID</th>
          <th style="padding: 1rem;">Name</th>
          <th style="padding: 1rem;">Role</th>
          <th style="padding: 1rem;">Status</th>
        </tr>
      </thead>
      <tbody>
        <PxTableSkeleton :columns="4" :rows="3" />
      </tbody>
    </table>
  </div>

  <template #code>

```vue
<script setup>
import { PxTableSkeleton } from 'praxis-vue-ui'
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- Render 3 rows with 4 standard columns each -->
      <PxTableSkeleton :columns="4" :rows="3" />
    </tbody>
  </table>
</template>
```

  </template>
</ComponentDemo>

## Complex Tables

If your table includes a selection column (checkboxes) or an expansion column (chevrons), you can tell the skeleton to render square placeholders for those specific columns to match the layout exactly and avoid layout shifts.

<ComponentDemo title="With Selection and Expansion">
  <div style="width:100%; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <table style="width: 100%; text-align: left; border-collapse: collapse;">
      <tbody>
        <PxTableSkeleton :columns="3" :rows="2" :has-selection="true" :has-expansion="true" />
      </tbody>
    </table>
  </div>

  <template #code>

```vue
<tbody>
  <PxTableSkeleton 
    :columns="3" 
    :rows="2" 
    :has-selection="true" 
    :has-expansion="true" 
  />
</tbody>
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'columns', type: 'number', default: 'undefined', required: true, description: 'The number of standard data columns to render.' },
  { name: 'rows', type: 'number', default: '5', description: 'The number of skeleton rows to generate.' },
  { name: 'hasSelection', type: 'boolean', default: 'false', description: 'Renders a small square placeholder at the far left to simulate a checkbox column.' },
  { name: 'hasExpansion', type: 'boolean', default: 'false', description: 'Renders a small square placeholder (next to the selection if any) to simulate a chevron/expansion column.' },
]" />
