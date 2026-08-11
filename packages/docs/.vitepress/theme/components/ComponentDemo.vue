<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Demo'
})

const showCode = ref(false)
const copied = ref(false)

const toggleCode = () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  // Find the code text inside the code slot
  const codeEl = document.querySelector('.praxis-demo-code-section code')
  if (!codeEl) return
  try {
    await navigator.clipboard.writeText(codeEl.textContent || '')
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (_) {
    // clipboard not available
  }
}
</script>

<template>
  <div class="praxis-demo-card">
    <div class="praxis-demo-header">
      <span class="praxis-demo-header-title">{{ title }}</span>
      <div style="display:flex;gap:0.5rem">
        <button
          v-if="showCode"
          class="praxis-demo-code-toggle"
          title="Copy code"
          @click="copyCode"
        >
          <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <button class="praxis-demo-code-toggle" @click="toggleCode">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          {{ showCode ? 'Hide Code' : 'View Code' }}
        </button>
      </div>
    </div>

    <div class="praxis-demo-body">
      <slot />
    </div>

    <div v-show="showCode" class="praxis-demo-code-section">
      <slot name="code" />
    </div>
  </div>
</template>
