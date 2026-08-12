<script setup lang="ts">
import { computed } from "vue";
import { Check } from "@lucide/vue";

interface Props {
  modelValue?: boolean;
  /** binary mode — single boolean */
  binary?: boolean;
  inputId?: string;
  disabled?: boolean;
  name?: string;
  value?: unknown;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  binary: false,
  inputId: undefined,
  disabled: false,
  name: undefined,
  value: undefined,
  class: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean | unknown];
  change: [value: boolean | unknown];
}>();

const isChecked = computed(() => {
  if (props.binary) return !!props.modelValue;
  if (Array.isArray(props.modelValue)) {
    return (props.modelValue as unknown[]).includes(props.value);
  }
  return !!props.modelValue;
});

const toggle = () => {
  if (props.disabled) return;

  let newValue: boolean | unknown;
  if (props.binary) {
    newValue = !props.modelValue;
  } else if (Array.isArray(props.modelValue)) {
    const arr = props.modelValue as unknown[];
    newValue = isChecked.value
      ? arr.filter((v) => v !== props.value)
      : [...arr, props.value];
  } else {
    newValue = !props.modelValue;
  }

  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>

<template>
  <span
    class="px-checkbox"
    :class="[
      { 'px-checkbox--checked': isChecked, 'px-checkbox--disabled': disabled },
      props.class,
    ]"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="disabled"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <input
      :id="inputId"
      type="checkbox"
      class="px-checkbox-input"
      :name="name"
      :checked="isChecked"
      :disabled="disabled"
      tabindex="-1"
      @change="toggle"
    />
    <span class="px-checkbox-box">
      <Transition name="px-check">
        <Check v-if="isChecked" class="px-checkbox-icon" />
      </Transition>
    </span>
  </span>
</template>

<style scoped>
.px-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.px-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.px-checkbox-box {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid var(--border-medium, #d1d5db);
  background-color: var(--bg-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
  flex-shrink: 0;
}

.px-checkbox:focus-visible .px-checkbox-box {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35);
}

.px-checkbox--checked .px-checkbox-box {
  background-color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.px-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.px-checkbox-icon {
  width: 12px;
  height: 12px;
  color: white;
  stroke-width: 3;
}

/* Transition */
.px-check-enter-active,
.px-check-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.px-check-enter-from,
.px-check-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
