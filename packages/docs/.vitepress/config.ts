import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'

const sidebar = [
  {
    text: 'Cookbook (Recipes)',
    collapsed: false,
    items: [
      { text: 'Remote Data Table with Filters', link: '/cookbook/data-table-remote' },
      { text: 'Multi-Step Wizard with Zod', link: '/cookbook/zod-wizard' },
    ],
  },
  {
    text: 'Forms',
    collapsed: false,
    items: [
      { text: 'Px Time Picker', link: '/components/forms/time-picker' },
      { text: 'Px Grid Select', link: '/components/forms/px-grid-select' },
      { text: 'Px State Checklist', link: '/components/forms/px-state-checklist' },
      { text: 'Px Form Row', link: '/components/forms/px-form-row' },
      { text: 'Px Schema Multi Select', link: '/components/forms/px-schema-multi-select' },
      { text: 'Px Async Select', link: '/components/forms/px-async-select' },
      { text: 'Px Dialog Input', link: '/components/forms/px-dialog-input' },
      { text: 'Px Day Picker', link: '/components/forms/px-day-picker' },
      { text: 'Px Schema Form', link: '/components/forms/px-schema-form' },
      { text: 'Px Form Wizard', link: '/components/forms/px-form-wizard' },
    ],
  },
  {
    text: 'Base',
    collapsed: false,
    items: [
      { text: 'Px Avatar', link: '/components/base/px-avatar' },
      { text: 'Px Label', link: '/components/base/px-label' },
      { text: 'Px Color Input', link: '/components/base/px-color-input' },
      { text: 'Px Visual Select', link: '/components/base/px-visual-select' },
      { text: 'Px Categorized Select', link: '/components/base/px-categorized-select' },
      { text: 'Px Loader', link: '/components/base/px-loader' },
      { text: 'Px Phone Input', link: '/components/base/px-phone-input' },
      { text: 'Px Theme Switch', link: '/components/base/px-theme-switch' },
    ],
  },
  {
    text: 'Navigation',
    collapsed: false,
    items: [
      { text: 'Px Dropdown Menu', link: '/components/navigation/px-dropdown-menu' },
      { text: 'Px Stepper Header', link: '/components/navigation/px-stepper-header' },
      { text: 'Px Stepper', link: '/components/navigation/px-stepper' },
      { text: 'Px Tabs', link: '/components/navigation/px-tabs' },
      { text: 'Px Nav List', link: '/components/navigation/px-nav-list' },
    ],
  },
  {
    text: 'Data Display',
    collapsed: false,
    items: [
      { text: 'Px Data Table', link: '/components/data-display/px-data-table' },
      { text: 'Px Tree', link: '/components/data-display/px-tree' },
      { text: 'Px Display Options', link: '/components/data-display/px-display-options' },
      { text: 'Px Document Viewer', link: '/components/data-display/px-document-viewer' },
      { text: 'Px Table Skeleton', link: '/components/data-display/px-table-skeleton' },
    ],
  },
  {
    text: 'Layout',
    collapsed: false,
    items: [
      { text: 'Px Card', link: '/components/layout/px-card' },
      { text: 'Px Header', link: '/components/layout/px-header' },
      { text: 'Px List Layout', link: '/components/layout/px-list-layout' },
      { text: 'Px Form Layout', link: '/components/layout/px-form-layout' },
      { text: 'Px Filter Bar', link: '/components/layout/px-filter-bar' },
    ],
  },
  {
    text: 'Primitives',
    collapsed: true,
    items: [
      { text: 'Px Accordion', link: '/components/primitives/px-accordion' },
      { text: 'Px Badge', link: '/components/primitives/px-badge' },
      { text: 'Px Checkbox', link: '/components/primitives/px-checkbox' },
      { text: 'Px Dialog', link: '/components/primitives/px-dialog' },
      { text: 'Px Drawer', link: '/components/primitives/px-drawer' },
      { text: 'Px Radio Button', link: '/components/primitives/px-radio-button' },
      { text: 'Px Select', link: '/components/primitives/px-select' },
      { text: 'Px Timeline', link: '/components/primitives/px-timeline' },
      { text: 'Px Toast', link: '/components/primitives/px-toast' },
    ],
  },
  {
    text: 'Overlays',
    collapsed: false,
    items: [
      { text: 'Px Command Palette', link: '/components/overlays/px-command-palette' },
    ],
  },
  {
    text: 'Editor',
    collapsed: false,
    items: [
      { text: 'Px Editor', link: '/components/editor/px-editor' },
    ],
  },
]

const sidebarEs = [
  {
    text: 'Cookbook (Recetas)',
    collapsed: false,
    items: [
      { text: 'Data Table Remota con Filtros', link: '/es/cookbook/data-table-remote' },
      { text: 'Multi-Step Wizard con Zod', link: '/es/cookbook/zod-wizard' },
    ],
  },
  {
    text: 'Formularios',
    collapsed: false,
    items: [
      { text: 'Px Time Picker', link: '/es/components/forms/time-picker' },
      { text: 'Px Grid Select', link: '/es/components/forms/px-grid-select' },
      { text: 'Px State Checklist', link: '/es/components/forms/px-state-checklist' },
      { text: 'Px Form Row', link: '/es/components/forms/px-form-row' },
      { text: 'Px Schema Multi Select', link: '/es/components/forms/px-schema-multi-select' },
      { text: 'Px Async Select', link: '/es/components/forms/px-async-select' },
      { text: 'Px Dialog Input', link: '/es/components/forms/px-dialog-input' },
      { text: 'Px Day Picker', link: '/es/components/forms/px-day-picker' },
      { text: 'Px Schema Form', link: '/es/components/forms/px-schema-form' },
      { text: 'Px Form Wizard', link: '/es/components/forms/px-form-wizard' },
    ],
  },
  {
    text: 'Básicos',
    collapsed: false,
    items: [
      { text: 'Px Avatar', link: '/es/components/base/px-avatar' },
      { text: 'Px Label', link: '/es/components/base/px-label' },
      { text: 'Px Color Input', link: '/es/components/base/px-color-input' },
      { text: 'Px Visual Select', link: '/es/components/base/px-visual-select' },
      { text: 'Px Categorized Select', link: '/es/components/base/px-categorized-select' },
      { text: 'Px Loader', link: '/es/components/base/px-loader' },
      { text: 'Px Phone Input', link: '/es/components/base/px-phone-input' },
      { text: 'Px Theme Switch', link: '/es/components/base/px-theme-switch' },
    ],
  },
  {
    text: 'Navegación',
    collapsed: false,
    items: [
      { text: 'Px Dropdown Menu', link: '/es/components/navigation/px-dropdown-menu' },
      { text: 'Px Stepper Header', link: '/es/components/navigation/px-stepper-header' },
      { text: 'Px Stepper', link: '/es/components/navigation/px-stepper' },
      { text: 'Px Tabs', link: '/es/components/navigation/px-tabs' },
      { text: 'Px Nav List', link: '/es/components/navigation/px-nav-list' },
    ],
  },
  {
    text: 'Visualización de Datos',
    collapsed: false,
    items: [
      { text: 'Px Data Table', link: '/es/components/data-display/px-data-table' },
      { text: 'Px Tree', link: '/es/components/data-display/px-tree' },
      { text: 'Px Display Options', link: '/es/components/data-display/px-display-options' },
      { text: 'Px Document Viewer', link: '/es/components/data-display/px-document-viewer' },
      { text: 'Px Table Skeleton', link: '/es/components/data-display/px-table-skeleton' },
    ],
  },
  {
    text: 'Estructura y Layout',
    collapsed: false,
    items: [
      { text: 'Px Card', link: '/es/components/layout/px-card' },
      { text: 'Px Header', link: '/es/components/layout/px-header' },
      { text: 'Px List Layout', link: '/es/components/layout/px-list-layout' },
      { text: 'Px Form Layout', link: '/es/components/layout/px-form-layout' },
      { text: 'Px Filter Bar', link: '/es/components/layout/px-filter-bar' },
    ],
  },
  {
    text: 'Primitivos',
    collapsed: true,
    items: [
      { text: 'Px Accordion', link: '/es/components/primitives/px-accordion' },
      { text: 'Px Badge', link: '/es/components/primitives/px-badge' },
      { text: 'Px Checkbox', link: '/es/components/primitives/px-checkbox' },
      { text: 'Px Dialog', link: '/es/components/primitives/px-dialog' },
      { text: 'Px Drawer', link: '/es/components/primitives/px-drawer' },
      { text: 'Px Radio Button', link: '/es/components/primitives/px-radio-button' },
      { text: 'Px Select', link: '/es/components/primitives/px-select' },
      { text: 'Px Timeline', link: '/es/components/primitives/px-timeline' },
      { text: 'Px Toast', link: '/es/components/primitives/px-toast' },
    ],
  },
  {
    text: 'Superposiciones',
    collapsed: false,
    items: [
      { text: 'Px Command Palette', link: '/es/components/overlays/px-command-palette' },
    ],
  },
  {
    text: 'Editor',
    collapsed: false,
    items: [
      { text: 'Px Editor', link: '/es/components/editor/px-editor' },
    ],
  },
]

export default withPwa(defineConfig({
  pwa: {
    outDir: '.vitepress/dist',
    registerType: 'prompt',
    manifest: {
      name: 'Praxis Vue',
      short_name: 'Praxis',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo.svg',
          sizes: 'any',
          type: 'image/svg+xml'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      runtimeCaching: []
    }
  },
  title: 'Praxis Vue',
  description: 'A premium Vue 3 UI component library — forms, data-display, layout, navigation, and more.',
  sitemap: {
    hostname: 'https://px-vue.dev'
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Componentes', link: '/es/components/forms/time-picker' },
          { text: 'Cookbook', link: '/es/cookbook/data-table-remote' },
        ],
        sidebar: sidebarEs,
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Praxis Vue',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/forms/time-picker' },
      { text: 'Cookbook', link: '/cookbook/data-table-remote' },
      { text: 'GitHub', link: 'https://github.com/GerardoIbarra/praxis-vue' },
    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GerardoIbarra/praxis-vue' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/praxis-vue-ui' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Praxis',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@praxis/px-src': resolve(__dirname, '../../ui/src'),
        '@': resolve(__dirname, '../../ui/src'),
      },
    },
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
    },
    css: {
      preprocessorOptions: {},
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
}))
