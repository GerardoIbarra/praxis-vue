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
    hostname: 'https://praxis-vue.dev'
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
      { text: 'GitHub', link: 'https://github.com/GerardoIbarra/praxis-vue' },
    ],

    sidebar: [
      {
        text: 'Forms',
        collapsed: false,
        items: [
          { text: 'Time Picker', link: '/components/forms/time-picker' },
          { text: 'Selectable List', link: '/components/forms/selectable-list' },
          { text: 'Checklist Field', link: '/components/forms/check-list-field' },
          { text: 'Checklist Input Field', link: '/components/forms/check-list-input-field' },
          { text: 'Select List Field', link: '/components/forms/select-list-field' },
          { text: 'Form Field Row', link: '/components/forms/form-field-row' },
          { text: 'Multi Select List', link: '/components/forms/form-multi-select-list' },
          { text: 'Infinite Scroll Select', link: '/components/forms/infinite-scroll-select' },
          { text: 'Modal Input', link: '/components/forms/modal-input' },
          { text: 'Week Days Selector', link: '/components/forms/week-days-selector' },
          { text: 'Dynamic Form', link: '/components/forms/dynamic-form' },
        ],
      },
      {
        text: 'Base',
        collapsed: false,
        items: [
          { text: 'Avatar', link: '/components/base/avatar' },
          { text: 'Label', link: '/components/base/label' },
          { text: 'Color Picker', link: '/components/base/color-picker-field' },
          { text: 'Color Select', link: '/components/base/color-select' },
          { text: 'Full Page Loader', link: '/components/base/full-page-loader' },
          { text: 'Group Select', link: '/components/base/group-select' },
          { text: 'Grouped Multi Select', link: '/components/base/grouped-multi-select' },
          { text: 'Lazy Loading Spinner', link: '/components/base/lazy-loading-spinner' },
          { text: 'Phone Number', link: '/components/base/phone-number' },
          { text: 'Theme Toggle', link: '/components/base/theme-toggle' },
        ],
      },
      {
        text: 'Navigation',
        collapsed: false,
        items: [
          { text: 'Action Menu', link: '/components/navigation/action-menu' },
          { text: 'Step Header', link: '/components/navigation/step-header' },
          { text: 'Step Navigation', link: '/components/navigation/step-navigation' },
          { text: 'Tab', link: '/components/navigation/tab-component' },
        ],
      },
      {
        text: 'Data Display',
        collapsed: false,
        items: [
          { text: 'Data Table', link: '/components/data-display/base-data-table' },
          { text: 'Tree', link: '/components/data-display/base-tree' },
          { text: 'Display Options', link: '/components/data-display/display-options' },
          { text: 'PDF Viewer', link: '/components/data-display/pdf-viewer' },
        ],
      },
      {
        text: 'Layout',
        collapsed: false,
        items: [
          { text: 'Dashboard Card', link: '/components/layout/dashboard-card' },
          { text: 'Form Header', link: '/components/layout/form-header' },
          { text: 'Page Header', link: '/components/layout/page-header' },
          { text: 'List Header', link: '/components/layout/list-header' },
          { text: 'List View', link: '/components/layout/list-view-wrapper' },
          { text: 'Form View', link: '/components/layout/form-view-wrapper' },
          { text: 'Card Filter', link: '/components/layout/card-filter-container' },
        ],
      },
      {
        text: 'Primitives',
        collapsed: true,
        items: [
          { text: 'Accordion', link: '/components/primitives/praxis-accordion' },
          { text: 'Badge', link: '/components/primitives/praxis-badge' },
          { text: 'Checkbox', link: '/components/primitives/praxis-checkbox' },
          { text: 'Dialog', link: '/components/primitives/praxis-dialog' },
          { text: 'Drawer', link: '/components/primitives/praxis-drawer' },
          { text: 'Radio Button', link: '/components/primitives/praxis-radio-button' },
          { text: 'Timeline', link: '/components/primitives/praxis-timeline' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GerardoIbarra/praxis-vue' },
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
        '@praxis/ui-src': resolve(__dirname, '../../ui/src'),
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
