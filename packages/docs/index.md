---
layout: home

hero:
  name: 'Praxis Vue'
  text: 'Premium Vue 3 UI Library'
  tagline: A complete set of polished, accessible components for building modern applications — forms, data displays, navigation, layout, and more.
  actions:
    - theme: brand
      text: Get Started
      link: /components/forms/time-picker
    - theme: alt
      text: View on GitHub
      link: https://github.com/GerardoIbarra/praxis-vue

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'
    title: Beautiful by Default
    details: Every component ships with a refined design system — smooth transitions, dark mode support, and consistent visual language.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>'
    title: Vue 3 + TypeScript
    details: Built with Composition API and full TypeScript support. Fully typed props, emits, and slots. Autocomplete everywhere.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>'
    title: Accessible
    details: ARIA attributes, keyboard navigation, and semantic HTML out of the box.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
    title: Composable
    details: Each component is independently importable. Use what you need, tree-shake the rest.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
    title: Dark Mode Ready
    details: Every component respects light/dark mode. Works with Tailwind's dark class or your own CSS variables.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>'
    title: 40+ Components
    details: Forms, data tables, navigation, layout wrappers, overlays, avatars, pickers, and more — all production-ready.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --vp-home-hero-image-background-image: linear-gradient(135deg, #3b82f615 0%, #8b5cf615 100%);
  --vp-home-hero-image-filter: blur(44px);
}
</style>

## Quick Start

```bash
npm install px-vue-ui primevue @primevue/core vee-validate pinia
```

### Vue 3 Setup

```ts
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'px-vue-ui/dist/px-vue.css' // Import styles
import App from './App.vue'

createApp(App)
  .use(PrimeVue, { theme: { preset: Aura } })
  .mount('#app')
```

### Nuxt 3 Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'px-vue-ui/dist/px-vue.css', // Import styles globally
  ],
  build: {
    transpile: ['px-vue-ui'],
  },
})
```
