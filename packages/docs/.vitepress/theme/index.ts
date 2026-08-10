// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

import ComponentDemo from './components/ComponentDemo.vue'
import PropsTable from './components/PropsTable.vue'
import EmitsTable from './components/EmitsTable.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global doc components
    app.component('ComponentDemo', ComponentDemo)
    app.component('PropsTable', PropsTable)
    app.component('EmitsTable', EmitsTable)
  },
} satisfies Theme
