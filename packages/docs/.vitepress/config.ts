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
          { text: 'TimePicker', link: '/components/forms/time-picker' },
          { text: 'SelectableList', link: '/components/forms/selectable-list' },
          { text: 'CheckListField', link: '/components/forms/check-list-field' },
          { text: 'CheckListInputField', link: '/components/forms/check-list-input-field' },
          { text: 'SelectListField', link: '/components/forms/select-list-field' },
          { text: 'FormFieldRow', link: '/components/forms/form-field-row' },
          { text: 'FormMultiSelectList', link: '/components/forms/form-multi-select-list' },
          { text: 'InfiniteScrollSelect', link: '/components/forms/infinite-scroll-select' },
          { text: 'ModalInput', link: '/components/forms/modal-input' },
          { text: 'WeekDaysSelector', link: '/components/forms/week-days-selector' },
          { text: 'DynamicForm', link: '/components/forms/dynamic-form' },
        ],
      },
      {
        text: 'Base',
        collapsed: false,
        items: [
          { text: 'AvatarSelect', link: '/components/base/avatar-select' },
          { text: 'BaseAvatar', link: '/components/base/base-avatar' },
          { text: 'ColorPickerField', link: '/components/base/color-picker-field' },
          { text: 'ColorSelect', link: '/components/base/color-select' },
          { text: 'FullPageLoader', link: '/components/base/full-page-loader' },
          { text: 'GroupSelect', link: '/components/base/group-select' },
          { text: 'GroupedMultiSelect', link: '/components/base/grouped-multi-select' },
          { text: 'LazyLoadingSpinner', link: '/components/base/lazy-loading-spinner' },
          { text: 'PhoneNumber', link: '/components/base/phone-number' },
          { text: 'RequiredLabel', link: '/components/base/required-label' },
          { text: 'ThemeToggle', link: '/components/base/theme-toggle' },
        ],
      },
      {
        text: 'Navigation',
        collapsed: false,
        items: [
          { text: 'ActionMenu', link: '/components/navigation/action-menu' },
          { text: 'StepHeader', link: '/components/navigation/step-header' },
          { text: 'StepNavigation', link: '/components/navigation/step-navigation' },
          { text: 'TabComponent', link: '/components/navigation/tab-component' },
        ],
      },
      {
        text: 'Data Display',
        collapsed: false,
        items: [
          { text: 'BaseDataTable', link: '/components/data-display/base-data-table' },
          { text: 'BaseTree', link: '/components/data-display/base-tree' },
          { text: 'DisplayOptions', link: '/components/data-display/display-options' },
          { text: 'InitialsAvatar', link: '/components/data-display/initials-avatar' },
          { text: 'PdfViewer', link: '/components/data-display/pdf-viewer' },
        ],
      },
      {
        text: 'Layout',
        collapsed: false,
        items: [
          { text: 'DashboardCard', link: '/components/layout/dashboard-card' },
          { text: 'FormHeader', link: '/components/layout/form-header' },
          { text: 'PageHeader', link: '/components/layout/page-header' },
          { text: 'ListHeader', link: '/components/layout/list-header' },
          { text: 'ListViewWrapper', link: '/components/layout/list-view-wrapper' },
          { text: 'FormViewWrapper', link: '/components/layout/form-view-wrapper' },
          { text: 'CardFilterContainer', link: '/components/layout/card-filter-container' },
        ],
      },
      {
        text: 'Primitives',
        collapsed: true,
        items: [
          { text: 'PraxisAccordion', link: '/components/primitives/praxis-accordion' },
          { text: 'PraxisBadge', link: '/components/primitives/praxis-badge' },
          { text: 'PraxisCheckbox', link: '/components/primitives/praxis-checkbox' },
          { text: 'PraxisDialog', link: '/components/primitives/praxis-dialog' },
          { text: 'PraxisDrawer', link: '/components/primitives/praxis-drawer' },
          { text: 'PraxisRadioButton', link: '/components/primitives/praxis-radio-button' },
          { text: 'PraxisTimeline', link: '/components/primitives/praxis-timeline' },
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
