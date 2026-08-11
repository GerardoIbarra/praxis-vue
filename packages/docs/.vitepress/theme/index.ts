import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

import ComponentDemo from './components/ComponentDemo.vue'
import PropsTable from './components/PropsTable.vue'
import EmitsTable from './components/EmitsTable.vue'
import SlotsTable from './components/SlotsTable.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import { Analytics } from '@vercel/analytics/vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [h(ReloadPrompt), h(Analytics)]
    })
  },
  enhanceApp({ app }) {
    // Register global doc components
    app.component('ComponentDemo', ComponentDemo)
    app.component('PropsTable', PropsTable)
    app.component('EmitsTable', EmitsTable)
    app.component('SlotsTable', SlotsTable)
  },
} satisfies Theme
