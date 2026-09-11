<script setup lang="ts">
import { ref, onMounted } from 'vue'

const starCount = ref<number | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/GerardoIbarra/praxis-vue')
    if (res.ok) {
      const data = await res.json()
      if (typeof data.stargazers_count === 'number') {
        starCount.value = data.stargazers_count
      }
    }
  } catch {
    // Gracefully ignore API rate limits or network issues
  }
})
</script>

<template>
  <a
    href="https://github.com/GerardoIbarra/praxis-vue"
    target="_blank"
    rel="noopener noreferrer"
    class="praxis-star-btn"
    title="Star Praxis Vue on GitHub"
  >
    <svg class="praxis-star-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
    <span class="praxis-star-text">Star</span>
    <span v-if="starCount !== null" class="praxis-star-count">{{ starCount }}</span>
  </a>
</template>

<style scoped>
.praxis-star-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  margin-left: 8px;
  user-select: none;
}

.praxis-star-btn:hover {
  border-color: rgba(234, 179, 8, 0.5);
  background: rgba(234, 179, 8, 0.08);
  color: #eab308;
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.2);
  transform: translateY(-1px);
}

.praxis-star-icon {
  color: #eab308;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.praxis-star-btn:hover .praxis-star-icon {
  transform: scale(1.2) rotate(15deg);
}

.praxis-star-text {
  line-height: 1;
}

.praxis-star-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 6px;
  font-size: 11px;
  border-radius: 9999px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-family: monospace;
}

@media (max-width: 640px) {
  .praxis-star-text {
    display: none;
  }
}
</style>
