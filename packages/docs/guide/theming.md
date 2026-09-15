---
title: Theming
description: How to customize Praxis Vue's colors — CSS variables and the Tailwind preset.
---

# Theming

Praxis Vue is themed through two layers that work together: a small set of **CSS custom properties** consumed directly by the library's own stylesheet, and an optional **Tailwind preset** that maps a wider color scale onto those same variables. You don't need Tailwind to theme the library — the CSS variables alone cover every shipped component.

## CSS variables

`praxis-vue-ui/dist/praxis-vue.css` defines these variables on `:root`, with a `.dark` override block:

| Variable | Light default | Dark default | Used for |
|---|---|---|---|
| `--ui-bg` | `#ffffff` | `#1e293b` | Component backgrounds |
| `--ui-bg-soft` | `#f8fafc` | `#334155` | Hover states, disabled backgrounds, secondary surfaces |
| `--ui-border` | `#e2e8f0` | `#334155` | Borders on inputs, selects, cards |
| `--ui-text` | `#0f172a` | `#f1f5f9` | Primary text |
| `--ui-text-muted` | `#64748b` | `#94a3b8` | Secondary/hint text |
| `--ui-primary` | `#2563eb` | `#3b82f6` | Buttons, focus rings, active states |
| `--ui-primary-hover` | `#1d4ed8` | `#60a5fa` | Hover state of primary-colored elements |

To customize, redeclare any of these **after** importing the library's CSS:

```css
/* your own stylesheet, imported after praxis-vue-ui/dist/praxis-vue.css */
:root {
  --ui-primary: #7c3aed;
  --ui-primary-hover: #6d28d9;
}

.dark {
  --ui-primary: #a78bfa;
  --ui-primary-hover: #c4b5fd;
}
```

That's enough to re-color every component that ships with the library — buttons, inputs, the `vue-select` skin, focus rings, and so on all read from `--ui-primary`/`--ui-primary-hover`.

## Dark mode

The library doesn't watch `prefers-color-scheme` or manage dark mode state itself — it only reacts to a `.dark` class on an ancestor element (typically `<html>`). You own the toggle. [`PxThemeSwitch`](/components/base/px-theme-switch) is a controlled boolean input with no side effects; wire it to the class yourself:

```ts
watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
})
```

## Tailwind preset

If your app uses Tailwind, `praxis-vue-ui` ships a preset that adds `primary` and `surface` color scales (50–950):

```js
// tailwind.config.js
module.exports = {
  presets: [require('praxis-vue-ui/tailwind.preset.js')],
  // ...
}
```

This lets you use classes like `bg-primary-500` or `text-surface-700` in your own app, matching the library's palette.

::: warning Only part of the scale is wired to CSS variables
Of the 11 shades in each scale, only two are tied to the CSS variables from the table above:

- `primary-500` → `var(--ui-primary)`
- `primary-600` → `var(--ui-primary-hover)`

The rest of `primary-*` (50–400, 700–950) and **all** of `surface-*` fall back to a fixed default palette baked into the preset — changing `--ui-primary` will not shift `primary-50` or any `surface-*` shade. If you need the full scale to follow your brand color, define the corresponding variables yourself (e.g. `--ui-primary-700`, `--ui-surface-500`) — the preset reads them via `var(--ui-primary-700, <fallback>)`, so any variable you define takes over immediately.
:::

::: warning A few components use a separate, hardcoded accent
A handful of demos and components reference `text-p-primary` / `bg-p-primary` classes. `p-primary` is a **static** color (`rgba(59, 130, 246, 0.2)`) defined in the Tailwind preset — it is not derived from `--ui-primary` and will not change when you re-theme. This is a known inconsistency in the current preset rather than an intentional customization point.
:::

## What the docs site's color picker does

The palette switcher in this site's navbar (top right) only re-themes **this documentation site** — it sets VitePress's own `--vp-c-brand-*` variables plus a `--p-primary-*` scale used by a few interactive demos on this site. It does not change `--ui-primary`, so it isn't a live preview of how theming works inside your own app. Use the CSS variables and preset described above for that.
