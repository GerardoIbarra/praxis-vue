<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { X } from "@lucide/vue";

interface Props {
  visible: boolean;
  header?: string;
  closable?: boolean;
  modal?: boolean;
  style?: Record<string, string>;
  class?: string;
  /** Max-width shorthand, e.g. '600px' */
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  header: undefined,
  closable: true,
  modal: true,
  style: undefined,
  class: undefined,
  maxWidth: "560px",
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

defineSlots<{
  default(): unknown;
  header(): unknown;
  footer(): unknown;
}>();

const dialogRef = ref<HTMLElement | null>(null);

const close = () => {
  emit("update:visible", false);
};

const handleBackdropClick = (e: MouseEvent) => {
  if (props.modal && e.target === e.currentTarget) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.closable) {
    close();
  }
};

// Focus trap and body scroll lock
watch(
  () => props.visible,
  async (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeydown);
      await nextTick();
      dialogRef.value?.focus();
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
    <Transition name="px-dialog">
      <div
        v-if="visible"
        class="px-dialog-backdrop"
        role="dialog"
        aria-modal="true"
        @click="handleBackdropClick"
      >
        <div
          ref="dialogRef"
          class="px-dialog"
          :class="props.class"
          :style="[{ maxWidth: props.maxWidth }, props.style]"
          tabindex="-1"
        >
          <!-- Header -->
          <div class="px-dialog-header">
            <slot name="header">
              <span class="px-dialog-title">{{ header }}</span>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="px-dialog-close"
              aria-label="Close dialog"
              @click="close"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Content -->
          <div class="px-dialog-content">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-dialog-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.px-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.px-dialog {
  position: relative;
  width: 100%;
  background-color: var(--ui-bg, #fff);
  border-radius: 0.75rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  outline: none;
}

.px-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--ui-border, #e5e7eb);
  flex-shrink: 0;
}

.px-dialog-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ui-text, #111827);
}

.px-dialog-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: var(--ui-text-muted, #6b7280);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.px-dialog-close:hover {
  background-color: var(--ui-bg-soft, #f3f4f6);
  color: var(--ui-text, #111827);
}

.px-dialog-content {
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.px-dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--ui-border, #e5e7eb);
  flex-shrink: 0;
}

/* Transitions */
.px-dialog-enter-active,
.px-dialog-leave-active {
  transition: opacity 0.2s ease;
}

.px-dialog-enter-active .px-dialog,
.px-dialog-leave-active .px-dialog {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.px-dialog-enter-from,
.px-dialog-leave-to {
  opacity: 0;
}

.px-dialog-enter-from .px-dialog,
.px-dialog-leave-to .px-dialog {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}
</style>
