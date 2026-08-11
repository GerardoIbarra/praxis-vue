<script setup>
import { ref } from 'vue'
import UiAvatar from '@praxis/ui-src/components/base/UiAvatar.vue'
</script>

# Avatar

A unified avatar component that displays a person's initials or photo. Colors are automatically derived from the name via a hash function for consistent per-person coloring.

## Initials (Basic)

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <UiAvatar name="Ana García" />
    <UiAvatar name="Luis Martínez" />
    <UiAvatar name="Sofia Kim" />
    <UiAvatar name="Carlos Rivera" />
  </div>

  <template #code>

```vue
<script setup>
import { UiAvatar } from 'praxis-vue-ui'
</script>

<template>
  <UiAvatar name="Ana García" />
  <UiAvatar name="Luis Martínez" />
</template>
```

  </template>
</ComponentDemo>

## Sizes

<ComponentDemo title="Sizes">
  <div style="display:flex;gap:1.25rem;align-items:flex-end">
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <UiAvatar name="Ana García" size="sm" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">sm</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <UiAvatar name="Luis Martínez" size="md" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">md</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <UiAvatar name="Sofia Kim" size="lg" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">lg</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <UiAvatar name="Carlos Rivera" size="xl" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">xl</span>
    </div>
  </div>

  <template #code>

```vue
<UiAvatar name="Ana García" size="sm" />
<UiAvatar name="Luis Martínez" size="md" />
<UiAvatar name="Sofia Kim" size="lg" />
<UiAvatar name="Carlos Rivera" size="xl" />
```

  </template>
</ComponentDemo>

## Square Shape

<ComponentDemo title="Square">
  <div style="display:flex;gap:1rem;align-items:center">
    <UiAvatar name="Ana García" shape="square" size="lg" />
    <UiAvatar name="Luis Martínez" shape="square" size="lg" />
    <UiAvatar name="Sofia Kim" shape="square" size="lg" />
  </div>

  <template #code>

```vue
<UiAvatar name="Ana García" shape="square" size="lg" />
```

  </template>
</ComponentDemo>

## With Footer Label

<ComponentDemo title="With Label">
  <div style="display:flex;gap:1.5rem;align-items:flex-start">
    <UiAvatar name="Ana García" size="xl" :label="true" />
    <UiAvatar name="Luis Martínez" size="xl" :label="true" />
    <UiAvatar name="Sofia Kim" size="xl" :label="true" />
  </div>

  <template #code>

```vue
<UiAvatar name="Ana García" size="xl" :label="true" />
```

  </template>
</ComponentDemo>

## Image Source

<ComponentDemo title="With Image">
  <div style="display:flex;gap:1rem;align-items:center">
    <UiAvatar
      name="Ana García"
      src="https://i.pravatar.cc/150?img=1"
      size="lg"
    />
    <UiAvatar
      name="Luis Martínez"
      src="https://i.pravatar.cc/150?img=12"
      size="lg"
    />
    <!-- Broken URL falls back to initials -->
    <UiAvatar
      name="Fallback User"
      src="https://example.invalid/image.jpg"
      size="lg"
    />
  </div>

  <template #code>

```vue
<UiAvatar
  name="Ana García"
  src="https://cdn.example.com/avatars/ana.jpg"
  size="lg"
/>
<!-- Broken URL falls back to initials automatically -->
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'name', type: 'string | null', default: 'null', description: 'Full name used to generate initials (first + last letter) and as the tooltip.' },
  { name: 'src', type: 'string | null', default: 'null', description: 'Image URL. When provided and loadable, it replaces the initials. Falls back to initials on error.' },
  { name: 'size', type: '\'sm\' | \'md\' | \'lg\' | \'xl\'', default: '\'md\'', description: 'Size preset. Maps to fixed pixel dimensions: sm=28px, md=36px, lg=48px, xl=64px.' },
  { name: 'shape', type: '\'circle\' | \'square\'', default: '\'circle\'', description: 'Shape of the avatar container.' },
  { name: 'color', type: 'string | \'auto\'', default: '\'auto\'', description: 'Background color. \'auto\' derives the color from the name hash. Pass any CSS color string for custom color.' },
  { name: 'label', type: 'boolean', default: 'false', description: 'When true, displays the full name below the avatar as a footer label.' },
]" />

## Deprecated Components

`BaseAvatar` and `InitialsAvatar` are kept for backward compatibility but internally delegate to `UiAvatar`. Migrate when convenient:

```diff
- import { BaseAvatar } from 'praxis-vue-ui'
+ import { UiAvatar } from 'praxis-vue-ui'

- <BaseAvatar :name="user.name" size="w-8 h-8" />
+ <UiAvatar :name="user.name" size="md" />
```
