<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";

interface AccordionItem {
  value: string;
  header: string;
  content?: string;
}

interface Props {
  /** Items for programmatic use (optional) */
  items?: AccordionItem[];
  /** Whether multiple panels can be open simultaneously */
  multiple?: boolean;
  /** Default open values */
  value?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  items: undefined,
  multiple: false,
  value: undefined,
});

defineSlots<{
  // slot name is the AccordionPanel value when using slotted approach
  [key: string]: () => unknown;
}>();

const openValues = ref<string[]>(
  props.value
    ? Array.isArray(props.value)
      ? [...props.value]
      : [props.value]
    : []
);

const isOpen = (val: string) => openValues.value.includes(val);

const toggle = (val: string) => {
  if (props.multiple) {
    openValues.value = isOpen(val)
      ? openValues.value.filter((v) => v !== val)
      : [...openValues.value, val];
  } else {
    openValues.value = isOpen(val) ? [] : [val];
  }
};
</script>

<template>
  <div class="ui-accordion">
    <!-- Programmatic mode -->
    <template v-if="items">
      <div
        v-for="item in items"
        :key="item.value"
        class="ui-accordion-panel"
        :class="{ 'ui-accordion-panel--open': isOpen(item.value) }"
      >
        <button
          type="button"
          class="ui-accordion-header"
          :aria-expanded="isOpen(item.value)"
          @click="toggle(item.value)"
        >
          <span>{{ item.header }}</span>
          <ChevronDown
            class="ui-accordion-icon"
            :class="{ 'ui-accordion-icon--open': isOpen(item.value) }"
          />
        </button>
        <Transition name="ui-accordion">
          <div v-show="isOpen(item.value)" class="ui-accordion-content">
            <div class="ui-accordion-content-inner">
              {{ item.content }}
            </div>
          </div>
        </Transition>
      </div>
    </template>

    <!-- Slot-based mode (mirrors PrimeVue's Accordion + AccordionPanel + AccordionHeader + AccordionContent) -->
    <slot v-else :is-open="isOpen" :toggle="toggle" />
  </div>
</template>

<style scoped>
.ui-accordion {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border-light, #e5e7eb);
  border-radius: 0.5rem;
  overflow: hidden;
}

.ui-accordion-panel {
  border-bottom: 1px solid var(--border-light, #e5e7eb);
}

.ui-accordion-panel:last-child {
  border-bottom: none;
}

.ui-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary, #111827);
  text-align: left;
  transition: background-color 0.15s;
}

.ui-accordion-header:hover {
  background-color: var(--bg-secondary, #f9fafb);
}

.ui-accordion-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  color: var(--text-secondary, #6b7280);
}

.ui-accordion-icon--open {
  transform: rotate(180deg);
}

.ui-accordion-content {
  overflow: hidden;
}

.ui-accordion-content-inner {
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary, #4b5563);
}

/* Transition */
.ui-accordion-enter-active,
.ui-accordion-leave-active {
  transition: max-height 0.25s ease, opacity 0.25s ease;
  max-height: 2000px;
}

.ui-accordion-enter-from,
.ui-accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
