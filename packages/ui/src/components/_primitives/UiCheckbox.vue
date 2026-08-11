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
    class="ui-checkbox"
    :class="[
      { 'ui-checkbox--checked': isChecked, 'ui-checkbox--disabled': disabled },
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
      class="ui-checkbox-input"
      :name="name"
      :checked="isChecked"
      :disabled="disabled"
      tabindex="-1"
      @change="toggle"
    />
    <span class="ui-checkbox-box">
      <Transition name="ui-check">
        <Check v-if="isChecked" class="ui-checkbox-icon" />
      </Transition>
    </span>
  </span>
</template>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.ui-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.ui-checkbox-box {
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

.ui-checkbox:focus-visible .ui-checkbox-box {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35);
}

.ui-checkbox--checked .ui-checkbox-box {
  background-color: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
}

.ui-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ui-checkbox-icon {
  width: 12px;
  height: 12px;
  color: white;
  stroke-width: 3;
}

/* Transition */
.ui-check-enter-active,
.ui-check-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.ui-check-enter-from,
.ui-check-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
