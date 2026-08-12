<script setup>
import { ref } from 'vue'
import PxAvatar from '@praxis/px-src/components/base/PxAvatar.vue'
</script>

# Avatar

A unified avatar component that displays a person's initials or photo. Colors are automatically derived from the name via a hash function for consistent per-person coloring.

## Initials (Basic)

<ComponentDemo>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
    <PxAvatar name="Ana García" />
    <PxAvatar name="Luis Martínez" />
    <PxAvatar name="Sofia Kim" />
    <PxAvatar name="Carlos Rivera" />
  </div>

  <template #code>

```vue
<script setup>
import { PxAvatar } from 'px-vue-ui'
</script>

<template>
  <PxAvatar name="Ana García" />
  <PxAvatar name="Luis Martínez" />
</template>
```

  </template>
</ComponentDemo>

## Sizes

<ComponentDemo title="Sizes">
  <div style="display:flex;gap:1.25rem;align-items:flex-end">
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <PxAvatar name="Ana García" size="sm" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">sm</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <PxAvatar name="Luis Martínez" size="md" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">md</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <PxAvatar name="Sofia Kim" size="lg" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">lg</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <PxAvatar name="Carlos Rivera" size="xl" />
      <span style="font-size:0.7rem;color:var(--vp-c-text-2)">xl</span>
    </div>
  </div>

  <template #code>

```vue
<PxAvatar name="Ana García" size="sm" />
<PxAvatar name="Luis Martínez" size="md" />
<PxAvatar name="Sofia Kim" size="lg" />
<PxAvatar name="Carlos Rivera" size="xl" />
```

  </template>
</ComponentDemo>

## Square Shape

<ComponentDemo title="Square">
  <div style="display:flex;gap:1rem;align-items:center">
    <PxAvatar name="Ana García" shape="square" size="lg" />
    <PxAvatar name="Luis Martínez" shape="square" size="lg" />
    <PxAvatar name="Sofia Kim" shape="square" size="lg" />
  </div>

  <template #code>

```vue
<PxAvatar name="Ana García" shape="square" size="lg" />
```

  </template>
</ComponentDemo>

## With Footer Label

<ComponentDemo title="With Label">
  <div style="display:flex;gap:1.5rem;align-items:flex-start">
    <PxAvatar name="Ana García" size="xl" :label="true" />
    <PxAvatar name="Luis Martínez" size="xl" :label="true" />
    <PxAvatar name="Sofia Kim" size="xl" :label="true" />
  </div>

  <template #code>

```vue
<PxAvatar name="Ana García" size="xl" :label="true" />
```

  </template>
</ComponentDemo>

## Image Source

<ComponentDemo title="With Image">
  <div style="display:flex;gap:1rem;align-items:center">
    <PxAvatar
      name="Ana García"
      src="https://i.pravatar.cc/150?img=1"
      size="lg"
    />
    <PxAvatar
      name="Luis Martínez"
      src="https://i.pravatar.cc/150?img=12"
      size="lg"
    />
    <!-- Broken URL falls back to initials -->
    <PxAvatar
      name="Fallback User"
      src="https://example.invalid/image.jpg"
      size="lg"
    />
  </div>

  <template #code>

```vue
<PxAvatar
  name="Ana García"
  src="https://cdn.example.com/avatars/ana.jpg"
  size="lg"
/>
<!-- Broken URL falls back to initials automatically -->
```

  </template>
</ComponentDemo>

## Props

<div class="px-section-header">
  <span class="px-section-badge badge-props">Props</span>
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

`PxAvatar` and `PxInitialsAvatar` are kept for backward compatibility but internally delegate to `PxAvatar`. Migrate when convenient:

```diff
- import { PxAvatar } from 'px-vue-ui'
+ import { PxAvatar } from 'px-vue-ui'

- <PxAvatar :name="user.name" size="w-8 h-8" />
+ <PxAvatar :name="user.name" size="md" />
```
