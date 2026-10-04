import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import 'vue-select/dist/vue-select.css'
import '@praxis/px-src/styles/base.css'
import './style.css'

import ComponentDemo from './components/ComponentDemo.vue'
import PropsTable from './components/PropsTable.vue'
import EmitsTable from './components/EmitsTable.vue'
import SlotsTable from './components/SlotsTable.vue'
import ApiReference from './components/ApiReference.vue'
import ComponentsIndex from './components/ComponentsIndex.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import ThemeColorPicker from './components/ThemeColorPicker.vue'
import GitHubStarButton from './components/GitHubStarButton.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-after': () => h(HeroShowcase),
      'nav-bar-content-after': () => [h(ThemeColorPicker), h(GitHubStarButton)],
      'layout-bottom': () => [
        h(ReloadPrompt),
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
    app.component('ComponentsIndex', ComponentsIndex)
    app.component('HeroShowcase', HeroShowcase)
    app.component('ThemeColorPicker', ThemeColorPicker)
    app.component('GitHubStarButton', GitHubStarButton)
    enhanceAppWithTabs(app)
  },
} satisfies Theme
