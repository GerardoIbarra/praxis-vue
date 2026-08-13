import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'

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

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Praxis Vue',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/forms/time-picker' },
      { text: 'GitHub', link: 'https://github.com/GerardoIbarra/px-vue' },
    ],

    sidebar: [
      {
        text: 'Forms',
        collapsed: false,
        items: [
          { text: 'Ui Time Picker', link: '/components/forms/time-picker' },
          { text: 'Praxis Table Select', link: '/components/forms/px-grid-select' },
          { text: 'Praxis Checklist', link: '/components/forms/px-state-checklist' },
          { text: 'Praxis Form Field Row', link: '/components/forms/px-form-row' },
          { text: 'Praxis Dynamic Multi Select', link: '/components/forms/px-schema-multi-select' },
          { text: 'Praxis Infinite Scroll Select', link: '/components/forms/px-async-select' },
          { text: 'Praxis Modal Input', link: '/components/forms/px-dialog-input' },
          { text: 'Praxis Week Days Selector', link: '/components/forms/px-day-picker' },
          { text: 'Praxis Dynamic Form', link: '/components/forms/px-schema-form' },
        ],
      },
      {
        text: 'Base',
        collapsed: false,
        items: [
          { text: 'Ui Avatar', link: '/components/base/px-avatar' },
          { text: 'Ui Label', link: '/components/base/px-label' },
          { text: 'Praxis Color Picker', link: '/components/base/px-color-picker-field' },
          { text: 'Praxis Visual Select', link: '/components/base/px-visual-select' },
          { text: 'Praxis Grouped Multi Select', link: '/components/base/px-categorized-select' },
          { text: 'Praxis Loader', link: '/components/base/px-loader' },
          { text: 'Praxis Phone Number', link: '/components/base/px-phone-input' },
          { text: 'Praxis Theme Toggle', link: '/components/base/px-theme-toggle' },
        ],
      },
      {
        text: 'Navigation',
        collapsed: false,
        items: [
          { text: 'Praxis Action Menu', link: '/components/navigation/px-action-menu' },
          { text: 'Praxis Step Header', link: '/components/navigation/px-step-header' },
          { text: 'Praxis Step Navigation', link: '/components/navigation/px-step-navigation' },
          { text: 'Praxis Tab', link: '/components/navigation/px-tab-component' },
          { text: 'Praxis Nav List', link: '/components/navigation/px-nav-list' },
        ],
      },
      {
        text: 'Data Display',
        collapsed: false,
        items: [
          { text: 'Praxis Data Table', link: '/components/data-display/px-data-table' },
          { text: 'Praxis Tree', link: '/components/data-display/px-tree' },
          { text: 'Praxis Display Options', link: '/components/data-display/px-display-options' },
          { text: 'Praxis PDF Viewer', link: '/components/data-display/px-pdf-viewer' },
        ],
      },
      {
        text: 'Layout',
        collapsed: false,
        items: [
          { text: 'Praxis Dashboard Card', link: '/components/layout/px-dashboard-card' },
          { text: 'Praxis Header', link: '/components/layout/px-header' },
          { text: 'Praxis List View', link: '/components/layout/px-list-view-wrapper' },
          { text: 'Praxis Form View', link: '/components/layout/px-form-view-wrapper' },
          { text: 'Praxis Card Filter', link: '/components/layout/px-card-filter-container' },
        ],
      },
      {
        text: 'Primitives',
        collapsed: true,
        items: [
          { text: 'Ui Accordion', link: '/components/primitives/px-accordion' },
          { text: 'Ui Badge', link: '/components/primitives/px-badge' },
          { text: 'Ui Checkbox', link: '/components/primitives/px-checkbox' },
          { text: 'Ui Dialog', link: '/components/primitives/px-dialog' },
          { text: 'Ui Drawer', link: '/components/primitives/px-drawer' },
          { text: 'Ui Radio Button', link: '/components/primitives/px-radio-button' },
          { text: 'Ui Timeline', link: '/components/primitives/px-timeline' },
        ],
      },
      {
        text: 'Editor',
        collapsed: false,
        items: [
          { text: 'Praxis Editor', link: '/components/editor/px-editor' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GerardoIbarra/px-vue' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2024 Praxis',
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
