<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { X } from "@lucide/vue";

type DrawerPosition = "right" | "left" | "top" | "bottom";

interface Props {
  visible: boolean;
  header?: string;
  position?: DrawerPosition;
  closable?: boolean;
  class?: string;
  style?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  header: undefined,
  position: "right",
  closable: true,
  class: undefined,
  style: undefined,
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

defineSlots<{
  default(): unknown;
  header(): unknown;
}>();

const drawerRef = ref<HTMLElement | null>(null);

const close = () => emit("update:visible", false);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.closable) close();
};

watch(
  () => props.visible,
  async (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeydown);
      await nextTick();
      drawerRef.value?.focus();
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    }
  }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="praxis-drawer-backdrop">
      <div
        v-if="visible"
        class="praxis-drawer-backdrop"
        @click.self="closable && close()"
      />
    </Transition>

    <Transition :name="`praxis-drawer-${position}`">
      <div
        v-if="visible"
        ref="drawerRef"
        class="praxis-drawer"
        :class="[`praxis-drawer--${position}`, props.class]"
        :style="props.style"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <!-- Header -->
        <div class="praxis-drawer-header">
          <slot name="header">
            <span class="praxis-drawer-title">{{ header }}</span>
          </slot>
          <button
            v-if="closable"
            type="button"
            class="praxis-drawer-close"
            aria-label="Close panel"
            @click="close"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="praxis-drawer-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.praxis-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
}

.praxis-drawer {
  position: fixed;
  z-index: 1000;
  background-color: var(--bg-primary, #fff);
  display: flex;
  flex-direction: column;
  outline: none;
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.15);
}

.praxis-drawer--right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 550px;
  max-width: 90vw;
}

.praxis-drawer--left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 550px;
  max-width: 90vw;
}

.praxis-drawer--top {
  top: 0;
  left: 0;
  right: 0;
  max-height: 80vh;
}

.praxis-drawer--bottom {
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 80vh;
}

.praxis-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-light, #e5e7eb);
  flex-shrink: 0;
  background-color: var(--bg-primary, #fff);
}

.praxis-drawer-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary, #111827);
}

.praxis-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: var(--text-secondary, #6b7280);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.praxis-drawer-close:hover {
  background-color: var(--bg-secondary, #f3f4f6);
  color: var(--text-primary, #111827);
}

.praxis-drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Backdrop transitions */
.praxis-drawer-backdrop-enter-active,
.praxis-drawer-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.praxis-drawer-backdrop-enter-from,
.praxis-drawer-backdrop-leave-to {
  opacity: 0;
}

/* Slide transitions */
.praxis-drawer-right-enter-active,
.praxis-drawer-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.praxis-drawer-right-enter-from,
.praxis-drawer-right-leave-to {
  transform: translateX(100%);
}

.praxis-drawer-left-enter-active,
.praxis-drawer-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.praxis-drawer-left-enter-from,
.praxis-drawer-left-leave-to {
  transform: translateX(-100%);
}

.praxis-drawer-top-enter-active,
.praxis-drawer-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.praxis-drawer-top-enter-from,
.praxis-drawer-top-leave-to {
  transform: translateY(-100%);
}

.praxis-drawer-bottom-enter-active,
.praxis-drawer-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.praxis-drawer-bottom-enter-from,
.praxis-drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
