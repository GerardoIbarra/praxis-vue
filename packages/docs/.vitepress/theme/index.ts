import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'vue-select/dist/vue-select.css'
import '@praxis/px-src/styles/base.css'
import './style.css'

import ComponentDemo from './components/ComponentDemo.vue'
import PropsTable from './components/PropsTable.vue'
import EmitsTable from './components/EmitsTable.vue'
import SlotsTable from './components/SlotsTable.vue'
import ApiReference from './components/ApiReference.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-after': () => h(HeroShowcase),
      'layout-bottom': () => [
        h(ReloadPrompt), 
        import.meta.env.PROD ? h(Analytics) : null,
        import.meta.env.PROD ? h(SpeedInsights) : null,
      ]
    })
  },
  enhanceApp({ app }) {
    // Register global doc components
    app.component('ComponentDemo', ComponentDemo)
    app.component('PropsTable', PropsTable)
    app.component('EmitsTable', EmitsTable)
    app.component('SlotsTable', SlotsTable)
    app.component('ApiReference', ApiReference)
    app.component('HeroShowcase', HeroShowcase)
  },
} satisfies Theme
