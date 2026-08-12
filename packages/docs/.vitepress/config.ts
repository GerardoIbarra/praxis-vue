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
          { text: 'Ui Time Picker', link: '/components/forms/time-picker' },
          { text: 'Praxis Selectable List', link: '/components/forms/praxis-selectable-list' },
          { text: 'Praxis Checklist Field', link: '/components/forms/praxis-check-list-field' },
          { text: 'Praxis Checklist Input Field', link: '/components/forms/praxis-check-list-input-field' },
          { text: 'Praxis Select List Field', link: '/components/forms/praxis-select-list-field' },
          { text: 'Praxis Form Field Row', link: '/components/forms/praxis-form-field-row' },
          { text: 'Praxis Multi Select List', link: '/components/forms/praxis-form-multi-select-list' },
          { text: 'Praxis Infinite Scroll Select', link: '/components/forms/praxis-infinite-scroll-select' },
          { text: 'Praxis Modal Input', link: '/components/forms/praxis-modal-input' },
          { text: 'Praxis Week Days Selector', link: '/components/forms/praxis-week-days-selector' },
          { text: 'Praxis Dynamic Form', link: '/components/forms/praxis-dynamic-form' },
        ],
      },
      {
        text: 'Base',
        collapsed: false,
        items: [
          { text: 'Ui Avatar', link: '/components/base/ui-avatar' },
          { text: 'Ui Label', link: '/components/base/ui-label' },
          { text: 'Praxis Color Picker', link: '/components/base/praxis-color-picker-field' },
          { text: 'Praxis Visual Select', link: '/components/base/praxis-visual-select' },
          { text: 'Praxis Full Page Loader', link: '/components/base/praxis-full-page-loader' },
          { text: 'Praxis Grouped Multi Select', link: '/components/base/praxis-grouped-multi-select' },
          { text: 'Praxis Lazy Loading Spinner', link: '/components/base/praxis-lazy-loading-spinner' },
          { text: 'Praxis Phone Number', link: '/components/base/praxis-phone-number' },
          { text: 'Praxis Theme Toggle', link: '/components/base/praxis-theme-toggle' },
        ],
      },
      {
        text: 'Navigation',
        collapsed: false,
        items: [
          { text: 'Praxis Action Menu', link: '/components/navigation/praxis-action-menu' },
          { text: 'Praxis Step Header', link: '/components/navigation/praxis-step-header' },
          { text: 'Praxis Step Navigation', link: '/components/navigation/praxis-step-navigation' },
          { text: 'Praxis Tab', link: '/components/navigation/praxis-tab-component' },
          { text: 'Praxis Nav List', link: '/components/navigation/praxis-nav-list' },
        ],
      },
      {
        text: 'Data Display',
        collapsed: false,
        items: [
          { text: 'Base Data Table', link: '/components/data-display/base-data-table' },
          { text: 'Base Tree', link: '/components/data-display/base-tree' },
          { text: 'Praxis Display Options', link: '/components/data-display/praxis-display-options' },
          { text: 'Praxis PDF Viewer', link: '/components/data-display/praxis-pdf-viewer' },
        ],
      },
      {
        text: 'Layout',
        collapsed: false,
        items: [
          { text: 'Praxis Dashboard Card', link: '/components/layout/praxis-dashboard-card' },
          { text: 'Praxis Header', link: '/components/layout/praxis-header' },
          { text: 'Praxis List View', link: '/components/layout/praxis-list-view-wrapper' },
          { text: 'Praxis Form View', link: '/components/layout/praxis-form-view-wrapper' },
          { text: 'Praxis Card Filter', link: '/components/layout/praxis-card-filter-container' },
        ],
      },
      {
        text: 'Primitives',
        collapsed: true,
        items: [
          { text: 'Ui Accordion', link: '/components/primitives/ui-accordion' },
          { text: 'Ui Badge', link: '/components/primitives/ui-badge' },
          { text: 'Ui Checkbox', link: '/components/primitives/ui-checkbox' },
          { text: 'Ui Dialog', link: '/components/primitives/ui-dialog' },
          { text: 'Ui Drawer', link: '/components/primitives/ui-drawer' },
          { text: 'Ui Radio Button', link: '/components/primitives/ui-radio-button' },
          { text: 'Ui Timeline', link: '/components/primitives/ui-timeline' },
        ],
      },
      {
        text: 'Editor',
        collapsed: false,
        items: [
          { text: 'Praxis Editor', link: '/components/editor/praxis-editor' },
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
