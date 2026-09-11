<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  badge?: string
  background?: 'dots' | 'grid' | 'plain'
  overflow?: 'visible' | 'hidden'
  defaultOpenCode?: boolean
}>(), {
  title: 'Demo',
  background: 'dots',
  overflow: 'visible',
  defaultOpenCode: false,
})

const showCode = ref(props.defaultOpenCode)
const copied = ref(false)
const openingStackBlitz = ref(false)
const codeContainer = ref<HTMLElement | null>(null)

const toggleCode = () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  const codeEl = codeContainer.value?.querySelector('code')
  if (!codeEl) return
  try {
    await navigator.clipboard.writeText(codeEl.textContent || '')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (_) {
    // clipboard not available
  }
}

const openStackBlitz = async () => {
  const rawCode = codeContainer.value?.querySelector('code')?.textContent || ''
  if (!rawCode) return

  openingStackBlitz.value = true
  try {
    const { default: sdk } = await import('@stackblitz/sdk')

    let appContent = rawCode.trim()
    if (!appContent.includes('<template>')) {
      appContent = `<script setup>\nimport { ref } from 'vue'\nimport 'praxis-vue-ui/dist/praxis-vue.css'\n</` + `script>\n\n<template>\n  <div style="padding: 2.5rem; display: flex; justify-content: center; align-items: center; min-height: 100vh;">\n    ${appContent}\n  </div>\n</template>`
    }

    sdk.openProject(
      {
        title: `Praxis Vue - ${props.title}`,
        description: `Live interactive playground for ${props.title}`,
        template: 'node',
        files: {
          'package.json': JSON.stringify(
            {
              name: 'praxis-vue-playground',
              private: true,
              version: '0.0.0',
              type: 'module',
              scripts: {
                dev: 'vite',
                build: 'vite build',
              },
              dependencies: {
                vue: '^3.5.0',
                'praxis-vue-ui': 'latest',
                primevue: '^4.0.0',
                '@primeuix/themes': 'latest',
                '@lucide/vue': 'latest',
              },
              devDependencies: {
                vite: '^5.4.0',
                '@vitejs/plugin-vue': '^5.1.0',
              },
            },
            null,
            2
          ),
          'vite.config.js': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})`,
          'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Praxis Vue - ${props.title}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></` + `script>
  </body>
</html>`,
          'src/main.js': `import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'praxis-vue-ui/dist/praxis-vue.css'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.mount('#app')`,
          'src/App.vue': appContent,
        },
      },
      {
        openFile: 'src/App.vue',
      }
    )
  } catch (err) {
    console.error('Failed to open StackBlitz:', err)
  } finally {
    openingStackBlitz.value = false
  }
}
</script>

<template>
  <div class="praxis-demo-card" :class="[overflow === 'hidden' ? 'praxis-demo-overflow-hidden' : '']">
    <div class="praxis-demo-header">
      <div class="praxis-demo-header-left">
        <span class="praxis-demo-header-title">{{ title }}</span>
        <span v-if="badge" class="praxis-demo-badge">{{ badge }}</span>
      </div>

      <div class="praxis-demo-header-actions">
        <!-- StackBlitz Button (visible when code slot exists) -->
        <button
          v-if="$slots.code"
          class="praxis-demo-btn praxis-demo-btn-stackblitz"
          :disabled="openingStackBlitz"
          title="Open in StackBlitz cloud sandbox"
          @click="openStackBlitz"
        >
          <svg class="praxis-demo-btn-icon text-amber-500" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>{{ openingStackBlitz ? 'Loading...' : 'StackBlitz' }}</span>
        </button>

        <!-- Copy Button (visible when code slot exists) -->
        <button
          v-if="$slots.code"
          class="praxis-demo-btn"
          :class="{ 'is-copied': copied }"
          :title="copied ? 'Code copied to clipboard!' : 'Copy code to clipboard'"
          @click="copyCode"
        >
          <svg v-if="!copied" class="praxis-demo-btn-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg v-else class="praxis-demo-btn-icon is-success" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>

        <!-- View / Hide Code Toggle -->
        <button
          v-if="$slots.code"
          class="praxis-demo-btn praxis-demo-code-toggle"
          :class="{ 'is-active': showCode }"
          :title="showCode ? 'Hide source code' : 'View source code'"
          @click="toggleCode"
        >
          <svg class="praxis-demo-btn-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span>{{ showCode ? 'Hide Code' : 'View Code' }}</span>
          <svg
            class="praxis-demo-chevron"
            :class="{ 'rotate-180': showCode }"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Optional Interactive Controls / Playground Toolbar -->
    <div v-if="$slots.controls" class="praxis-demo-controls">
      <slot name="controls" />
    </div>

    <!-- Isolated Preview Canvas -->
    <div
      class="praxis-demo-body"
      :class="[
        background === 'dots' ? 'praxis-canvas-dots' : '',
        background === 'grid' ? 'praxis-canvas-grid' : '',
        background === 'plain' ? 'praxis-canvas-plain' : ''
      ]"
    >
      <slot />
    </div>

    <!-- Code Section (scoped to codeContainer ref) -->
    <div
      v-show="showCode"
      ref="codeContainer"
      class="praxis-demo-code-section"
    >
      <slot name="code" />
    </div>
  </div>
</template>

