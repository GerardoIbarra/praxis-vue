<script setup>
import { ref } from 'vue'
import PxAvatar from '@praxis/px-src/components/base/PxAvatar.vue'

const demoName = ref('Luis Kern')
const demoSize = ref('lg')
const demoShape = ref('circle')
const demoLabel = ref(true)
</script>

# Avatar

A unified avatar component that displays a person's initials or photo. Colors are automatically derived from the name via a hash function for consistent per-person coloring.

## Interactive Playground

<ComponentDemo title="Playground" badge="Interactive" background="dots">
  <template #controls>
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;width:100%">
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-size:0.75rem;font-weight:600;color:var(--vp-c-text-2)">Size:</span>
        <div style="display:inline-flex;padding:2px;background:var(--vp-c-bg-mute);border-radius:6px">
          <button
            v-for="s in ['sm', 'md', 'lg', 'xl']"
            :key="s"
            style="padding:2px 8px;font-size:0.75rem;border-radius:4px;border:none;cursor:pointer;transition:all 0.15s"
            :style="demoSize === s ? 'background:var(--vp-c-brand-1);color:#fff;font-weight:600' : 'background:transparent;color:var(--vp-c-text-2)'"
            @click="demoSize = s"
          >{{ s }}</button>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-size:0.75rem;font-weight:600;color:var(--vp-c-text-2)">Shape:</span>
        <div style="display:inline-flex;padding:2px;background:var(--vp-c-bg-mute);border-radius:6px">
          <button
            v-for="sh in ['circle', 'square']"
            :key="sh"
            style="padding:2px 8px;font-size:0.75rem;border-radius:4px;border:none;cursor:pointer;transition:all 0.15s"
            :style="demoShape === sh ? 'background:var(--vp-c-brand-1);color:#fff;font-weight:600' : 'background:transparent;color:var(--vp-c-text-2)'"
            @click="demoShape = sh"
          >{{ sh }}</button>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:0.4rem;cursor:pointer;font-size:0.75rem;color:var(--vp-c-text-1)">
        <input type="checkbox" v-model="demoLabel" style="accent-color:var(--vp-c-brand-1)" />
        Show footer label
      </label>
    </div>
  </template>
  <template #default>
    <PxAvatar
      :name="demoName"
      :size="demoSize"
      :shape="demoShape"
      :label="demoLabel"
    />
  </template>

  <template #code>

```vue
<PxAvatar
  name="Luis Kern"
  :size="demoSize"
  :shape="demoShape"
  :label="demoLabel"
/>
```

  </template>
</ComponentDemo>

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
import { PxAvatar } from 'praxis-vue-ui'
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

## API Reference

<ApiReference component="PxAvatar" />

## Deprecated Components

`PxAvatar` and `PxInitialsAvatar` are kept for backward compatibility but internally delegate to `PxAvatar`. Migrate when convenient:

```diff
- import { PxAvatar } from 'praxis-vue-ui'
+ import { PxAvatar } from 'praxis-vue-ui'

- <PxAvatar :name="user.name" size="w-8 h-8" />
+ <PxAvatar :name="user.name" size="md" />
```
