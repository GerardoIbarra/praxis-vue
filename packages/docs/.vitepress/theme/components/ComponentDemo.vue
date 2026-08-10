<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Demo'
})

const showCode = ref(false)
const toggleCode = () => {
  showCode.value = !showCode.value
}
</script>

<template>
  <div class="praxis-demo-card">
    <div class="praxis-demo-header">
      <span class="praxis-demo-header-title">{{ title }}</span>
      <div style="display:flex;gap:0.5rem">
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
