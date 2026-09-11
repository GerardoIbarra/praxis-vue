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
</script>

<template>
  <div class="praxis-demo-card" :class="[overflow === 'hidden' ? 'praxis-demo-overflow-hidden' : '']">
    <div class="praxis-demo-header">
      <div class="praxis-demo-header-left">
        <span class="praxis-demo-header-title">{{ title }}</span>
        <span v-if="badge" class="praxis-demo-badge">{{ badge }}</span>
      </div>

      <div class="praxis-demo-header-actions">
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

