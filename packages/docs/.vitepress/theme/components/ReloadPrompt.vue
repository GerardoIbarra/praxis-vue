<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <div class="buttons">
      <button v-if="needRefresh" @click="updateServiceWorker()" class="pwa-refresh">
        Reload
      </button>
      <button @click="close" class="pwa-cancel">
        Close
      </button>
    </div>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  z-index: 1000;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background-color: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}
.pwa-toast .message {
  margin-bottom: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}
.pwa-toast .buttons {
  display: flex;
  gap: 8px;
}
.pwa-toast button {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.pwa-refresh {
  background-color: var(--vp-c-brand-1);
  color: white;
  border: 1px solid var(--vp-c-brand-1);
}
.pwa-cancel {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}
</style>
