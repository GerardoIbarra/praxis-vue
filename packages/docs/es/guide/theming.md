---
title: Theming
description: Cómo personalizar los colores de Praxis Vue — variables CSS y el preset de Tailwind.
---

# Theming

Praxis Vue se personaliza a través de dos capas que trabajan juntas: un pequeño conjunto de **variables CSS personalizadas** que consume directamente la hoja de estilos de la librería, y un **preset de Tailwind** opcional que mapea una escala de colores más amplia sobre esas mismas variables. No necesitas Tailwind para personalizar la librería — las variables CSS por sí solas cubren todos los componentes que se distribuyen.

## Variables CSS

`praxis-vue-ui/dist/praxis-vue.css` define estas variables en `:root`, con un bloque de override en `.dark`:

| Variable | Valor por defecto (claro) | Valor por defecto (oscuro) | Se usa para |
|---|---|---|---|
| `--ui-bg` | `#ffffff` | `#1e293b` | Fondos de los componentes |
| `--ui-bg-soft` | `#f8fafc` | `#334155` | Estados hover, fondos deshabilitados, superficies secundarias |
| `--ui-border` | `#e2e8f0` | `#334155` | Bordes de inputs, selects, cards |
| `--ui-text` | `#0f172a` | `#f1f5f9` | Texto principal |
| `--ui-text-muted` | `#64748b` | `#94a3b8` | Texto secundario / de ayuda |
| `--ui-primary` | `#2563eb` | `#3b82f6` | Botones, anillos de foco, estados activos |
| `--ui-primary-hover` | `#1d4ed8` | `#60a5fa` | Estado hover de elementos con el color primario |

Para personalizar, redeclara cualquiera de estas variables **después** de importar el CSS de la librería:

```css
/* tu propia hoja de estilos, importada después de praxis-vue-ui/dist/praxis-vue.css */
:root {
  --ui-primary: #7c3aed;
  --ui-primary-hover: #6d28d9;
}

.dark {
  --ui-primary: #a78bfa;
  --ui-primary-hover: #c4b5fd;
}
```

Con eso alcanza para recolorear todos los componentes que vienen con la librería — botones, inputs, el skin de `vue-select`, anillos de foco, etc., todos leen de `--ui-primary`/`--ui-primary-hover`.

## Modo oscuro

La librería no observa `prefers-color-scheme` ni administra el estado del modo oscuro por sí misma — solo reacciona a una clase `.dark` en un elemento ancestro (normalmente `<html>`). El toggle lo controlas tú. [`PxThemeSwitch`](/es/components/base/px-theme-switch) es un input booleano controlado sin efectos secundarios; conéctalo a la clase tú mismo:

```ts
watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
})
```

## Preset de Tailwind

Si tu app usa Tailwind, `praxis-vue-ui` distribuye un preset que agrega escalas de color `primary` y `surface` (50–950):

```js
// tailwind.config.js
module.exports = {
  presets: [require('praxis-vue-ui/tailwind.preset.js')],
  // ...
}
```

Esto te permite usar clases como `bg-primary-500` o `text-surface-700` en tu propia app, alineadas con la paleta de la librería.

::: warning Solo parte de la escala está conectada a variables CSS
De los 11 tonos de cada escala, solo dos están ligados a las variables CSS de la tabla de arriba:

- `primary-500` → `var(--ui-primary)`
- `primary-600` → `var(--ui-primary-hover)`

El resto de `primary-*` (50–400, 700–950) y **toda** la escala `surface-*` caen a una paleta fija por defecto que viene incluida en el preset — cambiar `--ui-primary` no moverá `primary-50` ni ningún tono de `surface-*`. Si necesitas que toda la escala siga tu color de marca, define tú mismo las variables correspondientes (ej. `--ui-primary-700`, `--ui-surface-500`) — el preset las lee vía `var(--ui-primary-700, <fallback>)`, así que cualquier variable que definas toma efecto de inmediato.
:::

::: warning Algunos componentes usan un acento aparte, hardcodeado
Algunas demos y componentes referencian clases `text-p-primary` / `bg-p-primary`. `p-primary` es un color **estático** (`rgba(59, 130, 246, 0.2)`) definido en el preset de Tailwind — no se deriva de `--ui-primary` y no cambiará cuando personalices el tema. Es una inconsistencia conocida del preset actual, no un punto de personalización intencional.
:::

## Qué hace el selector de color del sitio de docs

El selector de paleta en la barra de navegación de este sitio (arriba a la derecha) solo re-tematiza **este sitio de documentación** — configura las variables propias de VitePress `--vp-c-brand-*` más una escala `--p-primary-*` que usan algunas demos interactivas de este sitio. No cambia `--ui-primary`, así que no es una vista previa en vivo de cómo funciona el theming dentro de tu propia app. Usa las variables CSS y el preset descritos arriba para eso.
