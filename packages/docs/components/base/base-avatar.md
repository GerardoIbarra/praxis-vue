<script setup>
import BaseAvatar from '@praxis/ui-src/components/base/BaseAvatar.vue'
</script>

# BaseAvatar

A circular avatar that derives initials from a full name string. Automatically assigns a consistent background color based on name hash — same name always gets the same color.

## Basic Usage

<ComponentDemo>
  <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap">
    <BaseAvatar name="Alice Johnson" />
    <BaseAvatar name="Bob Smith" />
    <BaseAvatar name="Dr. Carol Williams" />
    <BaseAvatar name="David Brown" />
    <BaseAvatar name="Eva Martinez" />
  </div>

  <template #code>

```vue
<BaseAvatar name="Alice Johnson" />
<BaseAvatar name="Bob Smith" />
<BaseAvatar name="Dr. Carol Williams" />
```

  </template>
</ComponentDemo>

## Custom Size

<ComponentDemo title="Custom Size">
  <div style="display:flex;gap:0.75rem;align-items:center">
    <BaseAvatar name="Alice Johnson" size="w-8 h-8" text-class="text-xs font-bold" />
    <BaseAvatar name="Alice Johnson" size="w-12 h-12" text-class="text-base font-bold" />
    <BaseAvatar name="Alice Johnson" size="w-16 h-16" text-class="text-2xl font-bold" />
  </div>

  <template #code>

```vue
<BaseAvatar name="Alice Johnson" size="w-12 h-12" text-class="text-lg font-bold" />
```

  </template>
</ComponentDemo>

## Props

<div class="praxis-section-header">
  <span class="praxis-section-badge badge-props">Props</span>
</div>

<PropsTable :rows="[
  { name: 'name', type: 'string | null', default: '\'User\'', description: 'Full name string. Derives initials (up to 2 chars). Strips common prefixes like Dr., Nurse, CFO.' },
  { name: 'size', type: 'string', default: '\'w-7 h-7\'', description: 'Tailwind width/height classes for the avatar circle.' },
  { name: 'textClass', type: 'string', default: '\'text-xs font-bold\'', description: 'Tailwind text classes applied to the initials text.' },
]" />

## Notes

- Color is deterministic: the same name always produces the same background color.
- Strips "Dr.", "Nurse", "CFO", and "Supervisor" prefixes before computing initials.
- Null or empty name renders "US" (from the "User" fallback).
